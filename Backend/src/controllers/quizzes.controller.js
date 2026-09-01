import pool from '../config/db.js';
import { atribuirXp, verificarConquistas } from '../utils/gamification.js';

const NOTA_MINIMA_CONCLUSAO = 60;

export async function obterQuizDoModulo(req, res) {
  const moduloId = Number(req.params.moduloId);
  const [[quiz]] = await pool.query('SELECT * FROM quizzes WHERE modulo_id = ?', [moduloId]);
  if (!quiz) return res.status(404).json({ erro: 'Este módulo ainda não tem quiz.' });
  const [perguntas] = await pool.query('SELECT id, enunciado, ordem FROM perguntas WHERE quiz_id = ? ORDER BY ordem', [quiz.id]);
  for (const pergunta of perguntas) {
    const [alternativas] = await pool.query('SELECT id, texto FROM alternativas WHERE pergunta_id = ? ORDER BY id', [pergunta.id]);
    pergunta.alternativas = alternativas;
  }
  res.json({ id: quiz.id, titulo: quiz.titulo, moduloId, perguntas });
}

function criarErro(status, mensagem) {
  const erro = new Error(mensagem);
  erro.status = status;
  return erro;
}

export async function submeterQuiz(req, res) {
  const utilizadorId = req.utilizador.id;
  const quizId = Number(req.params.quizId);
  const { respostas, tempoGastoSegundos } = req.body;
  if (!Array.isArray(respostas)) throw criarErro(400, 'respostas é obrigatório.');

  const [[quiz]] = await pool.query('SELECT * FROM quizzes WHERE id = ?', [quizId]);
  if (!quiz) return res.status(404).json({ erro: 'Quiz não encontrado.' });
  const [[progresso]] = await pool.query('SELECT estudado FROM progresso_modulos WHERE utilizador_id = ? AND modulo_id = ?', [utilizadorId, quiz.modulo_id]);
  if (!progresso?.estudado) throw criarErro(409, 'Estuda o módulo antes de iniciares o quiz.');

  const [perguntas] = await pool.query('SELECT id, enunciado, explicacao FROM perguntas WHERE quiz_id = ? ORDER BY ordem', [quizId]);
  if (perguntas.length === 0) throw criarErro(409, 'Este quiz ainda não tem perguntas.');
  const [alternativas] = await pool.query(
    `SELECT a.id, a.pergunta_id, a.texto, a.correta FROM alternativas a
     JOIN perguntas p ON p.id = a.pergunta_id WHERE p.quiz_id = ?`, [quizId]
  );
  const perguntaPorId = new Map(perguntas.map((pergunta) => [pergunta.id, pergunta]));
  const alternativaPorId = new Map(alternativas.map((alternativa) => [alternativa.id, alternativa]));
  const respostasPorPergunta = new Map();
  for (const resposta of respostas) {
    const perguntaId = Number(resposta?.perguntaId);
    const alternativaId = Number(resposta?.alternativaId);
    const alternativa = alternativaPorId.get(alternativaId);
    if (!perguntaPorId.has(perguntaId) || !alternativa || alternativa.pergunta_id !== perguntaId) throw criarErro(400, 'Há respostas inválidas para este quiz.');
    if (respostasPorPergunta.has(perguntaId)) throw criarErro(400, 'Cada pergunta deve ter apenas uma resposta.');
    respostasPorPergunta.set(perguntaId, alternativa);
  }
  if (respostasPorPergunta.size !== perguntas.length) throw criarErro(400, 'Responde a todas as perguntas antes de submeter.');

  const detalhesCorrecao = perguntas.map((pergunta) => {
    const alternativa = respostasPorPergunta.get(pergunta.id);
    return {
      perguntaId: pergunta.id,
      enunciado: pergunta.enunciado,
      explicacao: pergunta.explicacao,
      alternativaEscolhidaId: alternativa.id,
      alternativaCorretaId: alternativas.find((item) => item.pergunta_id === pergunta.id && item.correta)?.id,
      correta: Boolean(alternativa.correta),
    };
  });
  const acertos = detalhesCorrecao.filter((detalhe) => detalhe.correta).length;
  const erros = perguntas.length - acertos;
  const nota = Number(((acertos / perguntas.length) * 100).toFixed(2));
  const passou = nota >= NOTA_MINIMA_CONCLUSAO;
  const conn = await pool.getConnection();

  try {
    await conn.beginTransaction();
    await conn.query('SELECT id FROM utilizadores WHERE id = ? FOR UPDATE', [utilizadorId]);
    const [[melhorTentativa]] = await conn.query('SELECT COALESCE(MAX(acertos), 0) AS acertos FROM tentativas_quiz WHERE utilizador_id = ? AND quiz_id = ?', [utilizadorId, quizId]);
    const [resultadoTentativa] = await conn.query(
      `INSERT INTO tentativas_quiz (utilizador_id, quiz_id, nota, acertos, erros, tempo_gasto_segundos)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [utilizadorId, quizId, nota, acertos, erros, Number.isFinite(tempoGastoSegundos) ? tempoGastoSegundos : null]
    );
    for (const detalhe of detalhesCorrecao) {
      await conn.query('INSERT INTO respostas_tentativa (tentativa_id, pergunta_id, alternativa_id, correta) VALUES (?, ?, ?, ?)', [resultadoTentativa.insertId, detalhe.perguntaId, detalhe.alternativaEscolhidaId, detalhe.correta]);
    }
    const [[progressoAtual]] = await conn.query('SELECT concluido FROM progresso_modulos WHERE utilizador_id = ? AND modulo_id = ? FOR UPDATE', [utilizadorId, quiz.modulo_id]);
    const acertosNovos = Math.max(0, acertos - Number(melhorTentativa.acertos));
    let xpGanho = 0;
    let subiuNivel = false;
    let nivel = null;
    if (acertosNovos > 0) {
      const xpAcertos = await atribuirXp(utilizadorId, 'ACERTAR_QUESTAO', acertosNovos * 20, conn);
      xpGanho += xpAcertos.xpGanho;
      subiuNivel ||= xpAcertos.subiuNivel;
      nivel = xpAcertos.nivel;
    }
    if (passou && !progressoAtual?.concluido) {
      await conn.query('UPDATE progresso_modulos SET concluido = TRUE, data_conclusao = NOW() WHERE utilizador_id = ? AND modulo_id = ?', [utilizadorId, quiz.modulo_id]);
      const xpQuiz = await atribuirXp(utilizadorId, 'COMPLETAR_QUIZ', null, conn);
      const xpModulo = await atribuirXp(utilizadorId, 'CONCLUIR_MODULO', null, conn);
      xpGanho += xpQuiz.xpGanho + xpModulo.xpGanho;
      subiuNivel ||= xpQuiz.subiuNivel || xpModulo.subiuNivel;
      nivel = xpModulo.nivel ?? xpQuiz.nivel ?? nivel;
    }
    const novasConquistas = await verificarConquistas(utilizadorId, { moduloId: quiz.modulo_id, quizId, nota }, conn);
    await conn.commit();
    res.json({ tentativaId: resultadoTentativa.insertId, nota, acertos, erros, totalPerguntas: perguntas.length, correcao: detalhesCorrecao, xpGanho, subiuNivel, nivel, novasConquistas, passou, notaMinimaConclusao: NOTA_MINIMA_CONCLUSAO });
  } catch (erro) {
    await conn.rollback();
    throw erro;
  } finally {
    conn.release();
  }
}

export async function historicoTentativas(req, res) {
  const [tentativas] = await pool.query(
    `SELECT id, nota, acertos, erros, tempo_gasto_segundos, criado_em
     FROM tentativas_quiz WHERE utilizador_id = ? AND quiz_id = ? ORDER BY criado_em DESC`,
    [req.utilizador.id, Number(req.params.quizId)]
  );
  res.json(tentativas);
}

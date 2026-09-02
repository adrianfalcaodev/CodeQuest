import pool from '../config/db.js';

// ------------------------------------------------------------
// XP concedido por ação (valores do documento técnico)
// ------------------------------------------------------------
export const XP_ACOES = {
  LOGIN_DIARIO: 10,
  ESTUDAR_MODULO: 40,
  CONCLUIR_MODULO: 100,
  ACERTAR_QUESTAO: 20,
  COMPLETAR_QUIZ: 80,
};

// ------------------------------------------------------------
// Cálculo de nível a partir do XP acumulado.
//
// Progressão observada no documento técnico:
//   Nível 1 ->    0 XP
//   Nível 2 ->  200 XP
//   Nível 3 ->  500 XP
//   Nível 4 ->  900 XP
//   Nível 5 -> 1400 XP
//
// A diferença entre níveis consecutivos cresce 100 em 100
// (200, 300, 400, 500, ...), o que dá a fórmula fechada:
//   limiar(n) = 100 * (n*(n+1)/2 - 1)   para n >= 2
//   limiar(1) = 0
// ------------------------------------------------------------
export function xpNecessarioParaNivel(nivel) {
  if (nivel <= 1) return 0;
  return 100 * ((nivel * (nivel + 1)) / 2 - 1);
}

export function calcularNivel(xp) {
  let nivel = 1;
  // limite de segurança (nível 200) para nunca entrar em ciclo infinito
  while (xpNecessarioParaNivel(nivel + 1) <= xp && nivel < 200) {
    nivel += 1;
  }
  return nivel;
}

export function proximoLimiarXp(xp) {
  const nivelAtual = calcularNivel(xp);
  return xpNecessarioParaNivel(nivelAtual + 1);
}

// ------------------------------------------------------------
// Atribui XP a um utilizador, regista no histórico e devolve
// informação sobre se subiu de nível.
// ------------------------------------------------------------
export async function atribuirXp(utilizadorId, acao, quantidadeCustom = null, executor = pool) {
  const xpGanho = quantidadeCustom ?? XP_ACOES[acao] ?? 0;
  if (xpGanho <= 0) {
    return { xpGanho: 0, subiuNivel: false, nivel: null, xpTotal: null };
  }

  const [[utilizadorAntes]] = await executor.query(
    'SELECT xp, nivel FROM utilizadores WHERE id = ? FOR UPDATE',
    [utilizadorId]
  );
  if (!utilizadorAntes) throw new Error('Utilizador não encontrado');

  const xpTotal = utilizadorAntes.xp + xpGanho;
  const nivelNovo = calcularNivel(xpTotal);
  const subiuNivel = nivelNovo > utilizadorAntes.nivel;

  await executor.query('UPDATE utilizadores SET xp = ?, nivel = ? WHERE id = ?', [
    xpTotal,
    nivelNovo,
    utilizadorId,
  ]);

  await executor.query(
    'INSERT INTO historico_xp (utilizador_id, acao, xp_ganho) VALUES (?, ?, ?)',
    [utilizadorId, acao, xpGanho]
  );

  return { xpGanho, subiuNivel, nivel: nivelNovo, xpTotal };
}

// ------------------------------------------------------------
// Atualiza o streak (sequência de dias consecutivos) com base
// na data do último login. Chamar uma vez por login/dia.
// ------------------------------------------------------------
export async function atualizarStreak(utilizadorId) {
  const [[utilizador]] = await pool.query(
    'SELECT ultimo_login, streak_atual, streak_maximo FROM utilizadores WHERE id = ?',
    [utilizadorId]
  );
  if (!utilizador) throw new Error('Utilizador não encontrado');

  const hoje = new Date().toISOString().slice(0, 10);
  if (utilizador.ultimo_login === hoje) {
    // já contabilizado hoje
    return { streakAtual: utilizador.streak_atual, jaContabilizadoHoje: true };
  }

  let novoStreak = 1;
  if (utilizador.ultimo_login) {
    const ontem = new Date();
    ontem.setDate(ontem.getDate() - 1);
    const ontemStr = ontem.toISOString().slice(0, 10);
    if (utilizador.ultimo_login === ontemStr) {
      novoStreak = utilizador.streak_atual + 1;
    }
  }

  const novoMaximo = Math.max(novoStreak, utilizador.streak_maximo);

  await pool.query(
    'UPDATE utilizadores SET streak_atual = ?, streak_maximo = ?, ultimo_login = ? WHERE id = ?',
    [novoStreak, novoMaximo, hoje, utilizadorId]
  );

  return { streakAtual: novoStreak, jaContabilizadoHoje: false };
}

// ------------------------------------------------------------
// Verifica e desbloqueia conquistas para o utilizador, com base
// nas suas estatísticas atuais. Devolve a lista de conquistas
// recém-desbloqueadas (novas).
// ------------------------------------------------------------
export async function verificarConquistas(utilizadorId, contexto = {}, executor = pool) {
  const [conquistas] = await executor.query('SELECT * FROM conquistas');
  const [jaDesbloqueadas] = await executor.query(
    'SELECT conquista_id FROM utilizador_conquistas WHERE utilizador_id = ?',
    [utilizadorId]
  );
  const idsDesbloqueadas = new Set(jaDesbloqueadas.map((r) => r.conquista_id));

  const novasDesbloqueadas = [];

  for (const conquista of conquistas) {
    if (idsDesbloqueadas.has(conquista.id)) continue;

    const cumpre = await cumpreCriterio(utilizadorId, conquista, contexto, executor);
    if (!cumpre) continue;

    await executor.query(
      'INSERT INTO utilizador_conquistas (utilizador_id, conquista_id) VALUES (?, ?)',
      [utilizadorId, conquista.id]
    );
    novasDesbloqueadas.push(conquista);
  }

  return novasDesbloqueadas;
}

async function cumpreCriterio(utilizadorId, conquista, contexto, executor = pool) {
  switch (conquista.criterio_tipo) {
    case 'CRIAR_CONTA': {
      // Basta a conta existir (esta função só é chamada para
      // utilizadores já criados), pelo que o critério está sempre
      // cumprido assim que é avaliado.
      return true;
    }

    case 'PRIMEIRO_LOGIN': {
      const [[{ ultimo_login }]] = await executor.query(
        'SELECT ultimo_login FROM utilizadores WHERE id = ?',
        [utilizadorId]
      );
      // só é cumprido depois de um login real ter passado por
      // atualizarStreak(), que é o que define ultimo_login
      return ultimo_login !== null;
    }

    case 'PRIMEIRO_QUIZ': {
      const [[{ total }]] = await executor.query(
        'SELECT COUNT(*) AS total FROM tentativas_quiz WHERE utilizador_id = ?',
        [utilizadorId]
      );
      return total >= 1;
    }

    case 'N_QUIZZES': {
      const [[{ total }]] = await executor.query(
        'SELECT COUNT(*) AS total FROM tentativas_quiz WHERE utilizador_id = ?',
        [utilizadorId]
      );
      return total >= conquista.criterio_valor;
    }

    case 'N_QUESTOES': {
      const [[{ total }]] = await executor.query(
        `SELECT COUNT(*) AS total FROM respostas_tentativa rt
         JOIN tentativas_quiz tq ON tq.id = rt.tentativa_id
         WHERE tq.utilizador_id = ?`,
        [utilizadorId]
      );
      return total >= conquista.criterio_valor;
    }

    case 'STREAK_DIAS': {
      const [[{ streak_atual }]] = await executor.query(
        'SELECT streak_atual FROM utilizadores WHERE id = ?',
        [utilizadorId]
      );
      return streak_atual >= conquista.criterio_valor;
    }

    case 'MODULO_PERFEITO': {
      // contexto.quizId / contexto.moduloId / contexto.nota vêm da
      // submissão do quiz que despoletou esta verificação
      if (!contexto.moduloId || contexto.nota === undefined) return false;
      return (
        Number(contexto.moduloId) === Number(conquista.criterio_valor) &&
        Number(contexto.nota) >= 100
      );
    }

    default:
      return false;
  }
}
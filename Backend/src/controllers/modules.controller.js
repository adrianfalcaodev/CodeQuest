import pool from '../config/db.js';
import { atribuirXp, verificarConquistas } from '../utils/gamification.js';

// RF06 - Visualizar módulos (com progresso do utilizador autenticado)
export async function listarModulos(req, res) {
  const utilizadorId = req.utilizador.id;

  const [modulos] = await pool.query(
    `SELECT m.id, m.titulo, m.descricao, m.linguagem, m.ordem,
            COALESCE(p.estudado, FALSE) AS estudado,
            COALESCE(p.concluido, FALSE) AS concluido
     FROM modulos m
     LEFT JOIN progresso_modulos p
       ON p.modulo_id = m.id AND p.utilizador_id = ?
     ORDER BY
       CASE m.linguagem WHEN 'JavaScript' THEN 1 WHEN 'Python' THEN 2 ELSE 99 END,
       m.linguagem,
       m.ordem`,
    [utilizadorId]
  );

  res.json(modulos);
}

// RF07 - Estudar conteúdo (devolve o conteúdo completo de um módulo)
export async function obterModulo(req, res) {
  const { id } = req.params;
  const [[modulo]] = await pool.query(
    `SELECT m.*, COALESCE(p.estudado, FALSE) AS estudado, COALESCE(p.concluido, FALSE) AS concluido
     FROM modulos m LEFT JOIN progresso_modulos p
       ON p.modulo_id = m.id AND p.utilizador_id = ?
     WHERE m.id = ?`,
    [req.utilizador.id, id]
  );
  if (!modulo) return res.status(404).json({ erro: 'Módulo não encontrado.' });
  res.json(modulo);
}

// RF08 - Registar progresso: marca o módulo como estudado e dá XP
// (apenas na primeira vez que é marcado, para não permitir "farming" de XP)
export async function marcarEstudado(req, res) {
  const utilizadorId = req.utilizador.id;
  const moduloId = Number(req.params.id);

  const [[moduloExiste]] = await pool.query('SELECT id FROM modulos WHERE id = ?', [moduloId]);
  if (!moduloExiste) return res.status(404).json({ erro: 'Módulo não encontrado.' });

  const [[progressoExistente]] = await pool.query(
    'SELECT * FROM progresso_modulos WHERE utilizador_id = ? AND modulo_id = ?',
    [utilizadorId, moduloId]
  );

  if (progressoExistente?.estudado) {
    return res.json({ mensagem: 'Módulo já estava marcado como estudado.', xpGanho: 0 });
  }

  if (progressoExistente) {
    await pool.query(
      'UPDATE progresso_modulos SET estudado = TRUE WHERE utilizador_id = ? AND modulo_id = ?',
      [utilizadorId, moduloId]
    );
  } else {
    await pool.query(
      'INSERT INTO progresso_modulos (utilizador_id, modulo_id, estudado) VALUES (?, ?, TRUE)',
      [utilizadorId, moduloId]
    );
  }

  const xpInfo = await atribuirXp(utilizadorId, 'ESTUDAR_MODULO');
  const novasConquistas = await verificarConquistas(utilizadorId);

  res.json({ mensagem: 'Módulo marcado como estudado.', ...xpInfo, novasConquistas });
}

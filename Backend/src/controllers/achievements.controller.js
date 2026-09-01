import pool from '../config/db.js';

// RF13 - Visualizar conquistas: todas as existentes, marcando quais
// já foram desbloqueadas pelo utilizador autenticado.
export async function listarConquistas(req, res) {
  const utilizadorId = req.utilizador.id;

  const [conquistas] = await pool.query(
    `SELECT c.id, c.nome, c.descricao, c.icone,
            uc.desbloqueada_em
     FROM conquistas c
     LEFT JOIN utilizador_conquistas uc
       ON uc.conquista_id = c.id AND uc.utilizador_id = ?
     ORDER BY (uc.desbloqueada_em IS NULL), uc.desbloqueada_em DESC`,
    [utilizadorId]
  );

  res.json(
    conquistas.map((c) => ({
      ...c,
      desbloqueada: c.desbloqueada_em !== null,
    }))
  );
}

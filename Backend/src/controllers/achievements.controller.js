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

export async function obterConquista(req, res) {
  const utilizadorId = req.utilizador.id;
  const conquistaId = Number(req.params.id);

  if (!Number.isInteger(conquistaId) || conquistaId < 1) {
    return res.status(400).json({ erro: 'Identificador de conquista inválido.' });
  }

  const [[conquista]] = await pool.query(
    `SELECT c.id, c.nome, c.descricao, c.icone,
            uc.desbloqueada_em
     FROM conquistas c
     LEFT JOIN utilizador_conquistas uc
       ON uc.conquista_id = c.id AND uc.utilizador_id = ?
     WHERE c.id = ?`,
    [utilizadorId, conquistaId]
  );

  if (!conquista) {
    return res.status(404).json({ erro: 'Conquista não encontrada.' });
  }

  res.json({
    ...conquista,
    desbloqueada: conquista.desbloqueada_em !== null,
  });
}

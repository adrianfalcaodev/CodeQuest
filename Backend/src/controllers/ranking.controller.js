import pool from '../config/db.js';

// RF14 - Visualizar ranking (top N por XP, com paginação simples)
export async function ranking(req, res) {
  const limite = Math.min(Number(req.query.limite) || 50, 100);
  const pagina = Math.max(Number(req.query.pagina) || 1, 1);
  const offset = (pagina - 1) * limite;

  const [linhas] = await pool.query(
    `SELECT id, username, avatar_url, xp, nivel,
            RANK() OVER (ORDER BY xp DESC) AS posicao
     FROM utilizadores
     ORDER BY xp DESC
     LIMIT ? OFFSET ?`,
    [limite, offset]
  );

  res.json(linhas);
}

// Posição e contexto do próprio utilizador autenticado no ranking
export async function minhaPosicao(req, res) {
  const utilizadorId = req.utilizador.id;

  const [[linha]] = await pool.query(
    `SELECT posicao FROM (
       SELECT id, RANK() OVER (ORDER BY xp DESC) AS posicao FROM utilizadores
     ) ranking_completo
     WHERE id = ?`,
    [utilizadorId]
  );

  res.json({ posicao: linha?.posicao ?? null });
}

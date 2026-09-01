import fs from 'node:fs';
import path from 'node:path';
import pool from '../config/db.js';
import { proximoLimiarXp } from '../utils/gamification.js';

// RF04 - Editar perfil (username, avatar). O email/password têm
// fluxos próprios (login/registo/recuperação).
export async function editarPerfil(req, res) {
  const { username, avatarUrl } = req.body;
  const utilizadorId = req.utilizador.id;

  const campos = [];
  const valores = [];

  if (username) {
    campos.push('username = ?');
    valores.push(username);
  }
  if (avatarUrl !== undefined) {
    campos.push('avatar_url = ?');
    valores.push(avatarUrl);
  }

  if (campos.length === 0) {
    return res.status(400).json({ erro: 'Nada para atualizar.' });
  }

  valores.push(utilizadorId);
  await pool.query(`UPDATE utilizadores SET ${campos.join(', ')} WHERE id = ?`, valores);

  const [[utilizador]] = await pool.query(
    `SELECT id, username, email, avatar_url, xp, nivel, streak_atual, streak_maximo
     FROM utilizadores WHERE id = ?`,
    [utilizadorId]
  );
  res.json(utilizador);
}

// RF15 - Estatísticas pessoais + desempenho por módulo
// RF04 - Editar perfil: upload de foto real (multipart/form-data, campo "avatar")
export async function uploadAvatarPerfil(req, res) {
  if (!req.file) {
    return res.status(400).json({ erro: 'Nenhum ficheiro enviado (campo "avatar").' });
  }

  const utilizadorId = req.utilizador.id;
  const novoCaminho = `/uploads/avatars/${req.file.filename}`;

  const [[atual]] = await pool.query('SELECT avatar_url FROM utilizadores WHERE id = ?', [
    utilizadorId,
  ]);

  await pool.query('UPDATE utilizadores SET avatar_url = ? WHERE id = ?', [
    novoCaminho,
    utilizadorId,
  ]);

  // Apaga o avatar anterior do disco, se existir e for um upload nosso
  if (atual?.avatar_url && atual.avatar_url.startsWith('/uploads/avatars/')) {
    const caminhoAntigo = path.join(process.cwd(), atual.avatar_url);
    fs.unlink(caminhoAntigo, () => {}); // falha silenciosa: não é crítico
  }

  res.json({ avatarUrl: novoCaminho });
}

export async function estatisticas(req, res) {
  const utilizadorId = req.utilizador.id;

  const [[utilizador]] = await pool.query(
    `SELECT xp, nivel, streak_atual, streak_maximo FROM utilizadores WHERE id = ?`,
    [utilizadorId]
  );

  const [[{ modulosConcluidos }]] = await pool.query(
    `SELECT COUNT(*) AS modulosConcluidos FROM progresso_modulos
     WHERE utilizador_id = ? AND concluido = TRUE`,
    [utilizadorId]
  );

  const [[{ totalModulos }]] = await pool.query('SELECT COUNT(*) AS totalModulos FROM modulos');

  const [[{ totalAcertos }]] = await pool.query(
    `SELECT COALESCE(SUM(acertos), 0) AS totalAcertos FROM tentativas_quiz WHERE utilizador_id = ?`,
    [utilizadorId]
  );
  const [[{ totalErros }]] = await pool.query(
    `SELECT COALESCE(SUM(erros), 0) AS totalErros FROM tentativas_quiz WHERE utilizador_id = ?`,
    [utilizadorId]
  );

  const [desempenhoPorModulo] = await pool.query(
    `SELECT m.id AS moduloId, m.titulo,
            MAX(tq.nota) AS melhorNota,
            COUNT(tq.id) AS tentativas
     FROM modulos m
     LEFT JOIN quizzes q ON q.modulo_id = m.id
     LEFT JOIN tentativas_quiz tq ON tq.quiz_id = q.id AND tq.utilizador_id = ?
     GROUP BY m.id, m.titulo
     ORDER BY m.ordem`,
    [utilizadorId]
  );

  res.json({
    xp: utilizador.xp,
    nivel: utilizador.nivel,
    proximoLimiarXp: proximoLimiarXp(utilizador.xp),
    streakAtual: utilizador.streak_atual,
    streakMaximo: utilizador.streak_maximo,
    modulosConcluidos,
    totalModulos,
    totalAcertos,
    totalErros,
    desempenhoPorModulo,
  });
}

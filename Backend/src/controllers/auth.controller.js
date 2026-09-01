import crypto from 'node:crypto';
import bcrypt from 'bcryptjs';
import pool from '../config/db.js';
import { assinarToken } from '../utils/jwt.js';
import { atribuirXp, atualizarStreak, verificarConquistas } from '../utils/gamification.js';
import { enviarEmailRecuperacao } from '../services/email.js';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function registar(req, res) {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ erro: 'username, email e password são obrigatórios.' });
  }
  if (!EMAIL_REGEX.test(email)) {
    return res.status(400).json({ erro: 'Email inválido.' });
  }
  if (password.length < 8) {
    return res.status(400).json({ erro: 'A password deve ter pelo menos 8 caracteres.' });
  }

  const [existentes] = await pool.query(
    'SELECT id FROM utilizadores WHERE email = ? OR username = ?',
    [email, username]
  );
  if (existentes.length > 0) {
    return res.status(409).json({ erro: 'Email ou username já estão em uso.' });
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const [resultado] = await pool.query(
    'INSERT INTO utilizadores (username, email, password_hash) VALUES (?, ?, ?)',
    [username, email, passwordHash]
  );

  const utilizador = {
    id: resultado.insertId,
    username,
    email,
  };

  const token = assinarToken(utilizador);
  res.status(201).json({ token, utilizador });
}

export async function login(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ erro: 'email e password são obrigatórios.' });
  }

  const [[utilizador]] = await pool.query(
    'SELECT * FROM utilizadores WHERE email = ?',
    [email]
  );
  if (!utilizador) {
    return res.status(401).json({ erro: 'Credenciais inválidas.' });
  }

  const passwordCorreta = await bcrypt.compare(password, utilizador.password_hash);
  if (!passwordCorreta) {
    return res.status(401).json({ erro: 'Credenciais inválidas.' });
  }

  // Gamificação: XP de login diário + streak + conquistas
  const streakInfo = await atualizarStreak(utilizador.id);
  let xpInfo = { xpGanho: 0, subiuNivel: false };
  if (!streakInfo.jaContabilizadoHoje) {
    xpInfo = await atribuirXp(utilizador.id, 'LOGIN_DIARIO');
  }
  const novasConquistas = await verificarConquistas(utilizador.id);

  const token = assinarToken(utilizador);

  res.json({
    token,
    utilizador: {
      id: utilizador.id,
      username: utilizador.username,
      email: utilizador.email,
      avatar_url: utilizador.avatar_url,
      xp: xpInfo.xpTotal ?? utilizador.xp,
      nivel: xpInfo.nivel ?? utilizador.nivel,
      streakAtual: streakInfo.streakAtual,
    },
    gamificacao: {
      xpGanho: xpInfo.xpGanho,
      subiuNivel: xpInfo.subiuNivel,
      novasConquistas,
    },
  });
}

// RF05 - Recuperar senha. O token enviado por email nunca é devolvido pela API.
export async function pedirRecuperacaoPassword(req, res) {
  const { email } = req.body;
  if (!email) return res.status(400).json({ erro: 'email é obrigatório.' });

  const [[utilizador]] = await pool.query(
    'SELECT id FROM utilizadores WHERE email = ?',
    [email]
  );

  // Resposta genérica mesmo que o email não exista, para não revelar
  // quais os emails registados no sistema.
  if (!utilizador) {
    return res.json({ mensagem: 'Se o email existir, receberás instruções de recuperação.' });
  }

  const token = crypto.randomBytes(32).toString('hex');
  const tokenHash = crypto.createHash('sha256').update(token).digest('hex');
  const expiraEm = new Date(Date.now() + 1000 * 60 * 30); // 30 minutos

  await pool.query('UPDATE password_resets SET usado = TRUE WHERE utilizador_id = ? AND usado = FALSE', [utilizador.id]);
  await pool.query(
    'INSERT INTO password_resets (utilizador_id, token, expira_em) VALUES (?, ?, ?)',
    [utilizador.id, tokenHash, expiraEm]
  );
  await enviarEmailRecuperacao({ email: utilizador.email, token });
  res.json({ mensagem: 'Se o email existir, receberás instruções de recuperação.' });
}

export async function confirmarRecuperacaoPassword(req, res) {
  const { token, novaPassword } = req.body;
  if (!token || !novaPassword) {
    return res.status(400).json({ erro: 'token e novaPassword são obrigatórios.' });
  }
  if (novaPassword.length < 8) {
    return res.status(400).json({ erro: 'A password deve ter pelo menos 8 caracteres.' });
  }

  const tokenHash = crypto.createHash('sha256').update(token).digest('hex');
  const [[reset]] = await pool.query(
    'SELECT * FROM password_resets WHERE token = ? AND usado = FALSE',
    [tokenHash]
  );
  if (!reset || new Date(reset.expira_em) < new Date()) {
    return res.status(400).json({ erro: 'Token inválido ou expirado.' });
  }

  const passwordHash = await bcrypt.hash(novaPassword, 10);
  await pool.query('UPDATE utilizadores SET password_hash = ? WHERE id = ?', [
    passwordHash,
    reset.utilizador_id,
  ]);
  await pool.query('UPDATE password_resets SET usado = TRUE WHERE id = ?', [reset.id]);

  res.json({ mensagem: 'Password atualizada com sucesso.' });
}

export async function perfil(req, res) {
  const [[utilizador]] = await pool.query(
    `SELECT id, username, email, avatar_url, xp, nivel, streak_atual, streak_maximo, criado_em
     FROM utilizadores WHERE id = ?`,
    [req.utilizador.id]
  );
  if (!utilizador) return res.status(404).json({ erro: 'Utilizador não encontrado.' });
  res.json(utilizador);
}

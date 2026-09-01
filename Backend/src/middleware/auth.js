import { verificarToken } from '../utils/jwt.js';

// Protege rotas: exige um "Authorization: Bearer <token>" válido.
// Em caso de sucesso, disponibiliza os dados do token em req.utilizador.
export function requerAutenticacao(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ erro: 'Token de autenticação em falta.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const payload = verificarToken(token);
    req.utilizador = payload; // { id, username, email }
    next();
  } catch (err) {
    return res.status(401).json({ erro: 'Token inválido ou expirado.' });
  }
}

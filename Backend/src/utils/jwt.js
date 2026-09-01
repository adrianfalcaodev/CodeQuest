import jwt from 'jsonwebtoken';
import 'dotenv/config';

const { JWT_SECRET, JWT_EXPIRES_IN } = process.env;

export function assinarToken(utilizador) {
  return jwt.sign(
    { id: utilizador.id, username: utilizador.username, email: utilizador.email },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN || '7d' }
  );
}

export function verificarToken(token) {
  return jwt.verify(token, JWT_SECRET);
}

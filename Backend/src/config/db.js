import mysql from 'mysql2/promise';
import 'dotenv/config';

// Pool de ligações: reutiliza ligações em vez de abrir uma nova
// por cada pedido, o que é mais eficiente sob carga.
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  dateStrings: true, // devolve DATE/DATETIME como string, evita problemas de timezone
  charset: 'utf8mb4', // garante acentuação correta independentemente do ambiente
});

// Testa a ligação assim que o módulo é carregado, para falhar cedo
// e com uma mensagem clara caso a BD não esteja acessível.
export async function testConnection() {
  const conn = await pool.getConnection();
  try {
    await conn.query('SELECT 1');
    console.log('[db] Ligação ao MySQL estabelecida com sucesso.');
  } finally {
    conn.release();
  }
}

export default pool;

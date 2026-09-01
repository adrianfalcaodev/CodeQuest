import 'dotenv/config';
import app from './app.js';
import { testConnection } from './config/db.js';

const PORT = process.env.PORT || 3001;

async function iniciar() {
  try {
    await testConnection();
  } catch (err) {
    console.error('[db] Não foi possível ligar ao MySQL:', err.message);
    console.error('Confirma o .env (DB_HOST, DB_USER, DB_PASSWORD, DB_NAME) e que o MySQL está a correr.');
    process.exit(1);
  }

  app.listen(PORT, () => {
    console.log(`[server] CodeQuest API a correr em http://localhost:${PORT}`);
  });
}

iniciar();

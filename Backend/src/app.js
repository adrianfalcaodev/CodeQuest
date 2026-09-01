import express from 'express';
import cors from 'cors';
import path from 'node:path';
import 'dotenv/config';

import authRoutes from './routes/auth.routes.js';
import usersRoutes from './routes/users.routes.js';
import modulesRoutes from './routes/modules.routes.js';
import quizzesRoutes from './routes/quizzes.routes.js';
import rankingRoutes from './routes/ranking.routes.js';
import achievementsRoutes from './routes/achievements.routes.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  })
);
app.use(express.json());

// Ficheiros enviados pelos utilizadores (ex: fotos de perfil)
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/modulos', modulesRoutes);
app.use('/api/quizzes', quizzesRoutes);
app.use('/api/ranking', rankingRoutes);
app.use('/api/conquistas', achievementsRoutes);

// 404 para rotas não definidas
app.use((req, res) => res.status(404).json({ erro: 'Rota não encontrada.' }));

// Tem de ser o último middleware
app.use(errorHandler);

export default app;

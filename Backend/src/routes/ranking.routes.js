import { Router } from 'express';
import { asyncHandler } from '../middleware/errorHandler.js';
import { requerAutenticacao } from '../middleware/auth.js';
import { ranking, minhaPosicao } from '../controllers/ranking.controller.js';

const router = Router();

router.use(requerAutenticacao);
router.get('/', asyncHandler(ranking));
router.get('/minha-posicao', asyncHandler(minhaPosicao));

export default router;

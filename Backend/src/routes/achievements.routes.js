import { Router } from 'express';
import { asyncHandler } from '../middleware/errorHandler.js';
import { requerAutenticacao } from '../middleware/auth.js';
import { listarConquistas, obterConquista } from '../controllers/achievements.controller.js';

const router = Router();

router.use(requerAutenticacao);
router.get('/', asyncHandler(listarConquistas));
router.get('/:id', asyncHandler(obterConquista));

export default router;

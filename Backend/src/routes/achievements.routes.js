import { Router } from 'express';
import { asyncHandler } from '../middleware/errorHandler.js';
import { requerAutenticacao } from '../middleware/auth.js';
import { listarConquistas } from '../controllers/achievements.controller.js';

const router = Router();

router.use(requerAutenticacao);
router.get('/', asyncHandler(listarConquistas));

export default router;

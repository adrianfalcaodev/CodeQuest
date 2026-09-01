import { Router } from 'express';
import { asyncHandler } from '../middleware/errorHandler.js';
import { requerAutenticacao } from '../middleware/auth.js';
import {
  listarModulos,
  obterModulo,
  marcarEstudado,
} from '../controllers/modules.controller.js';

const router = Router();

router.use(requerAutenticacao);
router.get('/', asyncHandler(listarModulos));
router.get('/:id', asyncHandler(obterModulo));
router.post('/:id/estudado', asyncHandler(marcarEstudado));

export default router;

import { Router } from 'express';
import { asyncHandler } from '../middleware/errorHandler.js';
import { requerAutenticacao } from '../middleware/auth.js';
import {
  registar,
  login,
  perfil,
  pedirRecuperacaoPassword,
  confirmarRecuperacaoPassword,
} from '../controllers/auth.controller.js';

const router = Router();

router.post('/registar', asyncHandler(registar));
router.post('/login', asyncHandler(login));
router.get('/perfil', requerAutenticacao, asyncHandler(perfil));
router.post('/recuperar-password', asyncHandler(pedirRecuperacaoPassword));
router.post('/redefinir-password', asyncHandler(confirmarRecuperacaoPassword));

export default router;

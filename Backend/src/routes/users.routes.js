import { Router } from 'express';
import { asyncHandler } from '../middleware/errorHandler.js';
import { requerAutenticacao } from '../middleware/auth.js';
import { uploadAvatar } from '../middleware/upload.js';
import { editarPerfil, estatisticas, uploadAvatarPerfil } from '../controllers/users.controller.js';

const router = Router();

router.use(requerAutenticacao);
router.patch('/perfil', asyncHandler(editarPerfil));
router.post('/perfil/avatar', uploadAvatar.single('avatar'), asyncHandler(uploadAvatarPerfil));
router.get('/estatisticas', asyncHandler(estatisticas));

export default router;

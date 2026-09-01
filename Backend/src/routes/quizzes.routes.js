import { Router } from 'express';
import { asyncHandler } from '../middleware/errorHandler.js';
import { requerAutenticacao } from '../middleware/auth.js';
import {
  obterQuizDoModulo,
  submeterQuiz,
  historicoTentativas,
} from '../controllers/quizzes.controller.js';

const router = Router();

router.use(requerAutenticacao);
router.get('/modulo/:moduloId', asyncHandler(obterQuizDoModulo));
router.post('/:quizId/submeter', asyncHandler(submeterQuiz));
router.get('/:quizId/tentativas', asyncHandler(historicoTentativas));

export default router;

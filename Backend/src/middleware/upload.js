import fs from 'node:fs';
import path from 'node:path';
import multer from 'multer';

const PASTA_AVATARES = path.join(process.cwd(), 'uploads', 'avatars');
fs.mkdirSync(PASTA_AVATARES, { recursive: true });

const TIPOS_PERMITIDOS = new Set(['image/png', 'image/jpeg', 'image/webp', 'image/gif']);

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, PASTA_AVATARES),
  filename: (req, file, cb) => {
    const extensao = path.extname(file.originalname) || '.png';
    const nomeUnico = `utilizador-${req.utilizador.id}-${Date.now()}${extensao}`;
    cb(null, nomeUnico);
  },
});

function filtroFicheiro(req, file, cb) {
  if (!TIPOS_PERMITIDOS.has(file.mimetype)) {
    return cb(new Error('Tipo de ficheiro não suportado. Usa PNG, JPEG, WEBP ou GIF.'));
  }
  cb(null, true);
}

export const uploadAvatar = multer({
  storage,
  fileFilter: filtroFicheiro,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
});

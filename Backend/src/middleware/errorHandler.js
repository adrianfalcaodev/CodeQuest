// Middleware final: apanha qualquer erro passado via next(err) ou
// lançado dentro de um controller assíncrono (ver asyncHandler).
export function errorHandler(err, req, res, next) { // eslint-disable-line no-unused-vars
  console.error('[erro]', err);

  if (err.code === 'ER_DUP_ENTRY') {
    return res.status(409).json({ erro: 'Registo duplicado.' });
  }

  if (err.name === 'MulterError') {
    const mensagens = {
      LIMIT_FILE_SIZE: 'O ficheiro excede o tamanho máximo permitido (2MB).',
    };
    return res.status(400).json({ erro: mensagens[err.code] || 'Erro no upload do ficheiro.' });
  }
  if (err.message?.includes('Tipo de ficheiro não suportado')) {
    return res.status(400).json({ erro: err.message });
  }

  const status = err.status || 500;
  const mensagem = err.status ? err.message : 'Erro interno do servidor.';
  res.status(status).json({ erro: mensagem });
}

// Evita ter de escrever try/catch em todos os controllers async.
export function asyncHandler(fn) {
  return (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
}

import nodemailer from 'nodemailer';

function criarTransportador() {
  if (!process.env.SMTP_HOST) return null;
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_SECURE === 'true',
    auth: process.env.SMTP_USER ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASSWORD } : undefined,
  });
}

export async function enviarEmailRecuperacao({ email, token }) {
  const url = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/redefinir-password?token=${encodeURIComponent(token)}`;
  const transportador = criarTransportador();
  if (!transportador) {
    if (process.env.NODE_ENV === 'production') throw new Error('Serviço de email não configurado.');
    console.info(`[email de desenvolvimento] Recuperação para ${email}: ${url}`);
    return;
  }
  await transportador.sendMail({
    from: process.env.SMTP_FROM || process.env.SMTP_USER,
    to: email,
    subject: 'Redefinição de palavra-passe — CodeQuest',
    text: `Recebemos um pedido para redefinir a tua palavra-passe. Usa este link durante os próximos 30 minutos: ${url}`,
  });
}

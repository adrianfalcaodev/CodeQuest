import './NotificationHost.css';
import { X } from 'lucide-react';

export default function NotificationHost({ toasts, onFechar }) {
  return (
    <div className="notificacoes-container">
      {toasts.map((toast) => (
        <div key={toast.id} className={`notificacao notificacao-${toast.tipo}`}>
          <div className="notificacao-conteudo">
            {toast.titulo && <strong>{toast.titulo}</strong>}
            {toast.texto && <span>{toast.texto}</span>}
          </div>
          <button
            className="notificacao-fechar"
            onClick={() => onFechar(toast.id)}
            aria-label="Fechar notificação"
          >
            <X size={18} />
          </button>
        </div>
      ))}
    </div>
  );
}

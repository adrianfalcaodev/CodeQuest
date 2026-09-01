import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";
import NotificationHost from "../components/NotificationHost.jsx";

const NotificationContext = createContext(null);

let proximoId = 1;

export function NotificationProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const timersRef = useRef(new Map());

  const remover = useCallback((id) => {
    setToasts((atual) => atual.filter((t) => t.id !== id));
    const timer = timersRef.current.get(id);
    if (timer) {
      clearTimeout(timer);
      timersRef.current.delete(id);
    }
  }, []);

  const adicionar = useCallback(
    (toast, duracaoMs = 3000) => {
      const id = proximoId++;
      setToasts((atual) => [...atual, { ...toast, id }]);
      const timer = setTimeout(() => remover(id), duracaoMs);
      timersRef.current.set(id, timer);
    },
    [remover],
  );

  /**
   * Recebe o resultado de uma ação com gamificação (login, marcar módulo
   * como estudado, submeter quiz) e transforma em toasts encadeados:
   * primeiro o XP ganho, depois subida de nível (se houver), depois cada
   * conquista nova desbloqueada.
   */
  const notificarGamificacao = useCallback(
    ({ xpGanho, subiuNivel, nivel, novasConquistas } = {}) => {
      if (xpGanho > 0) {
        adicionar({ tipo: "xp", texto: `+${xpGanho} XP` }, 2800);
      }
      if (subiuNivel) {
        adicionar(
          { tipo: "nivel", texto: `Subiste para o Nível ${nivel ?? ""}! 🎉` },
          4200,
        );
      }
      (novasConquistas || []).forEach((conquista) => {
        adicionar(
          {
            tipo: "conquista",
            titulo: conquista.nome,
            texto: conquista.descricao,
          },
          5000,
        );
      });
    },
    [adicionar],
  );

  return (
    <NotificationContext.Provider value={{ notificarGamificacao }}>
      {children}
      <NotificationHost toasts={toasts} onFechar={remover} />
    </NotificationContext.Provider>
  );
}

// Context hooks are intentionally exported alongside their provider.
// eslint-disable-next-line react-refresh/only-export-components
export function useNotificacao() {
  const contexto = useContext(NotificationContext);
  if (!contexto)
    throw new Error(
      "useNotificacao tem de ser usado dentro de <NotificationProvider>",
    );
  return contexto;
}

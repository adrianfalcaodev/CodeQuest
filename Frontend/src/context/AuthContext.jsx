import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { api, setToken } from "../data/api.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [utilizador, setUtilizador] = useState(null);
  const [aCarregar, setACarregar] = useState(true);
  const [ultimaGamificacao, setUltimaGamificacao] = useState(null);

  // Ao carregar a app, se já houver token guardado, tenta recuperar o perfil
  useEffect(() => {
    let cancelado = false;

    async function inicializar() {
      const token = localStorage.getItem("codequest_token");
      if (token) {
        try {
          const dados = await api.perfil();
          if (!cancelado) setUtilizador(dados);
        } catch {
          setToken(null);
        }
      }
      if (!cancelado) setACarregar(false);
    }

    inicializar();
    return () => {
      cancelado = true;
    };
  }, []);

  const entrar = useCallback(async (email, password) => {
    const resposta = await api.login({ email, password });
    setToken(resposta.token);
    setUtilizador(resposta.utilizador);
    setUltimaGamificacao(resposta.gamificacao);
    return resposta;
  }, []);

  const registar = useCallback(async (username, email, password) => {
    const resposta = await api.registar({ username, email, password });
    setToken(resposta.token);
    setUtilizador(resposta.utilizador);
    return resposta;
  }, []);

  const sair = useCallback(() => {
    setToken(null);
    setUtilizador(null);
  }, []);

  const atualizarUtilizador = useCallback((parcial) => {
    setUtilizador((atual) => (atual ? { ...atual, ...parcial } : atual));
  }, []);

  return (
    <AuthContext.Provider
      value={{
        utilizador,
        aCarregar,
        entrar,
        registar,
        sair,
        atualizarUtilizador,
        ultimaGamificacao,
        estaAutenticado: !!utilizador,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Context hooks are intentionally exported alongside their provider.
// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const contexto = useContext(AuthContext);
  if (!contexto)
    throw new Error("useAuth tem de ser usado dentro de um <AuthProvider>");
  return contexto;
}

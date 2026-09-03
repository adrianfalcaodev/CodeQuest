const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001/api";

// Origem do backend sem o sufixo "/api", usada para montar URLs de
// ficheiros estáticos (ex: avatar_url = "/uploads/avatars/x.png").
export const API_ORIGIN = API_URL.replace(/\/api\/?$/, "");

function getToken() {
  return localStorage.getItem("codequest_token");
}

export function setToken(token) {
  if (token) localStorage.setItem("codequest_token", token);
  else localStorage.removeItem("codequest_token");
}

/**
 * Constrói a URL completa para um avatar guardado no backend
 * (avatar_url vem como caminho relativo, ex: "/uploads/avatars/x.png").
 */
export function urlAvatar(avatarUrl) {
  if (!avatarUrl) return null;
  if (avatarUrl.startsWith("http")) return avatarUrl;
  return `${API_ORIGIN}${avatarUrl}`;
}

/**
 * Wrapper fino sobre fetch:
 * - adiciona automaticamente o header Authorization se houver token
 * - serializa/parseia JSON
 * - lança um erro com a mensagem vinda do backend em caso de falha
 */
async function pedido(
  caminho,
  { method = "GET", body, autenticado = true } = {},
) {
  const eFormulario = body instanceof FormData;
  const headers = eFormulario ? {} : { "Content-Type": "application/json" };

  if (autenticado) {
    const token = getToken();
    if (token) headers.Authorization = `Bearer ${token}`;
  }

  const resposta = await fetch(`${API_URL}${caminho}`, {
    method,
    headers,
    body: body ? (eFormulario ? body : JSON.stringify(body)) : undefined,
  });

  const contentType = resposta.headers.get("content-type") || "";
  const dados = contentType.includes("application/json")
    ? await resposta.json()
    : null;

  if (!resposta.ok) {
    throw new Error(dados?.erro || `Erro ${resposta.status}`);
  }

  return dados;
}

/**
 * Envia um ficheiro (multipart/form-data) para o endpoint de avatar.
 * Não pode reutilizar pedido(): esse helper força sempre
 * Content-Type: application/json, o que quebra o upload de ficheiros.
 */
async function uploadFicheiro(ficheiro) {
  const headers = {};
  const token = getToken();
  if (token) headers.Authorization = `Bearer ${token}`;

  const formData = new FormData();
  formData.append("avatar", ficheiro);

  const resposta = await fetch(`${API_URL}/users/perfil/avatar`, {
    method: "POST",
    headers,
    body: formData,
  });

  const contentType = resposta.headers.get("content-type") || "";
  const dados = contentType.includes("application/json")
    ? await resposta.json()
    : null;

  if (!resposta.ok) {
    throw new Error(dados?.erro || `Erro ${resposta.status}`);
  }

  return dados;
}

export const api = {
  // Auth
  registar: (dados) =>
    pedido("/auth/registar", {
      method: "POST",
      body: dados,
      autenticado: false,
    }),
  login: (dados) =>
    pedido("/auth/login", { method: "POST", body: dados, autenticado: false }),
  perfil: () => pedido("/auth/perfil"),
  editarPerfil: (dados) =>
    pedido("/users/perfil", { method: "PATCH", body: dados }),
  recuperarPassword: (dados) =>
    pedido("/auth/recuperar-password", {
      method: "POST",
      body: dados,
      autenticado: false,
    }),
  redefinirPassword: (token, novaSenha) =>
    pedido("/auth/redefinir-password", {
      method: "POST",
      body: { token, novaSenha },
      autenticado: false,
    }),

  // Modulos
  listarModulos: () => pedido("/modulos"),
  obterModulo: (id) => pedido(`/modulos/${id}`),
  marcarModuloEstudado: (id) =>
    pedido(`/modulos/${id}/estudado`, { method: "POST" }),

  // Perfil (editar username / avatar)
  atualizarPerfil: (dados) =>
    pedido("/users/perfil", { method: "PATCH", body: dados }),
  uploadAvatarPerfil: (ficheiro) => uploadFicheiro(ficheiro),

  // Quizzes
  obterQuiz: (moduloId) => pedido(`/quizzes/modulo/${moduloId}`),
  submeterQuiz: (quizId, respostas, tempoGastoSegundos) =>
    pedido(`/quizzes/${quizId}/submeter`, {
      method: "POST",
      body: { respostas, tempoGastoSegundos },
    }),
  obterTentativasQuiz: (quizId) => pedido(`/quizzes/${quizId}/tentativas`),

  // Ranking
  minhaPosicao: () => pedido("/ranking/minha-posicao"),
  listarRanking: (pagina = 1, limite = 10) =>
    pedido(`/ranking?pagina=${pagina}&limite=${limite}`),

  // Estatísticas e Conquistas
  estatisticas: () => pedido("/users/estatisticas"),
  listarConquistas: () => pedido("/conquistas"),
  obterConquista: (id) => pedido(`/conquistas/${id}`),
};

// Também exportar as funções antigas para compatibilidade
export function register(data) {
  return api.registar(data);
}

export function login(data) {
  return api.login(data);
}

export function forgotPassword(data) {
  return api.recuperarPassword(data);
}

export function getProfile() {
  return api.perfil();
}

export function getRanking(pagina = 1) {
  return api.listarRanking(pagina);
}

export function minhaPosicao() {
  return api.minhaPosicao();
}

export function getModules() {
  return api.listarModulos();
}

export function getModuleById(moduleId) {
  return api.obterModulo(moduleId);
}

export function getQuiz(moduleId) {
  return api.obterQuiz(moduleId);
}

export function submitQuiz(quizId, answers, tempoGastoSegundos) {
  return api.submeterQuiz(quizId, answers, tempoGastoSegundos);
}

export function getQuizHistory(quizId) {
  return api.obterTentativasQuiz(quizId);
}

export function getUserStats() {
  return api.estatisticas();
}

export function getAchievements() {
  return api.listarConquistas();
}

export function markModuleAsStudied(moduleId) {
  return api.marcarModuloEstudado(moduleId);
}

export function updateProfile(dados) {
  return api.atualizarPerfil(dados);
}

export function uploadAvatar(ficheiro) {
  return api.uploadAvatarPerfil(ficheiro);
}
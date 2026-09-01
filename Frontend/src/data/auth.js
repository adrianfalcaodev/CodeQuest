export const STORAGE_TOKEN = "codequest_token";
export const STORAGE_USER = "codequest_user";

export function normalizeUser(user) {
  if (!user) {
    return null;
  }

  return {
    ...user,
    id: user.id,
    username: user.username ?? user.name ?? "",
    email: user.email ?? "",
    avatar: user.avatar ?? user.avatar_url ?? "",
    level: Number(user.level ?? user.nivel ?? 1),
    nivel: Number(user.nivel ?? user.level ?? 1),
    xp: Number(user.xp ?? 0),
    streak: Number(user.streak ?? user.streak_atual ?? user.streakAtual ?? 0),
    streakAtual: Number(
      user.streakAtual ?? user.streak_atual ?? user.streak ?? 0,
    ),
    completedModules: Number(
      user.completedModules ?? user.modulosConcluidos ?? 0,
    ),
    correctAnswers: Number(user.correctAnswers ?? user.totalAcertos ?? 0),
    wrongAnswers: Number(user.wrongAnswers ?? user.totalErros ?? 0),
    achievements: Array.isArray(user.achievements) ? user.achievements : [],
  };
}

export function getToken() {
  return localStorage.getItem(STORAGE_TOKEN);
}

export function getStoredUser() {
  const userJson = localStorage.getItem(STORAGE_USER);
  if (!userJson) {
    return null;
  }

  try {
    return normalizeUser(JSON.parse(userJson));
  } catch {
    return null;
  }
}

export function saveAuth(token, user) {
  localStorage.setItem(STORAGE_TOKEN, token);
  localStorage.setItem(STORAGE_USER, JSON.stringify(normalizeUser(user)));
}

export function clearAuth() {
  localStorage.removeItem(STORAGE_TOKEN);
  localStorage.removeItem(STORAGE_USER);
}

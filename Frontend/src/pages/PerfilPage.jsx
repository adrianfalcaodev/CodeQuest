import { useEffect, useRef, useState } from "react";
import {
  Award,
  Camera,
  Check,
  CheckCircle2,
  Flame,
  Pencil,
  Target,
  Trophy,
  UserRound,
  X,
  Zap,
} from "lucide-react";
import LoadingSpinner from "../components/LoadingSpinner";
import EmptyState from "../components/EmptyState";
import {
  getAchievements,
  getProfile,
  getUserStats,
  updateProfile,
  uploadAvatar,
  urlAvatar,
} from "../data/api.js";
import { useAuth } from "../context/AuthContext.jsx";
import "../style/social.css";

export default function PerfilPage() {
  const { utilizador, atualizarUtilizador } = useAuth();
  const [user, setUser] = useState(utilizador);
  const [stats, setStats] = useState(null);
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);

  // Edição de nome de utilizador
  const [editandoNome, setEditandoNome] = useState(false);
  const [novoUsername, setNovoUsername] = useState("");
  const [aGuardarNome, setAGuardarNome] = useState(false);
  const [erroNome, setErroNome] = useState("");

  // Edição de foto de perfil
  const fileInputRef = useRef(null);
  const [aEnviarAvatar, setAEnviarAvatar] = useState(false);
  const [erroAvatar, setErroAvatar] = useState("");

  useEffect(() => {
    Promise.all([getProfile(), getUserStats(), getAchievements()])
      .then(([profile, userStats, userAchievements]) => {
        setUser(profile);
        setNovoUsername(profile.username || "");
        setStats(userStats);
        setAchievements(userAchievements || []);
      })
      .catch(() => {
        setUser(utilizador);
        setStats(null);
        setAchievements([]);
      })
      .finally(() => setLoading(false));
  }, [utilizador]);

  function iniciarEdicaoNome() {
    setNovoUsername(user.username || "");
    setErroNome("");
    setEditandoNome(true);
  }

  function cancelarEdicaoNome() {
    setEditandoNome(false);
    setErroNome("");
  }

  async function guardarNome(event) {
    event.preventDefault();
    const username = novoUsername.trim();
    if (!username) {
      setErroNome("O nome de utilizador não pode ficar vazio.");
      return;
    }
    if (username === user.username) {
      setEditandoNome(false);
      return;
    }

    setAGuardarNome(true);
    setErroNome("");
    try {
      const atualizado = await updateProfile({ username });
      setUser((atual) => ({ ...atual, ...atualizado }));
      atualizarUtilizador({ username: atualizado.username });
      setEditandoNome(false);
    } catch (err) {
      setErroNome(
        err?.message || "Não foi possível atualizar o nome de utilizador.",
      );
    } finally {
      setAGuardarNome(false);
    }
  }

  function escolherFoto() {
    fileInputRef.current?.click();
  }

  async function alterarFoto(event) {
    const ficheiro = event.target.files?.[0];
    event.target.value = ""; // permite escolher o mesmo ficheiro outra vez
    if (!ficheiro) return;

    setErroAvatar("");
    setAEnviarAvatar(true);
    try {
      const { avatarUrl } = await uploadAvatar(ficheiro);
      setUser((atual) => ({ ...atual, avatar_url: avatarUrl }));
      atualizarUtilizador({ avatar_url: avatarUrl });
    } catch (err) {
      setErroAvatar(
        err?.message || "Não foi possível atualizar a foto de perfil.",
      );
    } finally {
      setAEnviarAvatar(false);
    }
  }

  if (loading) return <LoadingSpinner />;
  if (!user)
    return (
      <EmptyState
        icon={UserRound}
        title="Inicie sessão"
        subtitle="Entra na tua conta para acompanhares o teu progresso."
        actionText="Entrar"
        actionLink="/login"
      />
    );
  const xp = stats?.xp ?? user.xp ?? 0;
  const nivel = stats?.nivel ?? user.nivel ?? 1;
  const concluidos = stats?.modulosConcluidos ?? 0;
  const total = stats?.totalModulos ?? 0;
  const progresso = total ? Math.round((concluidos / total) * 100) : 0;
  const unlocked = achievements.filter((item) => item.desbloqueada);
  const cards = [
    [Zap, xp, "XP total"],
    [Trophy, nivel, "Nível atual"],
    [CheckCircle2, `${concluidos}/${total}`, "Módulos"],
    [Flame, `${stats?.streakAtual ?? user.streakAtual ?? 0} dias`, "Sequência"],
  ];
  return (
    <section className="social-page">
      <header className="profile-header">
        <div className="profile-avatar-edit">
          <span className="profile-avatar">
            {user.avatar_url ? (
              <img src={urlAvatar(user.avatar_url)} alt="" />
            ) : (
              user.username?.[0]?.toUpperCase()
            )}
          </span>
          <button
            type="button"
            className="profile-avatar-trigger"
            onClick={escolherFoto}
            disabled={aEnviarAvatar}
            title="Alterar foto de perfil"
          >
            <Camera size={16} />
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/png,image/jpeg,image/webp,image/gif"
            onChange={alterarFoto}
            hidden
          />
        </div>
        <div className="profile-header-info">
          <span className="social-kicker">
            <UserRound size={15} /> O teu perfil
          </span>
          {editandoNome ? (
            <form className="profile-name-edit" onSubmit={guardarNome}>
              <input
                type="text"
                value={novoUsername}
                onChange={(event) => setNovoUsername(event.target.value)}
                autoFocus
                maxLength={50}
                disabled={aGuardarNome}
              />
              <button
                type="submit"
                className="profile-name-action"
                disabled={aGuardarNome}
                title="Guardar"
              >
                <Check size={17} />
              </button>
              <button
                type="button"
                className="profile-name-action"
                onClick={cancelarEdicaoNome}
                disabled={aGuardarNome}
                title="Cancelar"
              >
                <X size={17} />
              </button>
            </form>
          ) : (
            <h1>
              {user.username}
              <button
                type="button"
                className="profile-name-edit-trigger"
                onClick={iniciarEdicaoNome}
                title="Editar nome de utilizador"
              >
                <Pencil size={15} />
              </button>
            </h1>
          )}
          <p>{user.email}</p>
          {(erroNome || erroAvatar) && (
            <p className="profile-edit-error">{erroNome || erroAvatar}</p>
          )}
        </div>
        <strong className="profile-level">Nível {nivel}</strong>
      </header>
      <div className="profile-stats">
        {cards.map(([Icon, value, label]) => (
          <article className="profile-stat" key={label}>
            <Icon size={19} />
            <strong>{value}</strong>
            <span>{label}</span>
          </article>
        ))}
      </div>
      <div className="profile-layout">
        <section className="profile-panel">
          <h2>Progresso de estudo</h2>
          <div className="progress-overview">
            <div>
              <span>Jornada concluída</span>
              <strong>{progresso}%</strong>
            </div>
            <div className="progress-meter">
              <i style={{ width: `${progresso}%` }} />
            </div>
            <div>
              <span>Respostas certas</span>
              <strong>{stats?.totalAcertos ?? 0}</strong>
            </div>
            <div>
              <span>Respostas para rever</span>
              <strong>{stats?.totalErros ?? 0}</strong>
            </div>
          </div>
        </section>
        <aside className="profile-panel">
          <h2>Conquistas</h2>
          <div className="achievement-list-scroll">
            <div className="achievement-list">
              {achievements.length ? (
                achievements.map((achievement) => (
                  <div
                    className={`achievement-item ${achievement.desbloqueada ? "unlocked" : ""}`}
                    key={achievement.id}
                  >
                    {achievement.desbloqueada ? (
                      <Award size={17} />
                    ) : (
                      <Target size={17} />
                    )}
                    <span>{achievement.nome}</span>
                  </div>
                ))
              ) : (
                <p>Ainda não existem conquistas.</p>
              )}
            </div>
          </div>
          <p>
            {unlocked.length}/{achievements.length} desbloqueadas
          </p>
        </aside>
      </div>
    </section>
  );
}
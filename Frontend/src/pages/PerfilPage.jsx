import { useEffect, useRef, useState } from "react";
import {
  Award,
  CheckCircle2,
  Check,
  Flame,
  ImagePlus,
  Pencil,
  Save,
  Target,
  Trophy,
  UserRound,
  Zap,
} from "lucide-react";
import LoadingSpinner from "../components/LoadingSpinner";
import EmptyState from "../components/EmptyState";
import {
  api,
  getAchievements,
  getProfile,
  getUserStats,
  urlAvatar,
} from "../data/api.js";
import { getStoredUser } from "../data/auth.js";
import { useAuth } from "../context/AuthContext.jsx";
import "../style/social.css";

export default function PerfilPage() {
  const { atualizarUtilizador } = useAuth();
  const [user, setUser] = useState(getStoredUser());
  const [stats, setStats] = useState(null);
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editando, setEditando] = useState(false);
  const [username, setUsername] = useState("");
  const [ficheiro, setFicheiro] = useState(null);
  const [preview, setPreview] = useState(null);
  const [aGuardar, setAGuardar] = useState(false);
  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState("");
  const inputAvatar = useRef(null);
  useEffect(() => {
    Promise.all([getProfile(), getUserStats(), getAchievements()])
      .then(([profile, userStats, userAchievements]) => {
        setUser(profile);
        setUsername(profile.username || "");
        setStats(userStats);
        setAchievements(userAchievements || []);
      })
      .catch(() => {
        setUser(getStoredUser());
        setStats(null);
        setAchievements([]);
      })
      .finally(() => setLoading(false));
  }, []);
  useEffect(() => () => preview && URL.revokeObjectURL(preview), [preview]);

  function iniciarEdicao() {
    setUsername(user.username || "");
    setFicheiro(null);
    setPreview(null);
    setMensagem("");
    setErro("");
    setEditando(true);
  }

  function selecionarAvatar(event) {
    const novoFicheiro = event.target.files?.[0];
    if (!novoFicheiro) return;
    if (!novoFicheiro.type.startsWith("image/")) {
      setErro("Escolha uma imagem PNG, JPEG, WEBP ou GIF.");
      return;
    }
    if (novoFicheiro.size > 2 * 1024 * 1024) {
      setErro("A imagem deve ter no máximo 2 MB.");
      return;
    }
    setFicheiro(novoFicheiro);
    setPreview(URL.createObjectURL(novoFicheiro));
    setErro("");
  }

  async function guardarPerfil(event) {
    event.preventDefault();
    const nome = username.trim();
    if (!nome) {
      setErro("O nome de utilizador é obrigatório.");
      return;
    }
    setAGuardar(true);
    setMensagem("");
    setErro("");
    try {
      let atualizado = user;
      if (nome !== user.username) {
        atualizado = await api.editarPerfil({ username: nome });
      }
      if (ficheiro) {
        const avatar = await api.carregarAvatar(ficheiro);
        atualizado = { ...atualizado, avatar_url: avatar.avatarUrl };
      }
      setUser(atualizado);
      atualizarUtilizador(atualizado);
      setFicheiro(null);
      setPreview(null);
      setEditando(false);
      setMensagem("Perfil atualizado com sucesso.");
    } catch (error) {
      setErro(error.message || "Não foi possível atualizar o perfil.");
    } finally {
      setAGuardar(false);
    }
  }
  if (loading) return <LoadingSpinner />;
  if (!user)
    return (
      <EmptyState
        icon={UserRound}
        title="Inicie sessão"
        subtitle="Entre na sua conta para acompanhar o seu progresso."
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
        <span className="profile-avatar">
          {preview || user.avatar_url ? (
            <img src={preview || urlAvatar(user.avatar_url)} alt="Pré-visualização do avatar" />
          ) : (
            user.username?.[0]?.toUpperCase()
          )}
        </span>
        <div>
          <span className="social-kicker">
            <UserRound size={15} /> O teu perfil
          </span>
          <h1>{user.username}</h1>
          <p>{user.email}</p>
        </div>
        <strong className="profile-level">Nível {nivel}</strong>
        <button className="btn btn-sm profile-edit-button" type="button" onClick={iniciarEdicao}>
          <Pencil size={16} /> Editar perfil
        </button>
      </header>
      {mensagem && <p className="profile-feedback is-success"><Check size={16} />{mensagem}</p>}
      {editando && (
        <form className="profile-panel profile-editor" onSubmit={guardarPerfil}>
          <div className="profile-editor-heading">
            <div>
              <span className="social-kicker"><Pencil size={15} /> Dados públicos</span>
              <h2>Editar perfil</h2>
            </div>
            <button className="btn btn-ghost btn-sm" type="button" onClick={() => setEditando(false)}>Cancelar</button>
          </div>
          <div className="profile-editor-fields">
            <label>
              Nome de utilizador
              <input value={username} onChange={(event) => setUsername(event.target.value)} maxLength={50} required />
            </label>
            <div className="avatar-upload">
              <span>Foto de perfil</span>
              <button className="btn btn-ghost btn-sm" type="button" onClick={() => inputAvatar.current?.click()}>
                <ImagePlus size={16} /> {ficheiro ? "Trocar foto" : "Escolher foto"}
              </button>
              <input ref={inputAvatar} className="visually-hidden" type="file" accept="image/png,image/jpeg,image/webp,image/gif" onChange={selecionarAvatar} />
              {ficheiro && <small>{ficheiro.name}</small>}
            </div>
          </div>
          {erro && <p className="profile-feedback is-error">{erro}</p>}
          <button className="btn btn-primary" type="submit" disabled={aGuardar}>
            <Save size={16} /> {aGuardar ? "A guardar..." : "Guardar alterações"}
          </button>
        </form>
      )}
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

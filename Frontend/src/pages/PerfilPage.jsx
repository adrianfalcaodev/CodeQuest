import { useEffect, useState } from "react";
import {
  Award,
  CheckCircle2,
  Flame,
  Target,
  Trophy,
  UserRound,
  Zap,
} from "lucide-react";
import LoadingSpinner from "../components/LoadingSpinner";
import EmptyState from "../components/EmptyState";
import {
  getAchievements,
  getProfile,
  getUserStats,
  urlAvatar,
} from "../data/api.js";
import { getStoredUser } from "../data/auth.js";
import "../style/social.css";

export default function PerfilPage() {
  const [user, setUser] = useState(getStoredUser());
  const [stats, setStats] = useState(null);
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    Promise.all([getProfile(), getUserStats(), getAchievements()])
      .then(([profile, userStats, userAchievements]) => {
        setUser(profile);
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
          {user.avatar_url ? (
            <img src={urlAvatar(user.avatar_url)} alt="" />
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
          <div className="achievement-list">
            {achievements.length ? (
              achievements.slice(0, 5).map((achievement) => (
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
          <p>
            {unlocked.length}/{achievements.length} desbloqueadas
          </p>
        </aside>
      </div>
    </section>
  );
}

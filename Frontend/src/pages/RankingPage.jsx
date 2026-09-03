import { useEffect, useState } from "react";
import { Award, Crown, Medal, Sparkles, Trophy, Zap } from "lucide-react";
import LoadingSpinner from "../components/LoadingSpinner";
import EmptyState from "../components/EmptyState";
import { getAchievements, getRanking } from "../data/api.js";
import { urlAvatar } from "../data/api.js";
import { useAuth } from "../context/AuthContext.jsx";
import "../style/social.css";

const medal = (index) =>
  index === 0 ? (
    <Crown />
  ) : index === 1 ? (
    <Medal />
  ) : index === 2 ? (
    <Award />
  ) : null;

export default function RankingPage() {
  const { utilizador } = useAuth();
  const [ranking, setRanking] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    Promise.all([getRanking(), getAchievements()])
      .then(([rankingData, achievementsData]) => {
        setRanking(
          Array.isArray(rankingData) ? rankingData : rankingData.ranking || [],
        );
        setAchievements(
          Array.isArray(achievementsData) ? achievementsData : [],
        );
      })
      .catch((err) =>
        setError(err?.message || "Não foi possível carregar os dados."),
      )
      .finally(() => setLoading(false));
  }, []);
  if (loading) return <LoadingSpinner />;
  if (error)
    return (
      <EmptyState
        icon={Zap}
        title="Erro ao carregar ranking"
        subtitle={error}
        actionText="Tentar novamente"
        actionLink="/ranking"
      />
    );
  const unlocked = achievements.filter((item) => item.desbloqueada).length;
  return (
    <section className="social-page">
      <header className="social-hero">
        <div>
          <span className="social-kicker">
            <Sparkles size={15} /> Comunidade CodeQuest
          </span>
          <h1>Leaderboard global</h1>
          <p>Veja quem está a evoluir mais rápido na jornada de programação.</p>
        </div>
        <span className="tag xp">
          <Trophy size={14} /> {ranking.length} jogadores
        </span>
      </header>
      {ranking.length === 0 ? (
        <EmptyState
          icon={Trophy}
          title="Ranking a aguardar jogadores"
          subtitle="Completa módulos e sê o primeiro a aparecer aqui."
        />
      ) : (
        <>
          <div className="ranking-podium">
            {ranking.slice(0, 3).map((user, index) => (
              <article className="podium-card" key={user.id}>
                <span className="podium-place">
                  {medal(index) || `#${index + 1}`}
                </span>
                <strong>{user.username}</strong>
                <span>
                  Nível {user.nivel ?? 1} · {user.xp} XP
                </span>
              </article>
            ))}
          </div>
          <section className="ranking-board">
            <header className="ranking-board-header">
              <h2>Classificação</h2>
              <span className="tag primary">por XP</span>
            </header>
            <div className="ranking-list">
              {ranking.slice(0, 10).map((user, index) => {
                const souEu = utilizador && user.id === utilizador.id;
                return (
                <article
                  className={`ranking-entry ${index < 3 ? "is-top" : ""} ${souEu ? "is-me" : ""}`}
                  key={user.id}
                >
                  <span className="ranking-position">
                    {user.posicao ?? index + 1}
                  </span>
                  <span className="ranking-avatar">
                    {user.avatar_url ? (
                      <img src={urlAvatar(user.avatar_url)} alt="" />
                    ) : (
                      user.username?.[0]?.toUpperCase()
                    )}
                  </span>
                  <div className="ranking-name">
                    {user.username}
                    {souEu && <span className="ranking-me-tag">Tu</span>}
                    <small>Nível {user.nivel ?? user.level ?? 1}</small>
                  </div>
                  <strong className="ranking-xp">{user.xp} XP</strong>
                </article>
                );
              })}
            </div>
          </section>
        </>
      )}
      <aside className="achievement-summary">
        <Trophy size={25} />
        <div>
          <strong>Conquistas da comunidade</strong>
          <p>
            {unlocked} de {achievements.length} conquistas já foram
            desbloqueadas.
          </p>
        </div>
      </aside>
    </section>
  );
}
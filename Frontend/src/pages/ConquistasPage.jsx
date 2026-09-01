import { useEffect, useState } from "react";
import { Award, LockKeyhole, Target, Trophy } from "lucide-react";
import EmptyState from "../components/EmptyState";
import LoadingSpinner from "../components/LoadingSpinner";
import { getAchievements } from "../data/api.js";
import "../style/social.css";
import "../style/integration.css";

export default function ConquistasPage() {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    getAchievements()
      .then((data) => setAchievements(Array.isArray(data) ? data : []))
      .catch((err) =>
        setError(err?.message || "Não foi possível carregar as conquistas."),
      )
      .finally(() => setLoading(false));
  }, []);
  if (loading) return <LoadingSpinner />;
  if (error)
    return (
      <EmptyState
        icon={Trophy}
        title="Erro ao carregar conquistas"
        subtitle={error}
        actionText="Voltar ao painel"
        actionLink="/homepage"
      />
    );
  const unlocked = achievements.filter((item) => item.desbloqueada).length;
  return (
    <section className="social-page">
      <header className="social-hero">
        <div>
          <span className="social-kicker">
            <Award size={15} /> A tua coleção
          </span>
          <h1>Conquistas</h1>
          <p>
            Estuda, completa quizzes e mantém a sequência para desbloquear novos
            marcos.
          </p>
        </div>
        <div className="achievement-summary">
          <Trophy size={22} />
          <strong>
            {unlocked}/{achievements.length}
          </strong>
          <span>desbloqueadas</span>
        </div>
      </header>
      <div className="achievements-grid">
        {achievements.map((achievement) => (
          <article
            className={`achievement-card ${achievement.desbloqueada ? "unlocked" : ""}`}
            key={achievement.id}
          >
            {achievement.desbloqueada ? <Award /> : <LockKeyhole />}
            <div>
              <h2>{achievement.nome}</h2>
              <p>{achievement.descricao}</p>
            </div>
            {achievement.desbloqueada && (
              <span>
                <Target size={15} /> Conquistada
              </span>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}

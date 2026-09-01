import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Flame,
  Lock,
  Sparkles,
  Trophy,
  Zap,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { api, getModules } from "../data/api.js";
import "../style/gamification.css";
import "../style/dashboard.css";

export default function HomePage() {
  const { utilizador } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [achievements, setAchievements] = useState([]);
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboard() {
      try {
        const [statsData, achievementsData, modulesData] = await Promise.all([
          api.estatisticas(),
          api.listarConquistas(),
          getModules(),
        ]);

        setStats(statsData);
        setAchievements(achievementsData || []);
        setModules(Array.isArray(modulesData) ? modulesData : []);
      } catch {
        setStats(null);
        setAchievements([]);
        setModules([]);
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, []);

  const name = utilizador?.username || "aventureiro";
  const level = stats?.nivel ?? utilizador?.nivel ?? 1;
  const xp = stats?.xp ?? utilizador?.xp ?? 0;
  const streak = stats?.streakAtual ?? utilizador?.streak ?? 0;
  const completedModules = stats?.modulosConcluidos ?? 0;
  const xpProgress = useMemo(() => {
    const nextLevelXp = stats?.proximoLimiarXp ?? 500;
    const currentLevelStart = Math.max(nextLevelXp - 500, 0);
    const percentage =
      nextLevelXp === 0
        ? 0
        : ((xp - currentLevelStart) / (nextLevelXp - currentLevelStart || 1)) *
          100;
    return Math.min(Math.max(percentage, 0), 100);
  }, [stats, xp]);

  // Encontrar primeiro módulo não concluído ou último estudado
  const nextModuleToStudy = modules.find((m) => !m.concluido && m.estudado) ||
    modules.find((m) => !m.concluido) || 
    modules[modules.length - 1];

  // Encontrar módulo Python para o desafio
  const pythonModule = modules.find((m) => m.linguagem === "Python" && m.concluido);

  const missions = [
    {
      icon: <BookOpen />,
      title: "Javascript",
      detail: `${completedModules} módulos`,
      progress: completedModules > 0 ? 100 : 0,
      color: "green",
      action: () => {
        if (nextModuleToStudy) {
          navigate(`/modulo/${nextModuleToStudy.id}`);
        }
      },
    },
    {
      icon: <Zap />,
      title: "Python",
      detail: pythonModule ? `Quiz Python` : "Conclua um módulo Python",
      progress: 0,
      color: "gold",
      link: pythonModule ? `/quiz` : null,
      disabled: !pythonModule,
    },
    {
      icon: <Trophy />,
      title: "Conquistas",
      detail: `${achievements.filter((item) => item.desbloqueada).length} desbloqueadas`,
      progress: achievements.length
        ? Math.min(
            (achievements.filter((item) => item.desbloqueada).length /
              achievements.length) *
              100,
            100,
          )
        : 0,
      color: "gray",
      link: "/conquistas",
    },
  ];

  return (
    <div className="dashboard-container">
      <div className="dashboard">
        <header className="dashboard-header">
          <div>
            <div className="quest-eyebrow">
              <Sparkles size={15} /> PAINEL DE MISSÕES
            </div>
            <h1>Olá, {name}!</h1>
            <p>
              Continua a construir o teu futuro, uma linha de código de cada vez.
            </p>
          </div>
          <div className="streak-box">
            <Flame size={22} />
            <strong>{streak}</strong>
            <span>dias seguidos</span>
          </div>
        </header>

        <section className="level-banner">
          <div className="level-mark">{level}</div>
          <div className="level-copy">
            <span>NÍVEL {level}</span>
            <strong>Explorador de código</strong>
            <div className="level-progress">
              <i style={{ width: `${xpProgress}%` }} />
            </div>
            <small>{xp} XP no total</small>
          </div>
          <Trophy className="banner-trophy" size={42} />
        </section>

        <div className="dashboard-grid">
          <section>
            <div className="section-heading">
              <div>
                <span className="section-kicker">A TUA JORNADA</span>
                <h2>Missões em curso</h2>
              </div>
              <Link to="/linguagem">
                Ver todas <ArrowRight size={16} />
              </Link>
            </div>

            <div className="mission-list">
              {missions.map((mission) => (
                <div className={`mission ${mission.color}`} key={mission.title}>
                  <div className="mission-icon">{mission.icon}</div>
                  <div className="mission-copy">
                    <strong>{mission.title}</strong>
                    <span>{mission.detail}</span>
                    {mission.progress > 0 && (
                      <div className="mission-progress">
                        <i style={{ width: `${mission.progress}%` }} />
                      </div>
                    )}
                  </div>
                  {mission.action ? (
                    <button
                      className="mission-action"
                      onClick={mission.action}
                      disabled={mission.disabled}
                      title={mission.disabled ? "Conclua um módulo Python primeiro" : ""}
                    >
                      <ArrowRight size={18} />
                    </button>
                  ) : mission.link ? (
                    <Link className="mission-action" to={mission.link}>
                      <ArrowRight size={18} />
                    </Link>
                  ) : mission.progress > 0 ? (
                    <CheckCircle2 className="done-icon" size={22} />
                  ) : (
                    <Lock className="locked-icon" size={19} />
                  )}
                </div>
              ))}
            </div>
          </section>

          <aside className="dashboard-aside">
            <div className="section-heading">
              <div>
                <span className="section-kicker">ESTATÍSTICAS</span>
                <h2>O teu ritmo</h2>
              </div>
            </div>

            <div className="stats-container">
              <div className="stat-row">
                <span>
                  <Flame size={18} /> Streak atual
                </span>
                <strong>{streak} dias</strong>
              </div>
              <div className="stat-row">
                <span>
                  <Zap size={18} /> XP total
                </span>
                <strong>{xp}</strong>
              </div>
              <div className="stat-row">
                <span>
                  <CheckCircle2 size={18} /> Módulos concluídos
                </span>
                <strong>{completedModules}</strong>
              </div>
            </div>
            <Link className="rank-link" to="/ranking">
              Ver leaderboard <ArrowRight size={16} />
            </Link>
          </aside>
        </div>

        {loading && <p>Carregando dashboard...</p>}
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  CirclePlay,
  Sparkles,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import Button from "../components/button";
import LoadingSpinner from "../components/LoadingSpinner";
import EmptyState from "../components/EmptyState";
import { getModuleById, markModuleAsStudied } from "../data/api.js";
import "../style/learning.css";

export default function ModuloPage() {
  const { moduleId } = useParams();
  const [module, setModule] = useState(null);
  const [loading, setLoading] = useState(true);
  const [marking, setMarking] = useState(false);
  const [error, setError] = useState("");
  const [xpGanho, setXpGanho] = useState(0);
  useEffect(() => {
    getModuleById(moduleId)
      .then(setModule)
      .catch((err) =>
        setError(err?.message || "Não foi possível carregar o módulo."),
      )
      .finally(() => setLoading(false));
  }, [moduleId]);
  async function handleMarkStudied() {
    setMarking(true);
    try {
      const result = await markModuleAsStudied(moduleId);
      setXpGanho(result.xpGanho || 0);
      setModule((current) => ({ ...current, estudado: true }));
    } catch (err) {
      setError(err?.message || "Erro ao marcar módulo como estudado.");
    } finally {
      setMarking(false);
    }
  }
  if (loading) return <LoadingSpinner />;
  if (error || !module)
    return (
      <EmptyState
        icon={BookOpen}
        title="Módulo não encontrado"
        subtitle={error || "Não conseguimos carregar o módulo."}
        actionText="Voltar aos módulos"
        actionLink="/linguagem"
      />
    );
  return (
    <section className="module-page">
      <Link to="/linguagem" className="back-link">
        <ArrowLeft size={17} /> Todos os módulos
      </Link>
      <header className="module-banner">
        <span className="learning-kicker">
          <Sparkles size={15} /> Módulo {module.ordem ?? module.id}
        </span>
        <h1>{module.titulo}</h1>
        <p>{module.descricao}</p>
        <div className="module-meta">
          <span>{module.linguagem || "Programação"}</span>
          {module.concluido && (
            <span>
              <CheckCircle2 size={14} /> Concluído
            </span>
          )}
          {module.estudado && !module.concluido && (
            <span>Pronto para o quiz</span>
          )}
        </div>
      </header>
      <article className="lesson-panel">
        <h2>Conteúdo do módulo</h2>
        <div className="lesson-content">
          {module.conteudo || "Este módulo ainda não tem conteúdo disponível."}
        </div>
      </article>
      {xpGanho > 0 && (
        <p className="xp-reward">
          +{xpGanho} XP ganho por estudar este módulo.
        </p>
      )}
      <div className="module-actions">
        {!module.estudado && (
          <Button onClick={handleMarkStudied} disabled={marking}>
            {marking ? "A guardar progresso..." : "Marcar como estudado"}
          </Button>
        )}
        {module.estudado && (
          <Link to={`/quiz?moduleId=${module.id}`}>
            <Button>
              <CirclePlay size={18} /> Fazer quiz do módulo
            </Button>
          </Link>
        )}
        {!module.estudado && (
          <span className="module-quiz-hint">
            Marca o módulo como estudado para desbloquear o quiz.
          </span>
        )}
      </div>
    </section>
  );
}

import { useEffect, useState } from "react";
import {
  BookOpen,
  CheckCircle2,
  Clock,
  Sparkles,
  Star,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import EmptyState from "../components/EmptyState";
import { getModules } from "../data/api.js";
import "../style/learning.css";
import "../style/integration.css";

export default function LinguagensPage() {
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const location = useLocation();

  useEffect(() => {
    getModules()
      .then((data) => setModules(Array.isArray(data) ? data : []))
      .catch((err) =>
        setError(err?.message || "Não foi possível carregar os módulos."),
      )
      .finally(() => setLoading(false));
  }, []);

  // Depois de os módulos carregarem, se a URL trouxer uma âncora
  // (ex: /linguagem#python), faz scroll até essa secção.
  useEffect(() => {
    if (loading || !location.hash) return;
    const alvo = document.getElementById(location.hash.slice(1));
    if (alvo) {
      alvo.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [loading, location.hash]);

  if (loading) return <LoadingSpinner />;
  if (error)
    return (
      <EmptyState
        icon={BookOpen}
        title="Erro ao carregar módulos"
        subtitle={error}
        actionText="Tentar novamente"
        actionLink="/linguagem"
      />
    );
  if (!modules.length)
    return (
      <EmptyState
        icon={BookOpen}
        title="Nenhum módulo disponível"
        subtitle="Os módulos serão adicionados em breve."
        actionText="Voltar ao painel"
        actionLink="/homepage"
      />
    );

  const groups = modules.reduce((result, module) => {
    const language = module.linguagem || "Programação";
    result[language] = [...(result[language] || []), module];
    return result;
  }, {});

  return (
    <section className="learning-page">
      <header className="learning-hero">
        <div>
          <span className="learning-kicker">
            <Sparkles size={15} /> A tua jornada
          </span>
          <h1>Escolhe o próximo módulo.</h1>
          <p>
            Avança ao teu ritmo: estuda o conteúdo, completa o quiz e conquista
            XP.
          </p>
        </div>
        <span className="tag xp">
          {modules.filter((item) => item.concluido).length}/{modules.length}{" "}
          concluídos
        </span>
      </header>
      {Object.entries(groups).map(([language, languageModules]) => (
        <section
          className="language-section"
          key={language}
        >
          <div className="language-section-heading" id={language.toLowerCase()}>
            <span>{language}</span>
            <small>
              {languageModules.filter((item) => item.concluido).length}/
              {languageModules.length} concluídos
            </small>
          </div>
          <div className="module-grid">
            {languageModules.map((module, index) => {
              const temQuiz = module.totalPerguntas > 0;
              const pontuacaoPerfeita =
                temQuiz && module.maxAcertos === module.totalPerguntas;
              return (
              <Link
                className="module-tile"
                key={module.id}
                to={`/modulo/${module.id}`}
                aria-label={`Abrir ${module.titulo}`}
              >
                <div className="module-tile-top">
                  <span className="module-order">
                    {String(module.ordem ?? index + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={`module-status ${pontuacaoPerfeita ? "perfect" : module.concluido ? "done" : ""}`}
                  >
                    {pontuacaoPerfeita ? (
                      <Star size={19} fill="currentColor" />
                    ) : module.concluido ? (
                      <CheckCircle2 size={19} />
                    ) : module.estudado ? (
                      <Clock size={19} />
                    ) : (
                      <BookOpen size={19} />
                    )}
                  </span>
                </div>
                <h2>{module.titulo}</h2>
                <p>
                  {module.descricao || "Explora os fundamentos deste tema."}
                </p>
                <div className="module-tile-footer">
                  <div className="module-footer-info">
                    <span className="module-status-text">
                      {module.concluido
                        ? "Concluído"
                        : module.estudado
                          ? "Pronto para o quiz"
                          : "Por iniciar"}
                    </span>
                    {temQuiz && (
                      <span className="module-acertos">
                        {module.maxAcertos}/{module.totalPerguntas} questões corretas!
                      </span>
                    )}
                  </div>
                </div>
              </Link>
              );
            })}
          </div>
        </section>
      ))}
    </section>
  );
}
import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowRight,
  Check,
  CheckCircle2,
  Flame,
  Heart,
  Lightbulb,
  PartyPopper,
  RotateCcw,
  Trophy,
  XCircle,
} from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { getModules, getQuiz, submitQuiz } from "../data/api.js";
import { useAuth } from "../context/AuthContext.jsx";
import { useNotificacao } from "../context/NotificationContext.jsx";
import LoadingSpinner from "../components/LoadingSpinner.jsx";
import EmptyState from "../components/EmptyState.jsx";
import "../style/gamification.css";

export default function QuizPage() {
  const [searchParams] = useSearchParams();
  const moduleId = searchParams.get("moduleId");
  const { utilizador, atualizarUtilizador } = useAuth();
  const { notificarGamificacao } = useNotificacao();
  const startedAt = useRef(null);
  const [questions, setQuestions] = useState([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [quizId, setQuizId] = useState(null);
  const [modules, setModules] = useState([]);

  useEffect(() => {
    async function loadQuiz() {
      if (!moduleId) {
        setError("Módulo inválido.");
        setLoading(false);
        return;
      }
      try {
        const [data, listaModulos] = await Promise.all([
          getQuiz(moduleId),
          getModules().catch(() => []),
        ]);
        setQuizId(data.id);
        setQuestions(data.perguntas || []);
        setModules(Array.isArray(listaModulos) ? listaModulos : []);
        startedAt.current = Date.now();
      } catch (err) {
        setError(err?.message || "Não foi possível carregar o quiz.");
      } finally {
        setLoading(false);
      }
    }
    loadQuiz();
  }, [moduleId]);

  const question = questions[questionIndex];
  const selected = question ? (answers[question.id] ?? null) : null;
  const answered = selected !== null;

  function chooseOption(optionId) {
    if (!question) return;
    setAnswers((current) => ({ ...current, [question.id]: optionId }));
  }

  async function submitCurrentQuiz() {
    if (!quizId || !questions.length || submitting) return;
    setSubmitting(true);
    try {
      const respostas = questions.map((item) => ({
        perguntaId: item.id,
        alternativaId: answers[item.id],
      }));
      const tempoGastoSegundos = Math.max(
        1,
        Math.round((Date.now() - (startedAt.current || Date.now())) / 1000),
      );
      const response = await submitQuiz(quizId, respostas, tempoGastoSegundos);
      setResult(response);
      notificarGamificacao(response);
      atualizarUtilizador({ nivel: response.nivel, xp: response.xpTotal });
    } catch (err) {
      setError(err?.message || "Não foi possível submeter o quiz.");
    } finally {
      setSubmitting(false);
    }
  }

  function nextQuestion() {
    if (!question || !answered) return;
    if (questionIndex === questions.length - 1) {
      submitCurrentQuiz();
      return;
    }
    setQuestionIndex((current) => current + 1);
  }

  function restart() {
    setQuestionIndex(0);
    setAnswers({});
    setResult(null);
    setError("");
    startedAt.current = Date.now();
  }

  const score = useMemo(() => result?.acertos ?? 0, [result]);

  const { moduloAtual, proximoModulo } = useMemo(() => {
    const atual = modules.find((m) => String(m.id) === String(moduleId));
    if (!atual) return { moduloAtual: null, proximoModulo: null };
    const modulosDaLinguagem = modules
      .filter((m) => m.linguagem === atual.linguagem)
      .sort((a, b) => (a.ordem ?? 0) - (b.ordem ?? 0));
    const indice = modulosDaLinguagem.findIndex(
      (m) => String(m.id) === String(moduleId),
    );
    const proximo =
      indice >= 0 ? modulosDaLinguagem[indice + 1] || null : null;
    return { moduloAtual: atual, proximoModulo: proximo };
  }, [modules, moduleId]);
  if (loading)
    return (
      <div className="quest-page">
        <LoadingSpinner />
      </div>
    );
  if (error && !result)
    return (
      <div className="quest-page">
        <EmptyState
          icon={Lightbulb}
          title="Não foi possível abrir o quiz"
          subtitle={error}
          actionText="Voltar ao módulo"
          actionLink={`/modulo/${moduleId}`}
        />
      </div>
    );
  if (!question && !result)
    return (
      <div className="quest-page">
        <EmptyState
          icon={Lightbulb}
          title="Quiz não encontrado"
          subtitle="Não conseguimos carregar as perguntas do quiz."
          actionText="Voltar aos módulos"
          actionLink="/linguagem"
        />
      </div>
    );

  if (result) {
    return (
      <div className="quest-page quest-result">
        <div className="quest-eyebrow">
          <Trophy size={16} />{" "}
          {result.passou ? "MISSÃO CONCLUÍDA" : "TENTA NOVAMENTE"}
        </div>
        <h1>{result.passou ? "Excelente progresso." : "Estás quase lá."}</h1>
        <p className="quest-lead">
          Acertaste{" "}
          <strong>
            {result.acertos} de {result.totalPerguntas}
          </strong>{" "}
          perguntas e ganhaste <strong>{result.xpGanho ?? 0} XP</strong>.{" "}
          {result.passou
            ? "O módulo foi concluído."
            : `Precisas de ${result.notaMinimaConclusao}% para concluir o módulo.`}
        </p>
        <div className="result-stats">
          <div>
            <Trophy />
            <strong>{result.xpGanho ?? 0}</strong>
            <span>XP ganho</span>
          </div>
          <div>
            <Flame />
            <strong>{score}</strong>
            <span>respostas certas</span>
          </div>
          <div>
            <Heart />
            <strong>{result.erros}</strong>
            <span>erros</span>
          </div>
        </div>
        <section className="correction-list" aria-label="Correção do quiz">
          <h2>Revisão das respostas</h2>
          {result.correcao?.map((item, index) => (
            <article
              className={`correction-item ${item.correta ? "is-correct" : "is-wrong"}`}
              key={item.perguntaId}
            >
              {item.correta ? (
                <CheckCircle2 size={20} />
              ) : (
                <XCircle size={20} />
              )}
              <div>
                <strong>
                  {index + 1}. {item.enunciado}
                </strong>
                <p>
                  {item.correta ? "Resposta correta." : "Resposta incorreta."}{" "}
                  {item.explicacao || "Revê este tópico antes de avançar."}
                </p>
              </div>
            </article>
          ))}
        </section>
        {result.passou && (
          <>
            {proximoModulo ? (
              <div className="quest-next-module">
                <Trophy size={18} />
                <span>
                  Pronto para continuar? O próximo módulo é{" "}
                  <strong>{proximoModulo.titulo}</strong>.
                </span>
              </div>
            ) : moduloAtual ? (
              <div className="quest-congrats">
                <PartyPopper size={22} />
                <div>
                  <strong>Parabéns!</strong>
                  <p>
                    Terminaste os conteúdos de {moduloAtual.linguagem}
                    !
                  </p>
                </div>
              </div>
            ) : null}
          </>
        )}
        <div className="quest-actions">
          <button className="primary-action" onClick={restart}>
            <RotateCcw size={18} /> Tentar novamente
          </button>
          {result.passou && proximoModulo ? (
            <Link
              className="secondary-action"
              to={`/modulo/${proximoModulo.id}`}
            >
              Próximo módulo <ArrowRight size={17} />
            </Link>
          ) : !result.passou ? (
            <Link className="secondary-action" to={`/modulo/${moduleId}`}>
              Rever módulo <ArrowRight size={17} />
            </Link>
          ) : null}
          <Link className="secondary-action" to="/linguagem">
            Voltar aos módulos <ArrowRight size={17} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="quest-page">
      <div className="quest-topline">
        <Link to={`/modulo/${moduleId}`} className="back-link">
          Voltar ao módulo
        </Link>
        <span>
          <Flame size={17} /> {utilizador?.streakAtual ?? 0} dias de streak
        </span>
      </div>
      <div className="quest-heading">
        <div>
          <div className="quest-eyebrow">
            DESAFIO DO MÓDULO <span className="topic-pill">Quiz</span>
          </div>
          <h1>Testa os teus conhecimentos.</h1>
        </div>
        <div className="xp-badge">
          <Trophy size={17} /> XP por melhoria
        </div>
      </div>
      <div className="progress-track">
        <span
          style={{
            width: `${((questionIndex + (answered ? 1 : 0)) / questions.length) * 100}%`,
          }}
        />
      </div>
      <div className="quiz-layout">
        <main className="question-panel">
          <div className="question-meta">
            <span>
              PERGUNTA {String(questionIndex + 1).padStart(2, "0")} /{" "}
              {String(questions.length).padStart(2, "0")}
            </span>
            <span>
              {answered ? "Resposta selecionada" : "Escolhe uma resposta"}
            </span>
          </div>
          <h2>{question.enunciado}</h2>
          <div className="answer-grid">
            {question.alternativas.map((option) => {
              const isSelected = selected === option.id;
              return (
                <button
                  key={option.id}
                  className={`answer-option ${isSelected ? "selected" : ""}`}
                  onClick={() => chooseOption(option.id)}
                  aria-pressed={isSelected}
                >
                  <span className="answer-icon">
                    {isSelected ? <Check size={17} /> : ""}
                  </span>
                  {option.texto}
                </button>
              );
            })}
          </div>
          <button
            className="primary-action next-action"
            onClick={nextQuestion}
            disabled={!answered || submitting}
          >
            {submitting
              ? "A corrigir..."
              : questionIndex === questions.length - 1
                ? "Ver resultado"
                : "Próxima pergunta"}{" "}
            <ArrowRight size={18} />
          </button>
        </main>
        <aside className="quest-side">
          <div className="side-icon">
            <Lightbulb size={23} />
          </div>
          <h3>Dica de estudo</h3>
          <p>
            Responde com calma: podes alterar a seleção antes de avançares para
            a próxima pergunta.
          </p>
          <div className="side-divider" />
          <span className="side-label">CONCLUSÃO DO MÓDULO</span>
          <strong className="reward">60%</strong>
          <span className="reward-caption">é a nota mínima para avançar</span>
        </aside>
      </div>
    </div>
  );
}
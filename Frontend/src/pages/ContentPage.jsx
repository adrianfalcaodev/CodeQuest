import { useEffect, useState } from "react";
import { ArrowLeft, BookOpen, CirclePlay } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import EmptyState from "../components/EmptyState";
import { getModuleById } from "../data/api.js";
import "../style/learning.css";

export default function ContentPage() {
  const { moduleId } = useParams();
  const [module, setModule] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getModuleById(moduleId)
      .then(setModule)
      .catch(() => setModule(null))
      .finally(() => setLoading(false));
  }, [moduleId]);
  if (loading) return <LoadingSpinner />;
  if (!module)
    return (
      <EmptyState
        icon={BookOpen}
        title="Conteúdo não encontrado"
        subtitle="Não conseguimos carregar esta lição."
        actionText="Voltar aos módulos"
        actionLink="/linguagem"
      />
    );
  return (
    <article className="content-reader">
      <Link to={`/modulo/${module.id}`} className="back-link">
        <ArrowLeft size={17} /> Voltar ao módulo
      </Link>
      <header className="reader-header">
        <span className="learning-kicker">
          {module.linguagem || "Programação"}
        </span>
        <h1>{module.titulo}</h1>
        <p>{module.descricao}</p>
      </header>
      <div className="reader-body">
        <p>
          {module.conteudo || "Este módulo ainda não tem conteúdo disponível."}
        </p>
      </div>
      <footer className="reader-footer">
        <Link to={`/modulo/${module.id}`}>
          <ArrowLeft size={17} /> Visão geral
        </Link>
        {module.estudado && (
          <Link to={`/quiz?moduleId=${module.id}`}>
            Testar conhecimentos <CirclePlay size={17} />
          </Link>
        )}
      </footer>
    </article>
  );
}

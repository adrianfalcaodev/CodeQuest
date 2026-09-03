import { BookOpen, Users, Sparkles } from "lucide-react";
import "../style/integration.css";
import "../style/social.css";
import Card from "../components/card.jsx";

export default function SobreNos() {
  return (
    <section className="social-page">
      <header className="social-hero">
        <div>
          <span className="social-kicker">
            <Sparkles size={15} /> Sobre o projeto
          </span>
          <h1>CodeQuest</h1>
          <p>
            Uma plataforma de aprendizagem que transforma conteúdos técnicos em
            módulos, quizzes e desafios envolventes.
          </p>
        </div>
      </header>

      <div className="sobre-grid">
        <article className="about-card">
          <Card>
          <div className="about-icon">
            <BookOpen size={28} />
          </div>
          <h2>O que é CodeQuest?</h2>
          <p>
            O CodeQuest é uma plataforma de aprendizagem de programação que torna o
            estudo mais envolvente através de XP, níveis, sequências, conquistas e uma
            classificação entre colegas.
          </p>
          <ul className="about-list">
            <li>Quizzes com correção automática e explicação das respostas</li>
            <li>Sistema de gamificação com XP, níveis, sequências e conquistas</li>
            <li>Classificação para acompanhar o progresso com outros utilizadores</li>
          </ul>
          </Card>
        </article>

        <article className="about-card">
          <Card>
          <div className="about-icon">
            <Sparkles size={28} />
          </div>
          <h2>O nosso objetivo</h2>
          <p>
            Ajudar quem está a dar os primeiros passos em programação a aprender
            de forma estruturada e motivadora, com conteúdo prático seguido de
            avaliação automática.
          </p>
          <ul className="about-list">
            <li>Conteúdo explicado com exemplos práticos</li>
            <li>Avaliação automática com feedback imediato</li>
            <li>Recompensar progresso real, não só repetição</li>
            <li>Comunidade envolvida através de ranking e conquistas</li>
          </ul>
          </Card>
        </article>

        <article className="about-card">
          <Card>
          <div className="about-icon">
            <Users size={28} />
          </div>
          <h2>Autores</h2>
          <p>
            Projeto desenvolvido no âmbito do curso Técnico Especialista em
            Tecnologias e Programação de Sistemas de Informação (TE-TPSI).
          </p>
          <ul className="about-list about-team">
            <li>Ádrian Falcão</li>
            <li>Ana Novo</li>
            <li>Diogo Pinto</li>
          </ul>
          </Card>
        </article>
      </div>

    </section>
  );
}

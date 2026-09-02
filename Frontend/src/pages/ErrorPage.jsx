import { Link, useNavigate } from "react-router-dom";
import { AlertCircle, Home, ChevronLeft } from "lucide-react";
import "./ErrorPage.css";

export default function ErrorPage() {
  const navigate = useNavigate();

  return (
    <div className="error-page-container">
      <div className="error-icon-wrapper">
        <AlertCircle />
      </div>
      <div className="error-content">
        <h1>Página não encontrada</h1>
        <p>Desculpe! A página que está procurando não existe ou foi removida.</p>
      </div>
      <div className="error-actions">
        <button
          className="error-btn-primary"
          onClick={() => navigate("/")}
        >
          <Home size={16} style={{ marginRight: "8px" }} />
          Voltar ao Início
        </button>
        <button
          className="error-btn-secondary"
          onClick={() => navigate(-1)}
        >
          <ChevronLeft size={16} style={{ marginRight: "8px" }} />
          Voltar Atrás
        </button>
      </div>
    </div>
  );
}
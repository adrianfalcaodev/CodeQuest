import { useNavigate } from "react-router-dom";
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
        <p>Desculpa! A página que estás a procurar não existe ou foi removida.</p>
      </div>
      <div className="error-actions">
        <button
          className="error-btn-primary"
          onClick={() => navigate("/")}
        >
          <Home size={16} style={{ marginRight: "8px" }} />
          Voltar ao início
        </button>
        <button
          className="error-btn-secondary"
          onClick={() => navigate(-1)}
        >
          <ChevronLeft size={16} style={{ marginRight: "8px" }} />
          Voltar atrás
        </button>
      </div>
    </div>
  );
}
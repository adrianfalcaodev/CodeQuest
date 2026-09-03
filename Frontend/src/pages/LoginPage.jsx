import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/button";
import Card from "../components/card";
import { useAuth } from "../context/AuthContext.jsx";
import { useNotificacao } from "../context/NotificationContext.jsx";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { entrar } = useAuth();
  const { notificarGamificacao } = useNotificacao();

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const resposta = await entrar(email, password);
      notificarGamificacao(resposta.gamificacao);
      navigate("/homepage");
    } catch (err) {
      setError(
        err?.message ||
          err?.erro ||
          "Erro ao tentar entrar. Verifica as tuas credenciais.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
        <Card
          title="Entrar na tua conta"
          subtitle="Acede ao CodeQuest para continuares a tua jornada."
        >
          <div className="item">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="teu@email.com"
              required
            />
          </div>

          <div className="item">
            <label htmlFor="password">Palavra-passe</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="********"
              required
            />
          </div>

          {error && <p className="form-error">{error}</p>}

          <p>
            Esqueceste-te da palavra-passe?{" "}
            <Link className="card-link" to="/esqueceusenha">
              Recuperar palavra-passe
            </Link>
          </p>

          <p>
            Ainda não tens conta?{" "}
            <Link className="card-link" to="/registo">
              Registar
            </Link>
          </p>

          <Button type="submit" disabled={loading}>
            {loading ? "A entrar..." : "Entrar"}
          </Button>
        </Card>
      </form>
    </div>
  );
}
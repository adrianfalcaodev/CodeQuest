import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/button";
import Card from "../components/card";
import { useAuth } from "../context/AuthContext.jsx";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { entrar } = useAuth();

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      await entrar(email, password);
      navigate("/homepage");
    } catch (err) {
      setError(
        err?.message ||
          err?.erro ||
          "Erro ao tentar entrar. Verifique suas credenciais.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
        <Card
          title="Entrar na sua conta"
          subtitle="Acesse o CodeQuest para continuar a sua jornada."
        >
          <div className="item">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="seu@email.com"
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

          <div className="form-links">
            <p>
              <Link className="card-link forgot-password" to="/esqueceusenha">
                🔑 Esqueceu a palavra-passe?
              </Link>
            </p>

            <p>
              Ainda não tem conta?{" "}
              <Link className="card-link" to="/registo">
                Registe-se
              </Link>
            </p>
          </div>

          <Button type="submit" disabled={loading}>
            {loading ? "Entrando..." : "Entrar"}
          </Button>
        </Card>
      </form>
    </div>
  );
}

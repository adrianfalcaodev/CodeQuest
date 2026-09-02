import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/button";
import Card from "../components/card";
import { useAuth } from "../context/AuthContext.jsx";
import { useNotificacao } from "../context/NotificationContext.jsx";

export default function RegistoPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { registar } = useAuth();
  const { notificarGamificacao } = useNotificacao();

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("A senha e a confirmação não coincidem.");
      return;
    }

    setLoading(true);

    try {
      const resposta = await registar(name, email, password);
      notificarGamificacao(resposta.gamificacao);
      setSuccess("Conta criada com sucesso. Redirecionando para o painel...");
      setTimeout(() => navigate("/homepage"), 1200);
    } catch (err) {
      setError(
        err?.message || err?.erro || "Erro ao criar conta. Tente novamente.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
        <Card
          title="Criar conta"
          subtitle="Junte-se ao CodeQuest e comece a aprender."
        >
          <div className="item">
            <label htmlFor="name">Nome</label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="O seu nome"
              required
            />
          </div>

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

          <div className="item">
            <label htmlFor="confirmPassword">Confirme a Palavra-passe</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              placeholder="********"
              required
            />
          </div>

          {error && <p className="form-error">{error}</p>}
          {success && <p className="form-success">{success}</p>}

          <p>
            Já tem conta?{" "}
            <Link className="card-link" to="/login">
              Entrar
            </Link>
          </p>

          <Button type="submit" disabled={loading}>
            {loading ? "Registrando..." : "Registar"}
          </Button>
        </Card>
      </form>
    </div>
  );
}
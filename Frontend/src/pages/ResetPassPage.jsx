import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Button from "../components/button";
import Card from "../components/card";
import { api } from "../data/api.js";

export default function ResetPassPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");

  const [novaPassword, setNovaPassword] = useState("");
  const [confirmarPassword, setConfirmarPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (!token) {
    return (
      <div className="login">
        <Card
          title="Redefinir palavra-passe"
          subtitle="Token inválido ou não fornecido."
        >
          <p>
            O link para redefinição da palavra-passe não é válido. Tenta novamente com
            um novo link.
          </p>
          <Button onClick={() => navigate("/esqueceusenha")}>
            Solicitar novo link
          </Button>
        </Card>
      </div>
    );
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setMessage("");

    if (novaPassword !== confirmarPassword) {
      setError("As palavras-passe não coincidem.");
      return;
    }

    if (novaPassword.length < 8) {
      setError("A palavra-passe deve ter pelo menos 8 caracteres.");
      return;
    }

    setLoading(true);
    try {
      const response = await api.redefinirPassword(token, novaPassword);
      setMessage(response.mensagem || "Palavra-passe redefinida com sucesso!");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError(err?.message || "Erro ao redefinir a palavra-passe.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
        <Card title="Redefinir palavra-passe" subtitle="Escolhe uma nova palavra-passe.">
          <div className="item">
            <label htmlFor="novaPassword">Nova palavra-passe</label>
            <input
              type="password"
              id="novaPassword"
              name="novaPassword"
              value={novaPassword}
              onChange={(event) => setNovaPassword(event.target.value)}
              placeholder="Mínimo 8 caracteres"
              required
            />
          </div>

          <div className="item">
            <label htmlFor="confirmarPassword">Confirmar palavra-passe</label>
            <input
              type="password"
              id="confirmarPassword"
              name="confirmarPassword"
              value={confirmarPassword}
              onChange={(event) => setConfirmarPassword(event.target.value)}
              placeholder="Repete a palavra-passe"
              required
            />
          </div>

          {error && <p className="form-error">{error}</p>}
          {message && <p className="form-success">{message}</p>}

          <Button type="submit" disabled={loading}>
            {loading ? "A processar..." : "Redefinir palavra-passe"}
          </Button>
        </Card>
      </form>
    </div>
  );
}

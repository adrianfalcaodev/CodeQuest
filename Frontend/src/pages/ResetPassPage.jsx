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
          title="Redefinir Senha"
          subtitle="Token inválido ou não fornecido."
        >
          <p>
            O link para redefinição de senha não é válido. Tente novamente com
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
      setError("As passwords não coincidem.");
      return;
    }

    if (novaPassword.length < 8) {
      setError("A password deve ter pelo menos 8 caracteres.");
      return;
    }

    setLoading(true);
    try {
      const response = await api.redefinirPassword(token, novaPassword);
      setMessage(response.mensagem || "Password redefinida com sucesso!");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError(err?.message || "Erro ao redefinir a password.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
        <Card title="Redefinir Senha" subtitle="Escolha uma nova password.">
          <div className="item">
            <label htmlFor="novaPassword">Nova Password</label>
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
            <label htmlFor="confirmarPassword">Confirmar Password</label>
            <input
              type="password"
              id="confirmarPassword"
              name="confirmarPassword"
              value={confirmarPassword}
              onChange={(event) => setConfirmarPassword(event.target.value)}
              placeholder="Repita a password"
              required
            />
          </div>

          {error && <p className="form-error">{error}</p>}
          {message && <p className="form-success">{message}</p>}

          <Button type="submit" disabled={loading}>
            {loading ? "Processando..." : "Redefinir Password"}
          </Button>
        </Card>
      </form>
    </div>
  );
}

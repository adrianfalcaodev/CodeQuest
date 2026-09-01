import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../components/button";
import Card from "../components/card";
import { forgotPassword } from "../data/api.js";

export default function EsqueceuPassPage() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(event) {
        event.preventDefault();
        setError("");
        setMessage("");
        setLoading(true);

        try {
            const response = await forgotPassword({ email });
            setMessage(response.mensagem || "Pedido enviado. Verifique o seu email.");
        } catch (err) {
            setError(err?.message || "Erro ao enviar pedido de recuperação.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="login">
            <form onSubmit={handleSubmit}>
                <Card title="Esqueceu a senha?" subtitle="Indique seu email.">
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

                    {error && <p className="form-error">{error}</p>}
                    {message && <p className="form-success">{message}</p>}

                    <p>
                        Ainda não tem conta? <Link className="card-link" to="/registo">Registe-se</Link>
                    </p>

                    <Button type="submit" disabled={loading}>
                        {loading ? "Enviando..." : "Enviar"}
                    </Button>
                </Card>
            </form>
        </div>
    );
}

import { Link } from "react-router-dom";
import Button from "../components/button";
import Card from "../components/card";

export default function LoginPage() {
    return (
        <div className="login">
            <Card title="Entrar na sua conta" subtitle="Acesse o CodeQuest para continuar a sua jornada.">
                <div className="item">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" placeholder="seu@email.com" />
                </div>

                <div className="item">
                    <label htmlFor="password">Palavra-passe</label>
                    <input type="password" id="password" name="password" placeholder="********" />
                </div>

                <p>
                    <Link className="card-link" to="/esqueceusenha">Esqueceu a palavra-passe?</Link>
                </p>

                <p>
                    Ainda não tem conta? <Link className="card-link" to="/registo">Registe-se</Link>
                </p>

                <Button type="submit">Entrar</Button>
            </Card>
        </div>
    );
}
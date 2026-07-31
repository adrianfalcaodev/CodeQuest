import { Link } from "react-router-dom";
import Button from "../components/button";
import Card from "../components/card";

export default function EsqueceuPassPage() {
    return (
        <div className="login">
            <Card title="Esqueceu a senha?" subtitle="Indique seu email.">
                <div className="item">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" placeholder="seu@email.com" />
                </div>

                <p>
                    Ainda não tem conta? <Link className="card-link" to="/registo">Registe-se</Link>
                </p>

                <Button type="submit">Enviar</Button>
            </Card>
        </div>
    );
}
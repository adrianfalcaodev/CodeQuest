import { Link } from "react-router-dom";
import Button from "../components/button";
import Card from "../components/card";

export default function RegistoPage() {
    return (
        <div>
            <Card title="Criar conta" subtitle="Junte-se ao CodeQuest e comece a aprender.">
                <div className="item">
                    <label htmlFor="name">Nome</label>
                    <input type="text" id="name" name="name" placeholder="O seu nome" />
                </div>

                <div className="item">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" placeholder="seu@email.com" />
                </div>

                <div className="item">
                    <label htmlFor="password">Palavra-passe</label>
                    <input type="password" id="password" name="password" placeholder="********" />
                </div>

                   <div className="item">
                    <label htmlFor="confirmPassword">Confirme a Palavra-passe</label>
                    <input type="password" id="confirmPassword" name="confirm" placeholder="********" />
                </div>

                <p>
                    Já tem conta? <Link className="card-link" to="/login">Entrar</Link>
                </p>

                <Button type="submit">Registar</Button>
            </Card>
        </div>
    );
}
import {Link} from "react-router-dom";
import Button  from "../components/button";

export default function RegistoPage(){
    return(
        <div className="registo">
            <h1>Registo</h1>
            <div className="card">
                <div className="card-content">
                    <div className="item">
                        <label htmlFor="nome">Nome</label>
                        <input type="text" name="name"/>
                    </div>
                    <div className="item">
                        <label htmlFor="email">Email</label>
                        <input type="text" name="email"/>
                    </div>
                    <div className="item">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password"/>
                    </div>
                    <div className="item">
                        <label htmlFor="confirm">Confirmar Senha</label>
                        <input type="password" name="confirmPass" />
                    </div>
                    <p>Já tem conta? <Link to="/login">Faça Login</Link></p>
                    <Button type="submit">Registar</Button>
                </div>
            </div>
        </div>
    )
}
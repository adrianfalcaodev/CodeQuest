import {Link} from "react-router-dom";
import Button  from "../components/button";

export default function LoginPage(){
    return(
        <div className="login">
            <h1>Login</h1>
            <div className="card">
                <div className="card-content">
                    <div className="item">
                        <label htmlFor="email">Email</label>
                        <input type="text" name="email"/>
                    </div>
                    <div className="item">
                        <label htmlFor="password">Password</label>
                        <input type="text" name="password"/>
                    </div>
                    <p>Esqueceu a senha? <Link to="#">Clique aqui</Link></p>
                    <p>Não tem conta? <Link to="/registo">Registo</Link></p>
                    <Button type="submit">Login</Button>
                </div>
            </div>
        </div>
    )
}
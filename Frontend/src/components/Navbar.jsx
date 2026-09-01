import { useState } from "react";
import { Menu, X } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { urlAvatar } from "../data/api.js";

const links = [
  ["/homepage", "Dashboard"],
  ["/linguagem", "Módulos"],
  ["/ranking", "Ranking"],
  ["/conquistas", "Conquistas"],
  ["/perfil", "Perfil"],
];

export default function Navbar() {
  const { utilizador, sair, estaAutenticado } = useAuth();
  const navigate = useNavigate();
  const [menuAberto, setMenuAberto] = useState(false);
  const fecharMenu = () => setMenuAberto(false);
  function handleSair() {
    fecharMenu();
    navigate("/");
    sair();
  }

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <NavLink
          to={estaAutenticado ? "/homepage" : "/"}
          className="navbar-logo"
          onClick={fecharMenu}
        >
          Code<span className="ponto">Quest</span>
        </NavLink>
        {estaAutenticado && (
          <>
            <button
              className="navbar-menu-toggle"
              type="button"
              onClick={() => setMenuAberto((aberto) => !aberto)}
              aria-label="Abrir menu"
              aria-expanded={menuAberto}
            >
              {menuAberto ? <X size={21} /> : <Menu size={21} />}
            </button>
            <nav
              className={`navbar-links ${menuAberto ? "is-open" : ""}`}
              aria-label="Navegação principal"
            >
              {links.map(([to, label]) => (
                <NavLink
                  key={to}
                  to={to}
                  onClick={fecharMenu}
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  {label}
                </NavLink>
              ))}
            </nav>
            <div className="navbar-user">
              <span className="tag xp">Nv. {utilizador?.nivel ?? 1}</span>
              <NavLink
                to="/perfil"
                className="navbar-avatar"
                title={utilizador?.username}
                onClick={fecharMenu}
              >
                {utilizador?.avatar_url ? (
                  <img src={urlAvatar(utilizador.avatar_url)} alt="" />
                ) : (
                  <span>{utilizador?.username?.[0]?.toUpperCase() || "?"}</span>
                )}
              </NavLink>
              <button className="btn btn-sm navbar-logout" onClick={handleSair}>
                Sair
              </button>
            </div>
          </>
        )}
      </div>
    </header>
  );
}

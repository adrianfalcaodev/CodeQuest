import { Outlet, NavLink, useNavigate } from "react-router-dom";
import "../style/rootLayout.css";
import "../style/App.css";
import { CodeXml, Earth, Home, LogIn, UserRound } from "lucide-react";
import { clearAuth, getToken } from "../data/auth.js";

export default function RootLayout() {
  const navigate = useNavigate();
  const loggedIn = Boolean(getToken());

  function handleLogout() {
    clearAuth();
    navigate("/");
  }

  return (
    <>
      <input type="checkbox" id="menu-toggle" className="menu-toggle" />

      <header className="menubar">
        <label htmlFor="menu-toggle" className="hamburger">
          <span></span>
        </label>

        <nav className="navLinkRight">
          <div className="navLink"></div>

          <div className="auth-buttons">
            {loggedIn ? (
              <>
                <NavLink to="/perfil" className="login-btn">
                  <UserRound /> Perfil
                </NavLink>
                <button className="register-btn" type="button" onClick={handleLogout}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink to="/login" className="login-btn">
                  <LogIn /> Login
                </NavLink>
                <NavLink to="/registo" className="register-btn">
                  <UserRound /> Registo
                </NavLink>
              </>
            )}
          </div>
        </nav>
      </header>

      <aside className="sidebar">
        <h1>CodeQuest</h1>
        <NavLink to="/homepage">
          <Home /> Home
        </NavLink>
        <NavLink to="/linguagem">
          <CodeXml /> Linguagem
        </NavLink>
        <NavLink to="/ranking">
          <Earth /> Leaderboard
        </NavLink>
      </aside>

      <main className="content">
        <Outlet />
      </main>

      <footer className="footer">© 2026 CodeQuest</footer>
    </>
  );
}

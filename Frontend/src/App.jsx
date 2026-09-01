import { Routes, Route } from 'react-router-dom';
import { useAuth } from './context/AuthContext.jsx';
import { NotificationProvider } from './context/NotificationContext.jsx';
import Navbar from './components/Navbar.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegistoPage from './pages/ResgistoPage';
import HomePage from './pages/HomePage';
import LinguagensPage from './pages/LinguagemPage';
import QuizPage from './pages/QuizPage';
import RankingPage from './pages/RankingPage';
import PerfilPage from './pages/PerfilPage';
import EsqueceuPassPage from './pages/EsqueceuPassPage';
import ResetPassPage from './pages/ResetPassPage';
import ModuloPage from './pages/ModuloPage';
import ContentPage from './pages/ContentPage';
import ConquistasPage from './pages/ConquistasPage';
import ErrorPage from './pages/ErrorPage';

function App() {
  const { aCarregar } = useAuth();

  if (aCarregar) {
    return <div className="ecra-carregar">A carregar...</div>;
  }

  return (
    <NotificationProvider>
      <div className="app-shell">
        <Navbar />
        <main className="app-content">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/registo" element={<RegistoPage />} />
            <Route path="/esqueceusenha" element={<EsqueceuPassPage />} />
            <Route path="/redefinir-password" element={<ResetPassPage />} />
            <Route path="/erro" element={<ErrorPage />} />

            <Route element={<ProtectedRoute />}>
              <Route path="/homepage" element={<HomePage />} />
              <Route path="/linguagem" element={<LinguagensPage />} />
              <Route path="/modulo/:moduleId" element={<ModuloPage />} />
              <Route path="/conteudo/:moduleId/:lessonId" element={<ContentPage />} />
              <Route path="/quiz" element={<QuizPage />} />
              <Route path="/ranking" element={<RankingPage />} />
              <Route path="/conquistas" element={<ConquistasPage />} />
              <Route path="/perfil" element={<PerfilPage />} />
            </Route>

            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </main>
        <footer className="app-footer">
          <span>© {new Date().getFullYear()} CodeQuest</span>
          <span>Aprender, praticar, evoluir.</span>
        </footer>
      </div>
    </NotificationProvider>
  );
}

export default App;

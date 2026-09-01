import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function ProtectedRoute() {
  const { estaAutenticado, aCarregar } = useAuth();

  if (aCarregar) {
    return <div className="ecra-carregar">A carregar...</div>;
  }

  if (!estaAutenticado) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

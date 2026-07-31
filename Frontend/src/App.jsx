import { createBrowserRouter, RouterProvider} from "react-router-dom"
import RootLayout from "./components/rootLayout"
import HomePage from "./pages/HomePage"
import LinguagensPage from "./pages/LinguagemPage";
import LoginPage from "./pages/LoginPage";
import RegistoPage from "./pages/ResgistoPage";
import RankingPage from "./pages/RankingPage";
import ErrorPage from "./pages/ErrorPage";
import PerfilPage from "./pages/PerfilPage";
import QuizPage from "./pages/QuizPage";
import LandingPage from "./pages/LandingPage";
import EsqueceuPassPage from "./pages/EsqueceuPassPage";

export default function App() {
const router = createBrowserRouter([{
path: "/", element: <RootLayout/>, children: [
  {path:"/", errorElement: <ErrorPage/>, element: <LandingPage/>},
  {path: "/homepage", errorElement: <ErrorPage/>, element: <HomePage/>},
  {path: "/perfil", errorElement: <ErrorPage/>, element: <PerfilPage/>},
  {path: "/linguagem", errorElement: <ErrorPage/>, element: <LinguagensPage/>},
  {path: "/login", errorElement: <ErrorPage/>, element: <LoginPage/>},
  {path: "/registo", errorElemnt: <ErrorPage/>, element: <RegistoPage/>},
  {path: "/ranking", errorElement: <ErrorPage/>, element: <RankingPage/>},
  {path: "/quiz", errorElement: <ErrorPage/>, element: <QuizPage/>},
  {path: "/esqueceusenha", errorElement: <ErrorPage/>, element: <EsqueceuPassPage/>}
]
}])

  return <RouterProvider router={router} />;
}

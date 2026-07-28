import { createBrowserRouter, RouterProvider} from "react-router-dom"
import RootLayout from "./components/rootLayout"
import HomePage from "./pages/HomePage"
import LinguagensPage from "./pages/LinguagemPage";
import LoginPage from "./pages/LoginPage";
import RegistoPage from "./pages/ResgistoPage";
import RankingPage from "./pages/RankingPage";
import ErrorPage from "./pages/ErrorPage";

export default function App() {
const router = createBrowserRouter([{
path: "/", element: <RootLayout/>, children: [
  {path: "/", errorElement: <ErrorPage/>, element: <HomePage/>},
  {path: "/linguagem", errorElement: <ErrorPage/>, element: <LinguagensPage/>},
  {path: "/login", errorElement: <ErrorPage/>, element: <LoginPage/>},
  {path: "/registo", errorElemnt: <ErrorPage/>, element: <RegistoPage/>},
  {path: "/ranking", errorElement: <ErrorPage/>, element: <RankingPage/>}
]
}])

  return <RouterProvider router={router} />;
}

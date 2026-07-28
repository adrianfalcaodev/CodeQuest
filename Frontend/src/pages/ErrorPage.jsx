import {Link} from "react-router-dom"

export default function ErrorPage(){
    return(
        <>
        <h1>Ocorreu um erro</h1>
        <p>Essa página não existe! Retorne para a página<Link to="/">Home</Link></p>
        </>
    )
}
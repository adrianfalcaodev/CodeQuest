import Card from "../components/card"
import "../style/Page.css"


// Fazer uma função Loop para criar o leaderboard sem ter q colocar as classifições e nem os usuarios manualmente.
export default function RankingPage(){
    return(
        <>
        <h1>Página de Ranking</h1>
        <div className="page">
            <div className="space"></div>
            <div className="centerboard">
                <div className="modulo">
                    <Card title="Leaderboard" subtitle="" >
                        <Card subtitle="1º Lugar" image="#">A</Card>
                        <Card subtitle="2º Lugar" image="#">B</Card>
                    </Card>
                </div>
            </div>
            <div className="sideboard">
                <Card title="Conquistas" subtitle="xpto">
                        <Card subtitle="">
                            <div className="item">Nome</div>
                            <div className="item">XP</div>
                        </Card>
                </Card>
            </div>
        </div>
    </>
    )
}
import Card from "../components/card"
import "../style/Page.css"


// Fazer uma função Loop para criar o leaderboard sem ter q colocar as classifições e nem os usuarios manualmente.
export default function PerfilPage(){
    return(
        <div className="content">
        
        <h1>Página de Perfil do Usuário</h1>

                <div className="page">
        
                    <div className="space"></div>
                 <div className="centerboard">
                    <div className="modulo">
                        <Card title="UserName" subtitle="XPTO"></Card>
                    </div>
                    <div className="modulo">
                        <Card title="Modulo" subtitle="Capitulo/Progresso"></Card>
                    </div>
                    <div className="modulo">
                        <Card title="Modulo" subtitle="Capitulo/Progresso"></Card>
                    </div>
                 </div>
                 
                <div className="sideboard">
                    <Card title="Leaderboard" subtitle="">
                        <Card subtitle="1º Lugar">
                            <div className="item">NOME A</div>
                        </Card>
                    </Card>
    
                    <Card title="Conquistas" subtitle="xpto">
                        <Card subtitle="">
                            <div className="item">Nome</div>
                            <div className="item">XP</div>
                        </Card>
                    </Card>
                </div>
            </div>
        </div>
    )
}
import Card from "../components/card"
import "../style/Page.css"
import "../style/LandingPage.css"
import LumenImages from "../images/Pic_10_Lumen.png"

export default function LandingPage(){
    return(
        <div className="landing">
            <div className="landing-text">
                <p className="landing-label">Aprenda na prática</p>
                <h1>Transforme curiosidade em código.</h1>
                <p>Domine tecnologia com desafios curtos, progresso visível e uma jornada feita para manter você motivado.</p>
                <div className="landing-card">
                    <Card title="O seu próximo desafio" subtitle="Escolha um módulo e comece a conquistar XP." />
                </div>
            </div>
            <div className="imageLumen">
                <img src={LumenImages} alt="Mascote Lumen" width={200}/>
            </div>
        </div>
    )
}

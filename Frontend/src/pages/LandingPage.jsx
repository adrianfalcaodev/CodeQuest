import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import "../style/LandingPage.css";
import LumenImage from "../images/Pic_10_Lumen.png";

export default function LandingPage() {
  return (
    <section className="landing">
      <div className="landing-text">
        <p className="landing-label">
          <Sparkles size={15} /> Aprenda na prática
        </p>
        <h1>Transforme curiosidade em código.</h1>
        <p className="landing-lead">
          Domine tecnologia com desafios curtos, progresso visível e uma jornada
          feita para manter você motivado.
        </p>
        <div className="landing-actions">
          <Link className="landing-primary-action" to="/registo">
            Começar agora <ArrowRight size={18} />
          </Link>
          <Link className="landing-secondary-action" to="/login">
            Já tenho uma conta
          </Link>
        </div>
      </div>
      <div className="imageLumen">
        
        <img src={LumenImage} alt="Mascote Lumen" width={230} />
      </div>
    </section>
  );
}

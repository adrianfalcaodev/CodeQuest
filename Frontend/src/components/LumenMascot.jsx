import { useState } from "react";
import "./LumenMascot.css";

export default function LumenMascot() {
  const [mostrarBalao, setMostrarBalao] = useState(false);

  return (
    <div className="lumen-mascote">
      <div className={`lumen-balao ${mostrarBalao ? "visivel" : ""}`}>
        Sou o Lumen e em breve estarei disponível para te guiar nesta aventura!
      </div>
      <img
        src="../src/images/Pic_8_Lumen.png"
        alt="Lumen"
        className="lumen-imagem"
        onMouseEnter={() => setMostrarBalao(true)}
        onMouseLeave={() => setMostrarBalao(false)}
      />
    </div>
  );
}

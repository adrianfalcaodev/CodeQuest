import './XpBar.css';

// Calcula o limiar de XP para um nível, espelhando a fórmula do backend
// (ver Backend/src/utils/gamification.js) para desenhar a barra sem
// precisar de pedir esse valor ao servidor.
function xpNecessarioParaNivel(nivel) {
  if (nivel <= 1) return 0;
  return 100 * ((nivel * (nivel + 1)) / 2 - 1);
}

export default function XpBar({ xp = 0, nivel = 1 }) {
  const limiarAtual = xpNecessarioParaNivel(nivel);
  const proximoLimiar = xpNecessarioParaNivel(nivel + 1);
  const intervalo = proximoLimiar - limiarAtual;
  const progresso = intervalo > 0 ? ((xp - limiarAtual) / intervalo) * 100 : 100;

  return (
    <div className="xp-bloco">
      <div className="nivel-hex">{nivel}</div>
      <div className="xp-info">
        <div className="xp-legenda">
          <span>{xp} XP</span>
          <span>{proximoLimiar} XP</span>
        </div>
        <div className="xp-bar">
          <div
            className="xp-bar-fill"
            style={{ width: `${Math.min(Math.max(progresso, 0), 100)}%` }}
          />
        </div>
      </div>
    </div>
  );
}

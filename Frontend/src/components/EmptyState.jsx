import { Link } from "react-router-dom";
import "./EmptyState.css";

export default function EmptyState({
  icon: Icon,
  title,
  subtitle,
  actionText,
  actionLink,
}) {
  return (
    <div className="empty-state-container">
      {Icon && <Icon size={48} className="empty-state-icon" />}
      <div className="empty-state-content">
        <h2>{title}</h2>
        <p>{subtitle}</p>
      </div>
      {actionText && actionLink && (
        <div className="empty-state-action">
          <Link className="btn" to={actionLink}>{actionText}</Link>
        </div>
      )}
    </div>
  );
}

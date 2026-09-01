import { Link } from "react-router-dom";

export default function EmptyState({
  icon: Icon,
  title,
  subtitle,
  actionText,
  actionLink,
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "60px 20px",
        textAlign: "center",
        gap: "16px",
      }}
    >
      {Icon && <Icon size={48} style={{ color: "#d1d5db" }} />}
      <div>
        <h2 style={{ margin: "0 0 8px 0", color: "#1f2937" }}>{title}</h2>
        <p style={{ margin: "0", color: "#6b7280" }}>{subtitle}</p>
      </div>
      {actionText && actionLink && (
        <Link to={actionLink} style={{ marginTop: "16px" }}>
          <button
            style={{
              padding: "8px 16px",
              backgroundColor: "#3b82f6",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            {actionText}
          </button>
        </Link>
      )}
    </div>
  );
}

import "../style/card.css";

export default function Card({ title, image, subtitle, children, className = "" }) {
    return (
        <div className={`card ${className}`.trim()}>
            {(title || subtitle || image) && (
                <div className="card-header">
                    {image && <img src={image}/>}
                    {title && <h2 className="card-title">{title}</h2>}
                    {subtitle && <p className="card-subtitle">{subtitle}</p>}
                </div>
            )}
            <div className="card-content">{children}</div>
        </div>
    );
}
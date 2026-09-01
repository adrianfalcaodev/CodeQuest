import '../style/button.css';

export default function Button({ 
  children, 
  clickFunction, 
  onClick,
  type = "button", 
  disabled = false, 
  isActive, 
  className = "" 
}) {
  const handleClick = clickFunction || onClick;
  
  return (
    <button
      type={type}
      onClick={handleClick}
      disabled={disabled}
      className={`${isActive ? 'mybutton-active' : 'mybutton'} ${className}`.trim()}
    >
      {children}
    </button>
  );
}
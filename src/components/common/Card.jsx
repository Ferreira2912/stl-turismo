const Card = ({ children, className = "", hover = false }) => {
  const baseClasses = "bg-white rounded-xl shadow-lg overflow-hidden";
  const hoverClasses = hover ? "hover:shadow-xl transition-all duration-300" : "";
  
  return (
    <div className={`${baseClasses} ${hoverClasses} ${className}`}>
      {children}
    </div>
  );
};

export default Card;
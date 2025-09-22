import logo from "../assets/circleimages/logo.svg";

const Logo = ({ 
  className = "", 
  showText = true, 
  textSize = "text-xl", 
  logoSize = { width: 40, height: 40 },
  onClick = null 
}) => {
  return (
    <div 
      className={`flex items-center gap-3 ${onClick ? 'cursor-pointer' : ''} ${className}`}
      onClick={onClick}
    >
      <img
        src={logo}
        width={logoSize.width}
        height={logoSize.height}
        alt="CircleUp Logo"
        className="pointer-events-none select-none"
      />
      {showText && (
        <div className="flex flex-col">
          <span className={`font-bold text-white leading-tight ${textSize}`}>
            CIRCLE UP
          </span>
          <span className={`font-bold text-white leading-tight ${textSize}`}>
            VOLUNTEER
          </span>
          <span className="text-sm text-n-3 font-mono leading-tight">
            Community Based Learning
          </span>
        </div>
      )}
    </div>
  );
};

export default Logo;

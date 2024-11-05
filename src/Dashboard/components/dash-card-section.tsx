import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface DashCardSectionProps {
  children?: React.ReactNode;
  title: string;
  text: string;
  path?: string;
}

export const DashCardSection = ({
  children,
  title,
  text,
  path,
}: DashCardSectionProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  // Objeto para navegar entre rutas
  const navigate = useNavigate();

  const handleClick = () => {
    setIsClicked(true);

    setTimeout(() => {
      setIsClicked(false);
    }, 120);

    setTimeout(() => {
        navigate(path ? path : "")
    }, 200);
  };

  const handleMouseEnter = () => {
    console.log("handleMouseEnter");
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
      <div
        className={`dash-section ${isClicked ? "active" : ""} 
            ${isHovered ? "dash-section-mouse-entered" : ""
        }`}
        onClick={() => {
          handleClick();
        }}
        onMouseEnter={() => {
          handleMouseEnter();
        }}
        onMouseLeave={() => {
          handleMouseLeave();
        }}
      >
        <div className="dash-section-title">
          {children}
          <h1>{title}</h1>
        </div>

        <div className="dash-section-text">
          <p>{text}</p>
        </div>
      </div>
  );
};

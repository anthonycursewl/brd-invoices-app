import { useState } from 'react';
import './Tooltip.css'

interface TooltipProps {
    children: React.ReactNode;
    tooltipText: string;
}

function Tooltip({ children, tooltipText }: TooltipProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="tooltip-container" onMouseEnter={() => setShowTooltip(true)} onMouseLeave={() => setShowTooltip(false)}>
      {children}
      {showTooltip && (
        <div className={`tooltip ${showTooltip ? 'tooltip-active' : ''}`}>{tooltipText}</div>
      )}
    </div>
  );
}

export default Tooltip;
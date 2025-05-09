// components/TooltipPortal.tsx
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

export default function TooltipPortal({
  children,
  anchorRect,
}: {
  children: React.ReactNode;
  anchorRect: DOMRect | null;
}) {
  const [el] = useState(() => document.createElement('div'));

  useEffect(() => {
    document.body.appendChild(el);
    return () => {
      document.body.removeChild(el);
    };
  }, [el]);

  if (!anchorRect) return null;

  const style: React.CSSProperties = {
    position: 'absolute',
    top: anchorRect.bottom + window.scrollY,
    left: anchorRect.left + window.scrollX + anchorRect.width / 2 - 100, // centrar 200px ancho
    width: 200,
    height: 330,
    pointerEvents: 'none',
    zIndex: 9999,
  };

  return createPortal(<div style={style}>{children}</div>, el);
}

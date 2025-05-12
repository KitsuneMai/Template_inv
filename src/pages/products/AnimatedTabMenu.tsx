import React, { useRef, useState, useEffect } from "react";

interface Option {
  label: string;
  value: string;
}

interface AnimatedTabMenuProps {
  options: Option[];
  selected: string;
  onChange: (value: string) => void;
  onFilterChange: (filter: string) => void;
  onShowDashboard?: () => void;
  onShowSettings?: () => void;
}

export default function AnimatedTabMenu({
  options,
  selected,
  onChange,
  onFilterChange,
  onShowDashboard,
  onShowSettings,
}: AnimatedTabMenuProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoverStyle, setHoverStyle] = useState<React.CSSProperties>({
    width: 0,
    left: 0,
    opacity: 0,
  });

  const updateHover = (index: number) => {
    const container = containerRef.current;
    if (!container) return;

    const target = container.children[index] as HTMLElement;
    if (target) {
      const left = target.offsetLeft;
      const width = target.offsetWidth;

      // Pintamos de derecha a izquierda hasta donde esté el hover
      setHoverStyle({
        width: left + width,
        left: 0,
        opacity: 1,
        transition: "all 1000ms cubic-bezier(0.42, 0, 0.58, 1)",
      });
    }
  };

  const resetHover = () => {
    // Al salir, vuelve al botón seleccionado
    const selectedIndex = options.findIndex((o) => o.value === selected);
    const container = containerRef.current;
    if (!container) return;

    const target = container.children[selectedIndex] as HTMLElement;
    if (target) {
      const left = target.offsetLeft;
      const width = target.offsetWidth;

      setHoverStyle({
        width: width,
        left: left,
        opacity: 1,
        transition: "all 1500ms cubic-bezier(0.42, 0, 0.58, 1)",
      });
    }
  };

  useEffect(() => {
    if (selected) {
      resetHover();
    } else {
      // Si no hay opción seleccionada, no mostrar la capa clara
      setHoverStyle({
        width: 0,
        left: 0,
        opacity: 0,
      });
    }
  }, [selected]);

  const handleMouseLeave = () => {
    // Cuando el mouse salga del contenedor, reseteamos el hover
    setHoverStyle({
      width: 0,
      left: 0,
      opacity: 0,
      transition: "all 500ms cubic-bezier(0.42, 0, 0.58, 1)",
    });
  };

  const handleOptionClick = (option: { label: string; value: string }) => {
    onChange(option.value);
    if (option.value === "productos") {
      onFilterChange?.("all");
      onShowDashboard?.(); //
    }
    if (option.value === "settings") {
        onShowSettings?.();
      }
  };
  

  return (
    <div
      className="relative w-full overflow-hidden"
      onMouseLeave={handleMouseLeave} // Cuando el ratón salga de la barra
    >
      {/* Capa base: naranja oscuro */}
      <div className="absolute inset-0 bg-rose-200 z-0" />

      {/* Capa clara: se desplaza desde la derecha hacia la opción */}
      <div
        className="absolute top-0 left-0 h-full bg-rose-100 z-0"
        style={hoverStyle}
      />

      <div
        ref={containerRef}
        className="relative z-10 flex space-x-2 text-sm font-medium"
      >
        {options.map((option, index) => (
            <button
            key={option.value}
            className={`px-4 py-2 relative z-10 transition-colors duration-200 ${
                selected === option.value
                ? "text-white font-bold"
                : "text-orange-800 hover:text-orange-900"
            }`}
            onMouseEnter={() => updateHover(index)}
            onClick={() => handleOptionClick(option)} 
            >
            {option.label}
            </button>
        ))}
      </div>
    </div>
  );
}




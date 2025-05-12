import React, { useState } from 'react';
import TooltipPortal from './TooltipPortal';  // ajusta la ruta si hace falta

interface Tienda {
  id: number;
  nombre: string;
  imagenLogo: string | null;
}

interface CarruselTiendasProps {
  tiendas: Tienda[];
  reverse?: boolean;
}

const CarruselTiendas: React.FC<CarruselTiendasProps> = ({ tiendas, reverse = false }) => {
  const tiendasDuplicadas = [...tiendas, ...tiendas];

  // Estado para el portal
  const [hoverRect, setHoverRect] = useState<DOMRect | null>(null);
  const [hoverLogo, setHoverLogo] = useState<string | null>(null);

  return (
    <div className="relative w-full overflow-x-hidden overflow-y-visible border-y border-gray-200 bg-white">
      <div className="group overflow-visible">
        <div
          className={`flex gap-16 py-8 ${
            reverse ? 'animate-marquee-reverse' : 'animate-marquee'
          } group-hover:[animation-play-state:paused]`}
        >
          <div className="flex gap-16 whitespace-nowrap">
            {tiendasDuplicadas.map((tienda, index) => (
              <div
                key={`${tienda.id}-${index}`}
                className="relative cursor-pointer text-3xl font-extrabold text-gray-900 inline-block"
                onMouseEnter={e => {
                  const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
                  setHoverRect(rect);
                  setHoverLogo(tienda.imagenLogo);
                }}
                onMouseLeave={() => {
                  setHoverRect(null);
                  setHoverLogo(null);
                }}
              >
                {tienda.nombre}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Renderiza el portal si hay una tienda en hover */}
      {hoverRect && hoverLogo && (
        <TooltipPortal anchorRect={hoverRect}>
          <div className="w-full h-full bg-white rounded-2xl shadow-2xl border overflow-hidden">
            <img
              src={`http://localhost:3000/uploads/${hoverLogo}`}
              alt="Logo"
              className="w-full h-full object-cover"
            />
          </div>
        </TooltipPortal>
      )}
    </div>
  );
};

export default CarruselTiendas;















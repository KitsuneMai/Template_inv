// components/TiendaCard.tsx
import React from "react";
import { Link } from "react-router-dom";

interface TiendaCardProps {
  id: number;
  nombre: string;
  imagenLogo: string | null;
}

const TiendaCard: React.FC<TiendaCardProps> = ({ id, nombre, imagenLogo }) => {
  return (
    <Link
      to={`/tienda/${id}`}
      className="w-[350px] h-[580px] flex flex-col justify-between bg-white overflow-hidden shadow hover:shadow-lg transition transform hover:scale-105"
    >
      <div className="flex-grow bg-gray-100">
        {imagenLogo ? (
          <img
            src={`http://localhost:3000/uploads/${imagenLogo}`}
            alt={nombre}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            Sin imagen
          </div>
        )}
      </div>
      <div className="py-3 px-4 text-center">
        <h2 className="text-lg font-semibold text-gray-800">{nombre}</h2>
      </div>
    </Link>
  );
};

export default TiendaCard;

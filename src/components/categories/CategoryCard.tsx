import React from "react";
import { useNavigate } from "react-router-dom";

interface CategoryCardProps {
  id: number;  // Añadir el id
  nombre: string;
  icono?: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ id, nombre, icono }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    // Navegar usando el id de la categoría
    navigate(`/dashboard/categoria/${id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer bg-white p-6 rounded shadow hover:shadow-md transition duration-300 flex items-center justify-between"
    >
      <div>
        <h3 className="text-lg font-semibold capitalize">{nombre}</h3>
      </div>
      {icono && <span className="text-2xl">{icono}</span>}
    </div>
  );
};

export default CategoryCard;


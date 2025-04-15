import React from "react";

interface DashboardProps {
  onFilterChange: (filter: string) => void;
}

const ProductDashboard: React.FC<DashboardProps> = ({ onFilterChange }) => {
  return (
    <div className="relative w-full max-w-6xl mx-auto mt-4">
      {/* Carrusel */}
      <div className="relative z-10">
        {/* Aquí va tu componente de carrusel */}
      </div>

      {/* Contenedor de las tarjetas, ahora con posición relativa */}
      <div className="absolute bottom-0 left-0 right-0 z-20 mt-4">
        <div className="grid grid-cols-3 gap-4">
          <div
            className="p-4 border rounded-lg shadow cursor-pointer hover:bg-gray-100 bg-white" // bg-white para mantener el fondo blanco
            onClick={() => onFilterChange("all")} // Mostrar todos los productos
          >
            <h3 className="text-lg font-medium">Todos mis productos</h3>
          </div>

          <div
            className="p-4 border rounded-lg shadow cursor-pointer hover:bg-gray-100 bg-white"
            onClick={() => onFilterChange("lowStock")}
          >
            <h3 className="text-lg font-medium">Bajos en stock</h3>
            <p className="text-gray-500">Menos de 6 unidades</p>
          </div>

          <div
            className="p-4 border rounded-lg shadow cursor-pointer hover:bg-gray-100 bg-white"
            onClick={() => onFilterChange("search")}
          >
            <h3 className="text-lg font-medium">Buscar productos</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDashboard;








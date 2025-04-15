import React from "react";

interface DashboardProps {
  onFilterChange: (filter: string) => void;
}

const ProductDashboard: React.FC<DashboardProps> = ({ onFilterChange }) => {
  return (
    <div className="relative w-full max-w-6xl mx-auto mt-4">
      <div className="relative z-10">
      </div>

      {/* Tarjetas flotando encima del carrusel */}
      <div className="absolute top-[-90px] left-0 right-0 z-20">
        <div className="grid grid-cols-3 gap-4 max-w-4xl mx-auto">
          <div
            className="p-4 border rounded-lg shadow cursor-pointer hover:bg-gray-100 bg-white"
            onClick={() => onFilterChange("all")}
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










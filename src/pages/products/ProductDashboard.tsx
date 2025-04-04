import React from "react";

interface DashboardProps {
  onFilterChange: (filter: string) => void;
}

const ProductDashboard: React.FC<DashboardProps> = ({ onFilterChange }) => {
  return (
    <div className="grid grid-cols-3 gap-4 mt-4">
      <div
        className="p-4 border rounded-lg shadow cursor-pointer hover:bg-gray-100"
        onClick={() => onFilterChange("all")} // Mostrar todos los productos
      >
        <h3 className="text-lg font-medium">Todos mis productos</h3>
      </div>

      <div
        className="p-4 border rounded-lg shadow cursor-pointer hover:bg-gray-100"
        onClick={() => onFilterChange("lowStock")}
      >
        <h3 className="text-lg font-medium">Bajos en stock</h3>
        <p className="text-gray-500">Menos de 6 unidades</p>
      </div>

      <div
        className="p-4 border rounded-lg shadow cursor-pointer hover:bg-gray-100"
        onClick={() => onFilterChange("search")}
      >
        <h3 className="text-lg font-medium">Buscar productos</h3>
      </div>
    </div>
  );
};

export default ProductDashboard;




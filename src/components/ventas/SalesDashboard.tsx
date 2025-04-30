import React from "react";

interface SalesDashboardProps {
  searchQuery: string;
  onFilterClick: (filter: string) => void;
  onSearchChange: (value: string) => void;
}

const SalesDashboard: React.FC<SalesDashboardProps> = ({
  searchQuery,
  onFilterClick,
  onSearchChange,
}) => {
  return (
    <div className="relative w-full max-w-6xl mx-auto mt-4">
      <div className="relative z-10"></div>

      {/* Tarjetas flotando encima del carrusel */}
      <div className="absolute top-[-90px] left-0 right-0 z-20">
        <div className="grid grid-cols-3 gap-4 max-w-4xl mx-auto">
          <div
            className="p-4 border rounded-lg shadow cursor-pointer hover:bg-gray-100 bg-white max-w-xs mx-auto h-38"
            onClick={() => onFilterClick("todas")}
          >
            <h3 className="text-lg font-medium">Todas las ventas</h3>
          </div>

          <div
            className="p-4 border rounded-lg shadow cursor-pointer hover:bg-gray-100 bg-white"
            onClick={() => onFilterClick("mas-vendidos")}
          >
            <h3 className="text-lg font-medium">Más vendidos</h3>
          </div>

          <div
            className="p-4 border rounded-lg shadow cursor-pointer hover:bg-gray-100 bg-white"
            onClick={() => onFilterClick("buscar")}
          >
            <h3 className="text-lg font-medium">Buscar ventas</h3>
          </div>
        </div>
      </div>

      {/* Barra de búsqueda */}
      <div className="mt-4">
        <input
          type="text"
          name="buscarProducto"
          placeholder="Buscar por producto..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="px-4 py-2 border rounded-xl w-64"
        />
      </div>
    </div>
  );
};

export default SalesDashboard;





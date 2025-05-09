interface DashboardProps {
  onFilterChange: (filter: string) => void;
  onAddProductClick: () => void; // nueva prop
}

const ProductDashboard: React.FC<DashboardProps> = ({ onFilterChange, onAddProductClick }) => {
  return (
    <div className="relative w-full max-w-8xl mx-auto mt-32 mb-20">
      <div className="absolute top-[-90px] left-0 right-0 z-20">
        <div className="grid grid-cols-4 gap-4 max-w-5xl mx-auto">
          {/* Todos mis productos */}
          <div
            className="p-4 border rounded-lg shadow cursor-pointer hover:bg-gray-100 bg-white"
            onClick={() => onFilterChange("all")}
          >
            <h3 className="text-lg font-medium">Todos mis productos</h3>
          </div>

          {/* Productos bajos en stock */}
          <div
            className="p-4 border rounded-lg shadow cursor-pointer hover:bg-gray-100 bg-white"
            onClick={() => onFilterChange("lowStock")}
          >
            <h3 className="text-lg font-medium">Bajos en stock</h3>
            <p className="text-gray-500">Menos de 6 unidades</p>
          </div>

          {/* Buscar productos */}
          <div
            className="p-4 border rounded-lg shadow cursor-pointer hover:bg-gray-100 bg-white"
            onClick={() => onFilterChange("search")}
          >
            <h3 className="text-lg font-medium">Buscar productos</h3>
          </div>

          {/* Agregar producto */}
          <div
            className="p-4 border rounded-lg shadow cursor-pointer hover:bg-green-100 bg-white"
            onClick={onAddProductClick}
          >
            <h3 className="text-lg font-medium text-green-700">Agregar producto</h3>
            <p className="text-sm text-gray-500">Crea uno nuevo</p>
          </div>
        </div>
      </div>
    </div>
  );
};


export default ProductDashboard;








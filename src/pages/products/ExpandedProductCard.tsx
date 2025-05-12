
import React from "react";

interface Product {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  cantidad: number;
  imagenUrl: string;
  categoria_id: number;
  tienda_id: number;
  categoria: {
    id: number;
    nombre: string;
  };
}

interface Props {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (id: number) => void;
  onClose: () => void;
}

const ExpandedProductCard: React.FC<Props> = ({ product, onEdit, onDelete, onClose }) => {
  return (
    <div className="flex flex-col md:flex-row gap-6">
      <div className="flex-1 flex justify-center">
        <img
          src={`http://localhost:3000/uploads/${product.imagenUrl}`}
          alt={product.nombre}
          className="w-64 h-64 object-contain rounded-lg shadow"
        />
      </div>

      <div className="flex-1 flex flex-col justify-center">
        <h3 className="text-2xl font-semibold mb-2">{product.nombre}</h3>
        <p className="text-gray-600">{product.descripcion}</p>
        <div className="mt-4 space-y-2">
          <p className="text-lg font-medium text-gray-800">💲 Precio: ${product.precio}</p>
          <p className="text-lg text-gray-700">📦 Stock: {product.cantidad} unidades</p>
        </div>

        <div className="mt-4 flex gap-4">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit(product);
            }}
            className="relative inline-flex items-center justify-center p-0.5 text-sm font-medium 
              text-white rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 
              group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white 
              focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800"
          >
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-transparent 
              group-hover:bg-white group-hover:text-black rounded-md">
              Editar
            </span>
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(product.id);
            }}
            className="relative inline-flex items-center justify-center p-0.5 text-sm font-medium 
              text-white rounded-lg group bg-gradient-to-br from-red-500 via-red-300 to-yellow-200 
              group-hover:from-red-500 group-hover:via-red-300 group-hover:to-yellow-200 
              dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none 
              focus:ring-red-100 dark:focus:ring-red-400"
          >
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-transparent 
              group-hover:bg-white group-hover:text-black rounded-md">
              Eliminar
            </span>
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="text-gray-500 underline"
          >
            🔙 Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExpandedProductCard;

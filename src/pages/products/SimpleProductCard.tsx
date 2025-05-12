import React from "react";

interface SimpleProductCardProps {
  product: {
    id: number;
    nombre: string;
    precio: number;
    imagenUrl: string;
  };
  onClick: () => void;
}

const SimpleProductCard: React.FC<SimpleProductCardProps> = ({ product, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="w-full cursor-pointer mb-20"
    >
      <div
        className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow-sm 
        md:flex-row hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 
        transition duration-200 w-full"
      >
        <img
          className="object-contain w-full rounded-t-lg h-60 md:h-48 md:w-48 md:rounded-none md:rounded-s-lg bg-white"
          src={`http://localhost:3000/uploads/${product.imagenUrl}`}
          alt={product.nombre}
        />
        <div className="flex flex-col justify-between p-4 leading-normal w-full">
          <h5 className="mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white">
            {product.nombre}
          </h5>
          <p className="text-gray-700 dark:text-gray-300 font-semibold text-md">${product.precio}</p>
        </div>
      </div>
    </div>
  );
};

export default SimpleProductCard;


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
    <div onClick={onClick} className="cursor-pointer">
<img
  src={`http://localhost:3000/uploads/${product.imagenUrl}`}
  alt={product.nombre}
  className="w-full h-40 object-cover mb-2 rounded"
/>
      <h3 className="text-md font-medium">{product.nombre}</h3>
      <p className="text-gray-700">${product.precio}</p>
    </div>
  );
};

export default SimpleProductCard;

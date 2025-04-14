import React from "react";

interface Product {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  cantidad: number;
  imagenUrl: string;
  categoria_id: number;
  categoria: {
    id: number;
    nombre: string;
  };
}

interface Props {
  product: Product;
  inCart: boolean;
  onAddToCart: (product: Product) => void;
  onRemoveFromCart: (productId: number) => void;
  onClose: () => void;
}

const ExpandedProductCardPublic: React.FC<Props> = ({
  product,
  inCart,
  onAddToCart,
  onRemoveFromCart,
  onClose,
}) => {
  const handleCartAction = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (inCart) {
      onRemoveFromCart(product.id);
    } else {
      onAddToCart(product);
    }
  };

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
            onClick={handleCartAction}
            className={`relative inline-flex items-center justify-center p-0.5 text-sm font-medium 
              text-white rounded-lg group ${
                inCart
                  ? "bg-gradient-to-br from-pink-500 to-red-500"
                  : "bg-gradient-to-br from-green-400 to-lime-500"
              }
              group-hover:from-green-400 group-hover:to-lime-500 hover:text-white 
              focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800`}
          >
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-transparent 
              group-hover:bg-white group-hover:text-black rounded-md">
              {inCart ? "Quitar del carrito" : "Agregar al carrito"}
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

export default ExpandedProductCardPublic;

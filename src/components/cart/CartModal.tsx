import React from "react";

interface CartItem {
  productoId: number;
  nombre: string;
  cantidad: number;
  precio: number;
  imagenUrl: string;
}

interface CartModalProps {
  isOpen: boolean;
  items: CartItem[];
  onRemoveItem?: (productoId: number) => void;
  onCheckout?: () => void;
  onClose: () => void;
}

const CartModal: React.FC<CartModalProps> = ({
  isOpen,
  items,
  onRemoveItem,
  onCheckout,
  onClose,
}) => {
  if (!isOpen) return null;

  const total = items.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-40 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-lg relative">
        <h2 className="text-2xl font-semibold mb-4">🛒 Tu Carrito</h2>

        {items.length === 0 ? (
          <p className="text-gray-500">El carrito está vacío.</p>
        ) : (
          <ul className="space-y-4">
            {items.map((item) => (
              <li key={item.productoId} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={`http://localhost:3000/uploads/${item.imagenUrl}`}
                    alt={item.nombre}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div>
                    <p className="font-medium">{item.nombre}</p>
                    <p className="text-sm text-gray-600">Cantidad: {item.cantidad}</p>
                    <p className="text-sm text-gray-600">${item.precio}</p>
                  </div>
                </div>
                {onRemoveItem && (
                  <button
                    onClick={() => onRemoveItem(item.productoId)}
                    className="text-red-500 hover:text-red-700"
                  >
                    ✖
                  </button>
                )}
              </li>
            ))}
          </ul>
        )}

        {items.length > 0 && (
          <div className="mt-4 border-t pt-4">
            <p className="font-semibold text-right">Total: ${total}</p>
            {onCheckout && (
              <button
                onClick={onCheckout}
                className="w-full mt-2 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
              >
                Realizar Venta
              </button>
            )}
          </div>
        )}

        {/* Botón de cerrar */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl"
          aria-label="Cerrar"
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default CartModal;







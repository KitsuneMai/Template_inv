// components/cart/CartModal.tsx
import React from "react";
import Cart from "./Cart";

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
  onRemoveItem: (productoId: number) => void;
  onCheckout: () => void;
  onClose: () => void;
}

const CartModal: React.FC<CartModalProps> = ({ isOpen, items, onRemoveItem, onCheckout, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg relative w-full max-w-lg">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-500 hover:text-gray-800 text-xl"
        >
          ✖
        </button>
        <Cart items={items} onRemoveItem={onRemoveItem} onCheckout={onCheckout} />
      </div>
    </div>
  );
};

export default CartModal;
import React, { useEffect, useState } from "react";
import CartModal from "../../components/cart/CartModal";
import { CartItem } from "../../types/CartItem";

interface UserCartProps {
  isOpen: boolean;
  onClose: () => void;
}

const UserCart: React.FC<UserCartProps> = ({ isOpen, onClose }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const storedItems = localStorage.getItem("cart");
    if (storedItems) {
      setCartItems(JSON.parse(storedItems));
    }
  }, [isOpen]);

  const handleRemoveItem = (productoId: number) => {
    const updatedItems = cartItems.filter(item => item.productoId !== productoId);
    setCartItems(updatedItems);
    localStorage.setItem("cart", JSON.stringify(updatedItems));
  };

  const handleCheckout = async () => {
    try {
      const response = await fetch("http://localhost:3000/ventas/realizar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Error al procesar la venta");
      }

      setCartItems([]);
      localStorage.removeItem("cart");
      alert("¡Venta realizada con éxito!");
      onClose();
    } catch (error) {
      console.error("Error al realizar la venta:", error);
      alert("Hubo un problema al procesar la venta.");
    }
  };

  return (
    <CartModal
      isOpen={isOpen}
      items={cartItems}
      onRemoveItem={handleRemoveItem}
      onCheckout={handleCheckout}
      onClose={onClose}
    />
  );
};

export default UserCart;

// ✅ Función auxiliar que puedes usar desde otros componentes como ExpandedProductCard
export const agregarProductoAlCarritoBackend = async (
  carritoId: number,
  productoId: number,
  cantidad: number
) => {
  try {
    const response = await fetch("http://localhost:3000/carrito/agregar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ carritoId, productoId, cantidad }),
    });

    if (!response.ok) {
      throw new Error("Error al agregar producto al carrito");
    }

    const data = await response.json();
    console.log("✅ Producto agregado al carrito (backend):", data);
    return data;
  } catch (error) {
    console.error("❌ Error al agregar producto al carrito:", error);
    throw error;
  }
};












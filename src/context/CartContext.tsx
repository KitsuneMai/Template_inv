// src/context/CartContext.tsx
import { createContext, useContext, useState, ReactNode } from "react";

interface CartContextType {
  cantidadTotal: number;
  setCantidadTotal: (cantidad: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cantidadTotal, setCantidadTotal] = useState(0);

  return (
    <CartContext.Provider value={{ cantidadTotal, setCantidadTotal }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart debe usarse dentro de CartProvider");
  return context;
};

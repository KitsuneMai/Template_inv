// src/context/Providers.tsx
import { ReactNode } from "react";
import { AuthProvider } from "./AuthContext";
import { CartProvider } from "./CartContext";

export const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <AuthProvider>
      <CartProvider>
        {children}
      </CartProvider>
    </AuthProvider>
  );
};

// pages/dashboard.tsx
import React from "react";
import CategoryList from "../../components/categories/CategoryList";
import Toolbar, { ToolbarOption } from "../../components/Toolbar";
import CartModal from "../../components/cart/CartModal";

const Dashboard: React.FC = () => {
  const [isCartOpen, setIsCartOpen] = React.useState(false);

  // 🔁 Temporal: luego se conectará a lógica real de productos agregados
  const [cartItems, setCartItems] = React.useState([
    {
      productoId: 1,
      nombre: "Producto 1",
      cantidad: 2,
      precio: 10000,
      imagenUrl: "producto1.jpg",
    },
  ]);

  const handleRemoveFromCart = (productoId: number) => {
    setCartItems((prev) => prev.filter((item) => item.productoId !== productoId));
  };

  const handleCheckout = () => {
    alert("¡Compra realizada!");
    setCartItems([]); // vacía el carrito después del "checkout"
    setIsCartOpen(false);
  };

  const opcionesToolbar: ToolbarOption[] = [
    {
      label: "Ver carrito",
      onClick: () => setIsCartOpen(true),
    },
  ];

  return (
      <>
        <Toolbar options={opcionesToolbar} />
    
        <div className="container mx-auto px-4">
          <CategoryList />
        </div>
    
        <CartModal
          isOpen={isCartOpen}
          items={cartItems}
          onRemoveItem={handleRemoveFromCart}
          onCheckout={handleCheckout}
          onClose={() => setIsCartOpen(false)}
        />
      </>
    );
};

export default Dashboard;




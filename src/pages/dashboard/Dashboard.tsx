import React from "react";
import CategoryList from "../../components/categories/CategoryList";
import Toolbar, { ToolbarOption } from "../../components/Toolbar";
import CartModal from "../../components/cart/CartModal"; // Importar el CartModal
import { CartItem } from "../../types/CartItem";


const Dashboard: React.FC = () => {
  const [isCartOpen, setIsCartOpen] = React.useState(false);
  const [cartItems, setCartItems] = React.useState<CartItem[]>([]);

  const handleRemoveItem = (productoId: number) => {
    setCartItems((prev) => prev.filter((item) => item.productoId !== productoId));
  };

  const handleCheckout = () => {
    alert("Compra realizada");
    setCartItems([]); // Vaciar carrito
    setIsCartOpen(false); // Cerrar carrito
  };

  // Opciones para la barra de herramientas (Toolbar)
  const opcionesToolbar: ToolbarOption[] = [
    {
      label: "Ver carrito",
      onClick: () => setIsCartOpen(true), // Solo abrir el modal del carrito
    },
  ];

  return (
    <>
      <Toolbar options={opcionesToolbar} /> {/* Barra de herramientas con opción de carrito */}

      <div className="container mx-auto px-4">
        <CategoryList /> {/* Lista de categorías */}
      </div>

      {/* Modal del carrito, usando CartModal */}
      <CartModal
        isOpen={isCartOpen}
        items={cartItems}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleCheckout}
        onClose={() => setIsCartOpen(false)} // Cerrar el modal
      />
    </>
  );
};

export default Dashboard;














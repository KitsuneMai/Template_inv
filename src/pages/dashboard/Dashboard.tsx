import React from "react";
import { ShoppingCart } from "lucide-react";
import CategoryList from "../../components/categories/CategoryList";
import CartModal from "../../components/cart/CartModal";
import { CartItem } from "../../types/CartItem";
import Navbar from "../../components/Navbar";



const Dashboard: React.FC = () => {
  const [isCartOpen, setIsCartOpen] = React.useState(false);
  const [cartItems, setCartItems] = React.useState<CartItem[]>([]);

  const handleRemoveItem = (productoId: number) => {
    setCartItems((prev) => prev.filter((item) => item.productoId !== productoId));
  };

  const handleCheckout = () => {
    alert("Compra realizada");
    setCartItems([]);
    setIsCartOpen(false);
  };

  return (
    <>
      <div className="container mx-auto px-4 pt-16">
        <CategoryList />
      </div>

      <CartModal
        isOpen={isCartOpen}
        items={cartItems}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleCheckout}
        onClose={() => setIsCartOpen(false)}
      />
    </>
  );
};

export default Dashboard;















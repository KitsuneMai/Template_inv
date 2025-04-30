import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";
import Products from "./pages/products/Products";
import Users from "./pages/users/Users";
import Navbar from "./components/Navbar";
import Login from "./pages/login/Login";
import Register from "./pages/register/register";
import Categoria from "./pages/dashboard/Categoria";
import CartModal from "./components/cart/CartModal";
import { CartItem } from "./types/CartItem";

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const handleRemoveItem = (productoId: number) => {
    setCartItems((prev) => prev.filter((item) => item.productoId !== productoId));
  };

  const handleCheckout = () => {
    alert("Compra realizada");
    setCartItems([]);
    setIsCartOpen(false);
  };

  return (
    <Router>
      <Navbar onCartClick={() => setIsCartOpen(true)} />

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard/categoria/:categoria" element={<Categoria />} />
        <Route path="/products" element={<Products />} />
        <Route path="/users" element={<Users />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>

      <CartModal
        isOpen={isCartOpen}
        items={cartItems}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleCheckout}
        onClose={() => setIsCartOpen(false)}
      />
    </Router>
  );
}

export default App;





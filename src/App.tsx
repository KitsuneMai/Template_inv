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
import TiendaDinamica from "./pages/tienda/TiendaDinamica";
import TiendaIndividual from "./pages/tienda/TiendaIndividual";
import TodasLasTiendas from "./pages/tienda/TodasLasTiendas";
import Carrito from "./pages/Carrito";
import ProtectedRoute from "./components/ProtectedRoute";
import Nosotros from "./pages/nosotros/Nosotros";


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
      <Navbar/>

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard/categoria/:categoria" element={<Categoria />} />
        <Route
          path="/products"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <Products />
            </ProtectedRoute>
          }
        />
        <Route path="/users" element={<Users />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/tienda-demo" element={ <TiendaDinamica/>}/>
        <Route path="/tienda/:id" element={<TiendaIndividual/>}/>
        <Route path="/almacenes" element={<TodasLasTiendas/>}/>  
        <Route path="/carrito" element={<Carrito />} />    
        <Route path="/nosotros" element={<Nosotros/>} />
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





import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, ChevronUp, ShoppingCart, User } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { cantidadTotal } = useCart();
  const { user } = useAuth(); // 👈 Usa la cantidad del carrito

  return (
    <div className="fixed top-0 left-0 w-full z-50">
      <nav className="relative bg-gradient-to-b from-black/100 to-transparent p-4 text-white flex justify-between items-center fixed top-0 w-full z-20">
        <Link to="/">
          <h1 className="text-xl font-bold ml-6">Mi centro comercial</h1>
        </Link>
        <Link to="/almacenes">
          <h2 className="text-xl semi-bold ml-6">Almacenes</h2>
        </Link>
        <div className="flex items-center gap-3">
          {/* Carrito con contador */}
          <Link
            to="/carrito"
            className="relative p-2 rounded-full hover:bg-black/40 transition-colors"
          >
            <ShoppingCart size={20} />
            {cantidadTotal > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1">
                {cantidadTotal}
              </span>
            )}
          </Link>

          {/* Perfil */}
          <Link
            to="/login"
            className="p-2 rounded-full hover:bg-black/40 transition-colors"
          >
            <User size={20} />
          </Link>

          {/* Menú desplegable */}
          <div className="relative">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center gap-2 bg-black/40 px-4 py-2 rounded-md hover:bg-black/60"
            >
              Menú {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>

            {isOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white text-gray-900 rounded-md shadow-lg z-30">
                <Link
                  to="/"
                  className="block px-4 py-2 hover:bg-gray-200"
                  onClick={() => setIsOpen(false)}
                >
                  Dashboard
                </Link>
                {user?.role === 'admin' && (
                <Link
                  to="/products"
                  className="block px-4 py-2 hover:bg-gray-200"
                  onClick={() => setIsOpen(false)}
                >
                  Productos
                </Link>
                )}
                <Link
                  to="/users"
                  className="block px-4 py-2 hover:bg-gray-200"
                  onClick={() => setIsOpen(false)}
                >
                  Usuarios
                </Link>
              </div>
            )}
          </div>
        </div>

        <div className="absolute bottom-0 left-0 w-full h-10 bg-gradient-to-b from-transparent to-black/0 pointer-events-none" />
      </nav>
    </div>
  );
};

export default Navbar;






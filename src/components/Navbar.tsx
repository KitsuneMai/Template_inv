import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, ChevronUp, ShoppingCart, User } from "lucide-react";

interface NavbarProps {
  onCartClick: () => void;
}

const Navbar = ({ onCartClick }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="relative bg-gradient-to-b from-black/90 to-black/10 p-4 text-white flex justify-between items-center fixed top-0 w-full z-20">
      <h1 className="text-xl font-bold">Mi App</h1>

      <div className="flex items-center gap-3">
        {/* Botón del carrito */}
        <button
          onClick={onCartClick}
          className="p-2 rounded-full hover:bg-black/40 transition-colors"
        >
          <ShoppingCart size={20} />
        </button>

        {/* Botón de perfil */}
        <Link
          to="/login"
          className="p-2 rounded-full hover:bg-black/40 transition-colors"
        >
          <User size={20} />
        </Link>

        {/* Botón del menú */}
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
              <Link
                to="/products"
                className="block px-4 py-2 hover:bg-gray-200"
                onClick={() => setIsOpen(false)}
              >
                Productos
              </Link>
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

      {/* Difuminado inferior opcional */}
      <div className="absolute bottom-0 left-0 w-full h-6 bg-gradient-to-b from-transparent to-black/20 pointer-events-none" />
    </nav>
  );
};

export default Navbar;




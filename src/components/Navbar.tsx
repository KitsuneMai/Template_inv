import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, ChevronUp } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-800 p-4 text-white flex justify-between items-center z-20">
      <h1 className="text-xl font-bold">Mi App</h1>

      {/* Menú desplegable */}
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 bg-gray-700 px-4 py-2 rounded-md hover:bg-gray-600"
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
    </nav>
  );
};

export default Navbar;


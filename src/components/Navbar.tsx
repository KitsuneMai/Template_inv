import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, ChevronUp, ShoppingCart, User, Loader } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const { user, isLoggedIn, setUser } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const { cantidadTotal } = useCart();

  useEffect(() => {
    // Solo cambia isLoading a false cuando hay un usuario o no hay ninguno.
    if (user !== null || !isLoggedIn) {
      setIsLoading(false);
    }
  }, [user, isLoggedIn]);

  const handleLogout = async () => {
    try {
      await fetch('http://localhost:3000/usuarios/logout', {
        method: 'POST',
        credentials: 'include'
      });
      setUser(null);
      setIsLoading(false); // Asegúrate de resetear isLoading al cerrar sesión
      setShowLogoutModal(false);
      window.location.href = '/login'; // Redirige al login
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const LogoutModal = () => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-sm w-full">
        <h3 className="text-lg font-semibold mb-4 text-gray-700">Cerrar sesión</h3>
        <p className="mb-4 text-gray-700">¿Estás seguro que deseas salir?</p>
        <div className="flex justify-end gap-3">
          <button
            onClick={() => setShowLogoutModal(false)}
            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
          >
            Cancelar
          </button>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Cerrar sesión
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="fixed top-0 left-0 w-full z-50">
      <nav className="relative bg-gradient-to-b from-black/100 to-transparent p-4 text-white flex justify-between items-center fixed top-0 w-full z-20">
        <Link to="/">
          <h1 className="text-xl font-bold ml-6">Mi centro comercial</h1>
        </Link>
        <div className="relative flex">
          <Link to="/almacenes">
            <h2 className="text-xl semi-bold ml-6">Almacenes</h2>
          </Link>
          <Link
            to="/nosotros"
            className="text-xl semi-bold ml-6"
          >
            <h2>Nosotros</h2>
          </Link>
        </div>
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

          {/* Botón de perfil */}
          {isLoading ? (
            <Loader className="animate-spin" size={20} />
          ) : (
            <button
              onClick={() => isLoggedIn
                ? setShowLogoutModal(true)
                : (window.location.href = '/login')}
              className="p-2 rounded-full hover:bg-black/40 transition-colors"
            >
              <User size={20} />
            </button>
          )}
          {showLogoutModal && <LogoutModal />}

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
                {user?.roles?.includes('admin') && (
                <Link
                  to="/products"
                  className="block px-4 py-2 hover:bg-gray-200"
                  onClick={() => setIsOpen(false)}
                >
                  Productos
                </Link>
                )}
                {user?.roles?.includes('admin') && (
                <Link
                  to="/users"
                  className="block px-4 py-2 hover:bg-gray-200"
                  onClick={() => setIsOpen(false)}
                >
                  Usuarios
                </Link>
                )}
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







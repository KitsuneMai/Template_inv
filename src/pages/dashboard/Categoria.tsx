// pages/dashboard/Categoria.tsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SimpleProductCard from "../products/SimpleProductCard";
import Toolbar, { ToolbarOption } from "../../components/Toolbar";
import CartModal from "../../components/cart/CartModal";

interface Product {
  id: number;
  nombre: string;
  precio: number;
  imagenUrl: string;
}

const Categoria: React.FC = () => {
  const { categoria } = useParams();
  const [productos, setProductos] = useState<Product[]>([]);

  // 🛒 Estado del carrito
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([
    {
      productoId: 1,
      nombre: "Producto de prueba",
      cantidad: 1,
      precio: 5000,
      imagenUrl: "producto.jpg",
    },
  ]);

  const handleRemoveFromCart = (productoId: number) => {
    setCartItems((prev) => prev.filter((item) => item.productoId !== productoId));
  };

  const handleCheckout = () => {
    alert("Compra realizada");
    setCartItems([]);
    setIsCartOpen(false);
  };

  const opcionesToolbar: ToolbarOption[] = [
    {
      label: "Ver carrito",
      onClick: () => setIsCartOpen(true),
    },
  ];

  // 📦 Traer productos por categoría
  useEffect(() => {
    const fetchProductos = async () => {
      const res = await fetch(`http://localhost:3000/productos/categoria/${categoria}`);
      const data = await res.json();
      setProductos(data);
    };

    fetchProductos();
  }, [categoria]);

  return (
    <div>
      <Toolbar options={opcionesToolbar} />

      <h2 className="text-2xl font-bold capitalize">Productos de {categoria}</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {productos.map((product) => (
          <SimpleProductCard
            key={product.id}
            product={product}
            onClick={() => console.log("clic", product)}
          />
        ))}
      </div>

      <CartModal
        isOpen={isCartOpen}
        items={cartItems}
        onRemoveItem={handleRemoveFromCart}
        onCheckout={handleCheckout}
        onClose={() => setIsCartOpen(false)}
      />
    </div>
  );
};

export default Categoria;


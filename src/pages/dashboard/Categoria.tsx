// pages/dashboard/Categoria.tsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SimpleProductCard from "../products/SimpleProductCard";
import Toolbar, { ToolbarOption } from "../../components/Toolbar";
import CartModal from "../../components/cart/CartModal";
import ExpandedProductCardPublic from "../../components/ExpandedProductCardPublic";
import { Product } from "../../types/Product";
import { parseProduct } from "../../utils/parseProduct";

interface CartItem {
  productoId: number;
  nombre: string;
  cantidad: number;
  precio: number;
  imagenUrl: string;
}

const Categoria: React.FC = () => {
  const { categoria } = useParams();
  const [productos, setProductos] = useState<Product[]>([]);

  // 🛒 Estado del carrito
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const handleAddToCart = (product: Product) => {
    setCartItems((prev) => {
      const exists = prev.find((item) => item.productoId === product.id);
      if (exists) return prev;

      return [
        ...prev,
        {
          productoId: product.id,
          nombre: product.nombre,
          cantidad: 1,
          precio: product.precio,
          imagenUrl: product.imagenUrl,
        },
      ];
    });
  };

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

  const [productoExpandido, setProductoExpandido] = useState<Product | null>(null);

  // Traer productos por categoría
  useEffect(() => {
    const fetchProductos = async () => {
      const res = await fetch(`http://localhost:3000/productos/categoria/${categoria}`);
      const data = await res.json();
      setProductos(data);

      const productosParseados: Product[] = data.map(parseProduct);
      setProductos(productosParseados);
    };

    fetchProductos();
  }, [categoria]);

  return (
    <div>
      <Toolbar options={opcionesToolbar} />

      <h2 className="text-2xl font-bold capitalize mb-4">Productos de {categoria}</h2>

      {productoExpandido ? (
        <div className="mb-6">
          <ExpandedProductCardPublic
            product={productoExpandido}
            inCart={!!cartItems.find((item) => item.productoId === productoExpandido.id)}
            onAddToCart={handleAddToCart}
            onRemoveFromCart={handleRemoveFromCart}
            onClose={() => setProductoExpandido(null)}
          />
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {productos.map((product) => (
            <SimpleProductCard
              key={product.id}
              product={product}
              onClick={() => setProductoExpandido(product)}
            />
          ))}
        </div>
      )}

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



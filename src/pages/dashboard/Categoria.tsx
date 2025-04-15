// pages/dashboard/Categoria.tsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

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
    {
      label: "Regresar al dashboard",
      onClick: () => navigate("/"),
    },
  ];

  const [productoExpandido, setProductoExpandido] = useState<Product | null>(null);
  const [categoriaNombre, setCategoriaNombre] = useState("");

  // Traer productos por categoría
  useEffect(() => {
    const fetchDatos = async () => {
      // 1. Obtener los productos por categoría
      const resProductos = await fetch(`http://localhost:3000/productos/categoria/${categoria}`);
      const productosData = await resProductos.json();
      const productosParseados: Product[] = productosData.map(parseProduct);
      setProductos(productosParseados);
  
      // 2. Obtener todas las categorías
      const resCategorias = await fetch("http://localhost:3000/categorias");
      const categoriasData = await resCategorias.json();
  
      // 3. Buscar el nombre según el ID recibido por URL
      const catEncontrada = categoriasData.find((c: any) => String(c.id) === categoria);
      setCategoriaNombre(catEncontrada?.nombre || "Categoría desconocida");
    };
  
    fetchDatos();
  }, [categoria]);

  return (
    <>
    <Toolbar options={opcionesToolbar} />
        <div className="container mx-auto px-4">

        <h2 className="text-2xl font-bold capitalize mb-4">{categoriaNombre}</h2>

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
    </>
  );
};

export default Categoria;



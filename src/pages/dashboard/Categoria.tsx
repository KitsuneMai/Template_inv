import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import SimpleProductCard from "../products/SimpleProductCard";
import Toolbar, { ToolbarOption } from "../../components/Toolbar";
import ExpandedProductCardPublic from "../../components/ExpandedProductCardPublic";
import { Product } from "../../types/Product";
import { parseProduct } from "../../utils/parseProduct";
import UserCart from "../../components/cart/UserCart";
import { CartItem } from "../../types/CartItem";
import OverlayPortal from "../../components/OverlayPortal";



const Categoria: React.FC = () => {
  const { categoria } = useParams();
  const [productos, setProductos] = useState<Product[]>([]);
  const navigate = useNavigate();

  const [productoExpandido, setProductoExpandido] = useState<Product | null>(null);
  const [categoriaNombre, setCategoriaNombre] = useState("");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<Product[]>([]);

  useEffect(() => {
    const fetchDatos = async () => {
      try {
        const resProductos = await fetch(`http://localhost:3000/productos/categoria/${categoria}`);
        const productosData = await resProductos.json();
        const productosParseados: Product[] = productosData.map(parseProduct);
        setProductos(productosParseados);

        const resCategorias = await fetch("http://localhost:3000/categorias");
        const categoriasData = await resCategorias.json();
        const catEncontrada = categoriasData.find((c: any) => String(c.id) === categoria);
        setCategoriaNombre(catEncontrada?.nombre || "Categoría desconocida");
      } catch (error) {
        console.error("Error al cargar los datos", error);
      }
    };
    fetchDatos();
  }, [categoria]);

  const handleAddToCart = (product: Product) => {
    // 1. Actualiza el estado local (como ya lo hacías)
    setCartItems((prev) => [...prev, product]);
  
    // 2. Agrega también al carrito en localStorage con el formato CartItem
    const existingCart: CartItem[] = JSON.parse(localStorage.getItem("cart") || "[]");
  
    const existingItem = existingCart.find(item => item.productoId === product.id);
  
    let updatedCart;
    if (existingItem) {
      updatedCart = existingCart.map(item =>
        item.productoId === product.id
          ? { ...item, cantidad: item.cantidad + 1 }
          : item
      );
    } else {
      const newItem: CartItem = {
        productoId: product.id,
        nombre: product.nombre,
        cantidad: 1,
        precio: product.precio,
        imagenUrl: product.imagenUrl || "",
      };
      updatedCart = [...existingCart, newItem];
    }
  
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleRemoveFromCart = (productId: number) => {
    setCartItems((prev) => prev.filter((p) => p.id !== productId));
  };

  const isProductInCart = (productId: number) => {
    return cartItems.some((p) => p.id === productId);
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

  return (
    <>
      <Toolbar options={opcionesToolbar} />

      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold capitalize mb-4">{categoriaNombre}</h2>

        {productoExpandido ? (
          <OverlayPortal onClose={() => setProductoExpandido(null)}>
          <div className="mb-6">
            <ExpandedProductCardPublic
              product={productoExpandido}
              inCart={isProductInCart(productoExpandido.id)} // Verifica si el producto está en el carrito
              onAddToCart={handleAddToCart} // Agrega al carrito
              onRemoveFromCart={handleRemoveFromCart} // Elimina del carrito
              onClose={() => setProductoExpandido(null)} // Cierra la tarjeta expandida
            />
          </div>
          </OverlayPortal>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {productos.map((product) => (
              <SimpleProductCard
                key={product.id}
                product={product}
                onClick={() => setProductoExpandido(product)} // Expande el producto
              />
            ))}
          </div>
        )}
      </div>

      {/* Carrito de compras */}
      <UserCart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />
    </>
  );
};

export default Categoria;















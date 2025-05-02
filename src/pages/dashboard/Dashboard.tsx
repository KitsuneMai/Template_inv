import React from "react";
import { ShoppingCart } from "lucide-react";
import CategoryList from "../../components/categories/CategoryList";
import CartModal from "../../components/cart/CartModal";
import { CartItem } from "../../types/CartItem";
import Navbar from "../../components/Navbar";
import Carousel from "../../components/CarouselDashboard";
import FancyCard from "../../components/FancyCard";
import CustomButton from "../../components/CustomButton";
import CompactCard from "../../components/CompactCard";
import CollageSection from "../../components/CollageSection";
import Footer from "../../components/Footer";


const Dashboard: React.FC = () => {
  const [isCartOpen, setIsCartOpen] = React.useState(false);
  const [cartItems, setCartItems] = React.useState<CartItem[]>([]);

  const handleRemoveItem = (productoId: number) => {
    setCartItems((prev) => prev.filter((item) => item.productoId !== productoId));
  };

  const handleCheckout = () => {
    alert("Compra realizada");
    setCartItems([]);
    setIsCartOpen(false);
  };

  return (
    <>
      <Carousel />

      {/* Sección con fondo personalizado debajo del carrusel */}
      <div className="w-full bg-[#fff5f5] py-10 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Título */}
          <h2 className="text-3xl font-semibold text-highlight mt-10 mb-18">
            NUESTRAS TIENDAS DESTACADAS
          </h2>

          {/* Tarjeta destacada */}
          <div className="mb-12"> {/* Aumenté el margen inferior */}
            <FancyCard
              image="/images/joyeria.jpeg"
              title="Producto Estrella"
              description="Este producto revolucionará tu forma de trabajar."
              href="/tienda-demo"
            />
          </div>

          {/* Botón destacado */}
          <div className="mt-12 ml-24"> {/* Añadí un margen superior al botón */}
            <CustomButton
              label="Conócelas todas"
              size="lg"
              onClick={() => console.log("Redirigiendo...")}
            />
          </div>
        </div>
      </div>

      {/* Sección con fondo gris claro para las tarjetas compactas */}
      <div className="w-full bg-gray-100 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-semibold text-highlight mb-10">
            NUEVOS DESTACADOS
          </h2>

          {/* Grid de tarjetas */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-24">
            <CompactCard
              image="/images/helados2.jpg"
              title="Plazoleta de comidas"
              description="Saborea delicias artesanales y menús innovadores"
              href="/producto-1"
            />
            <CompactCard
              image="/images/gym.jpg"
              title="Gimnasio"
              description="Transforma tu energía en resultados con nuestro gimnasio de última generación"
              href="/producto-2"
            />
            <CompactCard
              image="/images/zonainfa.jpg"
              title="Zona para los peques"
              description="Risas garantizadas con actividades diseñadas para estimular su imaginación y energía."
              href="/producto-3"
            />
          </div>
        </div>
      </div>

        <CollageSection />
        <Footer />
        
      <CartModal
        isOpen={isCartOpen}
        items={cartItems}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleCheckout}
        onClose={() => setIsCartOpen(false)}
      />
    </>
  );
};

export default Dashboard;


















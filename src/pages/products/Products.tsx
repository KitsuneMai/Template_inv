import { useRef, useState } from "react";
import ProductForm from "../products/ProductForm";
import UpdateProductForm from "../products/UpdateProductForm";
import ProductDashboard from "../products/ProductDashboard";
import ProductListDashboard from "./ProductListDashboard";
import SalesFilterPanel from "../../components/ventas/SalesFilterPanel";
import StoreHeader from "../../components/StoreHeader";
import AnimatedTabMenu from "./AnimatedTabMenu";
import TiendaSettings from "./TiendaSettings";
import TiendaInfo from "../../components/TiendaInfo";
import Footer from "../../components/Footer";

interface Product {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  cantidad: number;
  imagenUrl: string;
  categoria_id: number;
  tienda_id: number;
  categoria?: {
    id: number;
    nombre: string;
  };
}

const Products: React.FC = () => {
  const [activeView, setActiveView] = useState<"form" | "edit" | "list" | null>("list");
  const [productToEdit] = useState<Product | null>(null);
  const [showDashboard, setShowDashboard] = useState(false);
  const [filter, setFilter] = useState<string>(""); // Filtro actual
  const [showSalesPanel, setShowSalesPanel] = useState(false);
  const [selected, setSelected] = useState("");
  const [showSettings, setShowSettings] = useState(false);
  const [searchTerm,] = useState("");
  const [showAllProducts, setShowAllProducts] = useState(false);
  const settingsRef = useRef<HTMLDivElement | null>(null);

  // Referencia al formulario
  const formRef = useRef<HTMLDivElement | null>(null);

  const options = [
    { label: "Productos", value: "productos" },
    { label: "Configuración", value: "settings" },
    { label: "Buscar", value: "search" },
  ];

  const toggleForm = () => {
    setActiveView((prev) => {
      const next = prev === "form" ? "list" : "form";
      // Si se activa el formulario, hacer scroll
      if (next === "form") {
        setTimeout(() => {
          formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100); // pequeño delay para asegurar renderizado
      }
      return next;
    });
  };

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
    setActiveView("list");
  };

  return (
     <div className="min-h-screen bg-gradient-to-br from-pink-500 to-orange-400 transition-all duration-200">
      <StoreHeader />

      <div className="p-0">
        <AnimatedTabMenu
          options={options}
          selected={selected}
          onChange={(value) => {
            setSelected(value);
            setShowSettings(false);
            setShowDashboard(false); // Oculta dashboard por defecto
            setShowSalesPanel(false); // Oculta panel de ventas
            setActiveView(null); // Oculta formularios o listas
            setFilter(""); // Limpia filtros
            setShowAllProducts(false); // Oculta todos los productos

            if (value === "productos") {
              setShowDashboard(true);
              setActiveView("list");
            }

            if (value === "settings") {
              setShowSettings(true);
              setTimeout(() => {
                settingsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
              }, 100);
            }

          }}
          onFilterChange={handleFilterChange}
          onShowDashboard={() => {
            setShowDashboard(true);
            setShowSalesPanel(false);
            setActiveView(null);
            setShowSettings(false);
          }}
          onShowSettings={() => setShowSettings(true)}
        />
      </div>
      <TiendaInfo />

      <div className="container mx-auto px-2 mt-20">
        {showSettings && (
          <div ref={settingsRef}>
            <TiendaSettings />
          </div>
        )}


        {showDashboard && (
          <ProductDashboard
            onFilterChange={handleFilterChange}
            onAddProductClick={toggleForm}
          />
        )}

        {showSalesPanel && <SalesFilterPanel onFilterChange={handleFilterChange} />}

        {activeView === "form" && (
          <div ref={formRef} className="mt-4 p-4 bg-gray-100 border rounded-lg mb-20">
            <ProductForm />
          </div>
        )}

        {activeView === "list" && showDashboard && (
          (filter === "all" || filter === "lowStock" || filter === "search") && (
            <div className="mt-4">
              <ProductListDashboard
                filter={filter}
                searchTerm={filter === "search" ? searchTerm : undefined}
              />
            </div>
          )
        )}

        {activeView === "edit" && productToEdit && (
          <div className="mt-4 p-4 bg-gray-100 border rounded-lg">
            <UpdateProductForm
              producto={productToEdit}
              onClose={() => setActiveView("list")}
              onSuccess={() => {
                setActiveView("list");
                // Recargar productos si es necesario
              }}
            />
          </div>
        )}
      </div>
      <Footer/>
    </div>
  );
};

export default Products;









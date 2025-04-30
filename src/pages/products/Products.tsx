import { useState } from "react";
import Toolbar, { ToolbarOption } from "../../components/Toolbar";
import ProductForm from "../products/ProductForm";
// import ProductList from "../products/ProductList";
import UpdateProductForm from "../products/UpdateProductForm";
import ProductDashboard from "../products/ProductDashboard";
import Carousel from "../products/Carousel"; // Importamos el carrusel
import ProductListDashboard from "./ProductListDashboard";
import SalesFilterPanel from "../../components/ventas/SalesFilterPanel";


interface Product {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  cantidad: number;
  imagenUrl: string;
  categoria_id: number;
  categoria?: {
    id: number;
    nombre: string;
  };
}

const Products: React.FC = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isListVisible, setIsListVisible] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [productToEdit, setProductToEdit] = useState<Product | null>(null);
  const [showDashboard, setShowDashboard] = useState(false);
  const [filter, setFilter] = useState<string>("");
  const [showSalesPanel, setShowSalesPanel] = useState(false);


  const toggleForm = () => {
    setIsFormVisible((prev) => !prev);
    setIsListVisible(false);
    setIsUpdating(false);
  };

  const toggleList = () => {
    setIsListVisible((prev) => !prev);
    setIsFormVisible(false);
    setIsUpdating(false);
  };

  const handleEditProduct = (product: Product) => {
    setProductToEdit(product);
    setIsUpdating(true);
    setIsListVisible(false);
    setIsFormVisible(false);
  };

  const handleCancelEdit = () => {
    setIsUpdating(false);
    setIsListVisible(true);
  };

  // Maneja el clic en imágenes del carrusel
  const handleImageClick = (index: number) => {
    console.log(`Click en la imagen del carrusel, índice: ${index}`);
  
    if (index === 0) {
      console.log("Click en la imagen 0 - Mostrando Dashboard de Productos");
      setShowDashboard(true);
      setShowSalesPanel(false); // Asegura que el panel de ventas no esté visible
      setIsListVisible(true);
    } else if (index === 1) {
      console.log("Click en la imagen 1 - Mostrando Panel de Ventas");
      setShowDashboard(false);
      setShowSalesPanel(true);
      setIsListVisible(true);
    } else {
      setShowDashboard(false);
      setShowSalesPanel(false);
      setIsListVisible(false);
    }
  };

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
    setIsListVisible(true);
  };

  const toolbarOptions: ToolbarOption[] = [
    { label: isFormVisible ? "Cerrar Formulario" : "Agregar Producto", onClick: toggleForm },
    { label: isListVisible ? "Ocultar Productos" : "Gestionar Productos", onClick: toggleList },
  ];

  return (
    <>
     <Toolbar options={toolbarOptions} />
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-bold my-4">Productos</h1>

        {/* Carrusel con evento de clic */}
        <Carousel onImageClick={handleImageClick} />

        {/* Dashboard con filtros */}
        {showDashboard && <ProductDashboard onFilterChange={handleFilterChange} />}

        {showSalesPanel && (
          <SalesFilterPanel onFilterChange={handleFilterChange} />
        )}

        {isFormVisible && (
          <div className="mt-4 p-4 bg-gray-100 border rounded-lg">
            <ProductForm />
          </div>
        )}

        {isListVisible && (
          <div className="mt-4">
            {showDashboard ? (
              <ProductListDashboard filter={filter} />
            ) : showSalesPanel ? null : (
              <ProductList onEditProduct={handleEditProduct} filter={filter} />
            )}
          </div>
        )}

        {isUpdating && productToEdit && (
          <div className="mt-4 p-4 bg-gray-100 border rounded-lg">
            <UpdateProductForm producto={productToEdit} onCancel={handleCancelEdit} />
          </div>
        )}
      </div>
    </>
  );
};

export default Products;





import { useState } from "react";
import Toolbar, { ToolbarOption } from "../../components/Toolbar";
import ProductForm from "../products/ProductForm";
import ProductList from "../products/ProductList";
import UpdateProductForm from "../products/UpdateProductForm"; // Importamos el formulario de edición

interface Product {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  cantidad: number;
  imagenUrl: string;
}

const Products: React.FC = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isListVisible, setIsListVisible] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [productToEdit, setProductToEdit] = useState<Product | null>(null);

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

  // Opciones específicas para la página de productos.
  const toolbarOptions: ToolbarOption[] = [
    { label: isFormVisible ? "Cerrar Formulario" : "Agregar Producto", onClick: toggleForm },
    { label: isListVisible ? "Ocultar Productos" : "Gestionar Productos", onClick: toggleList },
  ];

  return (
    <div>
      <Toolbar options={toolbarOptions} />
      <h1 className="text-2xl font-bold my-4">Productos</h1>

      {isFormVisible && (
        <div className="mt-4 p-4 bg-gray-100 border rounded-lg">
          <ProductForm />
        </div>
      )}

      {isListVisible && (
        <div className="mt-4">
          <ProductList onEditProduct={handleEditProduct} />
        </div>
      )}

      {isUpdating && productToEdit && (
        <div className="mt-4 p-4 bg-gray-100 border rounded-lg">
          <UpdateProductForm producto={productToEdit} onCancel={handleCancelEdit} />
        </div>
      )}
    </div>
  );
};

export default Products;




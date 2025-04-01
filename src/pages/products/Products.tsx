import { useState } from "react";
import Toolbar, { ToolbarOption } from "../../components/Toolbar";
import ProductModal from "../products/ProductModal"; 

const Products: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Opciones específicas para la página de productos.
  const toolbarOptions: ToolbarOption[] = [
    { label: "Agregar Producto", onClick: openModal },
    { label: "Gestionar Productos", onClick: () => console.log("Gestionar Productos") }
  ];

  return (
    <div>
      {/* El Toolbar se renderiza con las opciones propias de la página */}
      <Toolbar options={toolbarOptions} />

      <h1 className="text-2xl font-bold my-4">Productos</h1>
      {/* Aquí iría el contenido principal de la página de productos */}
      <p>Listado de productos...</p>

      {/* El modal se maneja en esta página y solo se renderiza cuando isModalOpen es true */}
      <ProductModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default Products;


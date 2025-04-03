import React, { useEffect, useState } from "react";
import UpdateProductModal from "./UpdateProductForm";

interface Product {
  id: number;
  nombre: string;
  descripcion: string;
  imagenUrl: string;
  precio: number;
  cantidad: number;
  categoriaId: number;
}

const ProductList: React.FC = () => {
  const [productos, setProductos] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Cargar productos desde la API
  useEffect(() => {
    fetch("http://localhost:3000/productos")
      .then((response) => response.json())
      .then((data) => setProductos(data))
      .catch((error) => console.error("Error al obtener productos:", error));
  }, []);

  // Manejar la apertura del modal con el producto seleccionado
  const handleEditClick = (producto: Product) => {
    setSelectedProduct(producto);
    setIsModalOpen(true);
  };

  // Actualizar la lista de productos después de editar uno
  const handleProductUpdate = () => {
    fetch("http://localhost:3000/productos")
      .then((response) => response.json())
      .then((data) => setProductos(data))
      .catch((error) => console.error("Error al actualizar productos:", error));
  };
  
  // Eliminar producto
  const handleDeleteProduct = async (id: number) => {
    const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar este producto?");
    if (!confirmDelete) return;
  
    try {
      const response = await fetch(`http://localhost:3000/productos/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        // Si el backend responde con 204 No Content, actualizamos la lista de productos
        setProductos(prevProductos => prevProductos.filter(producto => producto.id !== id));
      } else {
        console.error("Error al eliminar producto");
      }
    } catch (error) {
      console.error("Error en la solicitud de eliminación:", error);
    }
  };

  // ✅ Mover el return aquí, fuera de handleDeleteProduct
  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Lista de Productos</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {productos.map((producto) => (
          <div
            key={producto.id}
            className="bg-white p-4 rounded-lg shadow-md hover:scale-105 transition-transform flex flex-col items-center text-center"
          >
            <img
              src={`http://localhost:3000/uploads/${producto.imagenUrl}`}
              alt={producto.nombre}
              className="w-32 h-32 object-cover rounded-lg mb-3"
            />
            <h3 className="text-lg font-semibold">{producto.nombre}</h3>
            <p className="text-gray-600">{producto.descripcion}</p>
            <div className="mt-4 flex gap-2">
            {/* Botón Editar */}
            <button
                className="bg-gray-700 text-white px-4 py-2 rounded-md border border-gray-400 shadow-sm 
                        hover:bg-gray-600 hover:shadow-md transition-all"
                onClick={() => handleEditClick(producto)}
            >
                Editar
            </button>

            {/* Botón Eliminar */}
            <button 
                onClick={() => handleDeleteProduct(producto.id)}
                className="bg-red-600 text-white px-4 py-2 rounded-md border border-red-500 shadow-sm 
                        hover:bg-red-500 hover:shadow-md transition-all"
            >
                Eliminar
            </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal de actualización de producto */}
      {selectedProduct && (
        <UpdateProductModal
          producto={selectedProduct}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSuccess={handleProductUpdate} // Recargar la lista después de editar
        />
      )}
    </div>
  );
};

export default ProductList;





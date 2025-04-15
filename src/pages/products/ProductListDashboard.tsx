import React, { useEffect, useState } from "react";
import UpdateProductModal from "../products/UpdateProductModal";
import ExpandedProductCard from "./ExpandedProductCard";
import SimpleProductCard from "./SimpleProductCard";

interface Product {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  cantidad: number;
  imagenUrl: string;
  categoria_id: number;
  categoria: {
    id: number;
    nombre: string;
  };
}

interface ProductListProps {
  filter: string;
}

const ProductListDashboard: React.FC<ProductListProps> = ({ filter }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedProductId, setExpandedProductId] = useState<number | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:3000/productos");
      const data = await response.json();
  
      if (Array.isArray(data)) {
        const mappedData = data.map((item: any) => ({
          ...item,
          categoria_id: item.categoria?.id ?? 0,
          categoria: item.categoria ?? { id: 0, nombre: "" }, 
        }));
        
        setProducts(mappedData);
      } else {
        console.error("Error: la API no devolvió un array", data);
      }
    } catch (error) {
      console.error("Error al cargar productos:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleEditClick = (product: Product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedProduct(null);
  };

  const handleUpdateSuccess = () => {
    fetchProducts();
    closeModal();
  };

  if (!filter) {
    return null;
  }

  let filteredProducts = products;
  if (filter === "lowStock") {
    filteredProducts = products.filter((product) => product.cantidad < 6);
  } else if (filter === "search" && searchTerm) {
    filteredProducts = products.filter((product) =>
      product.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
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
        setProducts((prevProductos) => prevProductos.filter((producto) => producto.id !== id));
      } else {
        console.error("Error al eliminar producto");
      }
    } catch (error) {
      console.error("Error en la solicitud de eliminación:", error);
    }
  };

  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold mb-4">
        {filter === "lowStock" ? "Productos bajos en stock" : "Productos actuales"}
      </h2>

      {filter === "search" && (
        <input
          type="text"
          placeholder="Buscar producto..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        />
      )}

      {filteredProducts.length === 0 ? (
        <p className="text-gray-500 mt-4">No hay productos disponibles.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {filteredProducts.map((product) => {
          const isExpanded = expandedProductId === product.id;
          return (
          <div
            key={product.id}
            className={`${isExpanded ? "col-span-2 md:col-span-4" : ""}`}
          >
            {!isExpanded ? (
              <SimpleProductCard
                product={product}
                onClick={() => setExpandedProductId(product.id)}
              />
            ) : (
              <div className="relative border p-4 rounded-lg shadow bg-white transition-all cursor-pointer">
                <ExpandedProductCard
                  product={product}
                  onEdit={handleEditClick}
                  onDelete={handleDeleteProduct}
                  onClose={() => setExpandedProductId(null)}
                />
            </div>
            )}
              </div>
              );
            })}
        </div>
      )}

      {selectedProduct && (
        <UpdateProductModal
          producto={selectedProduct}
          isOpen={modalOpen}
          onClose={closeModal}
          onSuccess={handleUpdateSuccess}
        />
      )}
    </div>
  );
};

export default ProductListDashboard;












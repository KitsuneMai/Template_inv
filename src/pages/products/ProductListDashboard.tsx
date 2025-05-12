import React, { useEffect, useState } from "react";
import UpdateProductModal from "../products/UpdateProductModal";
import ExpandedProductCard from "./ExpandedProductCard";
import SimpleProductCard from "./SimpleProductCard";
import OverlayPortal from "../../components/OverlayPortal";

interface Product {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  cantidad: number;
  imagenUrl: string;
  categoria_id: number;
  tienda_id: number;
  categoria: {
    id: number;
    nombre: string;
  };
}

interface ProductListProps {
  filter: string;
  searchTerm?: string;
}

const ProductListDashboard: React.FC<ProductListProps> = ({ filter, searchTerm }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [expandedProductId, setExpandedProductId] = useState<number | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm ?? "");
  const [productosCargados, setProductosCargados] = useState(false);

  const fetchMisProductos = async () => {
    try {
      const response = await fetch("http://localhost:3000/productos/mis-productos", {
        credentials: "include",
      });
      const data = await response.json();

      if (Array.isArray(data)) {
        const mappedData = data.map((item: any) => ({
          ...item,
          categoria_id: item.categoria?.id ?? 0,
          categoria: item.categoria ?? { id: 0, nombre: "" },
        }));
        setProducts(mappedData);
        setProductosCargados(true);
      } else {
        console.error("Error: la API no devolvió un array", data);
      }
    } catch (error) {
      console.error("Error al cargar tus productos:", error);
    }
  };

  useEffect(() => {
    if (!productosCargados && (filter === "all" || filter === "lowStock" || filter === "search")) {
      fetchMisProductos();
    }
  }, [filter, productosCargados]);

  // Filtrar productos basados en la condición de filtro
  let filteredProducts = products;

  if (filter === "lowStock") {
    filteredProducts = products.filter((product) => product.cantidad < 6);
  } else if (filter === "search" && localSearchTerm) {
    filteredProducts = products.filter((product) =>
      product.nombre.toLowerCase().includes(localSearchTerm.toLowerCase())
    );
  }

  const handleEditClick = (product: Product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedProduct(null);
  };

  const handleUpdateSuccess = () => {
    fetchMisProductos();
    closeModal();
  };

  const handleDeleteProduct = async (id: number) => {
    const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar este producto?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://localhost:3000/productos/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
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
        {filter === "lowStock"
          ? "Productos bajos en stock"
          : filter === "search"
          ? "Buscar productos"
          : "Todos mis productos"}
      </h2>

      {filter === "search" && (
        <input
          type="text"
          placeholder="Buscar producto..."
          value={localSearchTerm}
          onChange={(e) => setLocalSearchTerm(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        />
      )}

      {!productosCargados ? (
        <p className="text-gray-500 mt-4">Selecciona una opción para ver tus productos.</p>
      ) : filteredProducts.length === 0 ? (
        <p className="text-gray-500 mt-4">No hay productos disponibles.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {filteredProducts.map((product) => {
            const isExpanded = expandedProductId === product.id;
            return (
              <div key={product.id}>
                <SimpleProductCard
                  product={product}
                  onClick={() => setExpandedProductId(isExpanded ? null : product.id)}
                />
                {isExpanded && (
                  <OverlayPortal onClose={() => setExpandedProductId(null)}>
                    <ExpandedProductCard
                      product={product}
                      onEdit={handleEditClick}
                      onDelete={handleDeleteProduct}
                      onClose={() => setExpandedProductId(null)}
                    />
                  </OverlayPortal>
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













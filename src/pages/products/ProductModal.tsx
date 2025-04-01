import React, { useEffect, useState } from "react";

interface Category {
  id: number;
  nombre: string;
}

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ isOpen, onClose }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [nombre, setNombre] = useState<string>("");
  const [descripcion, setDescripcion] = useState<string>("");
  const [precio, setPrecio] = useState<number>(0);
  const [cantidad, setCantidad] = useState<number>(0);

  // Recupera las categorías del backend al montar el componente
  useEffect(() => {
    fetch("http://localhost:3000/categorias", {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Categorías obtenidas:", data);
        setCategories(data);
        if (data.length > 0) {
          setSelectedCategory(data[0].id.toString());
        }
      })
      .catch((error) => console.error("Error al obtener categorías:", error));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validar que todos los campos estén completos
    if (!nombre || !descripcion || precio <= 0 || cantidad <= 0 || !selectedCategory) {
      console.error("Todos los campos son obligatorios y deben ser válidos.");
      return; // Prevenir el envío si hay campos inválidos
    }

    // Validar que selectedCategory sea un número válido
    const categoriaId = parseInt(selectedCategory);
    if (isNaN(categoriaId)) {
      console.error("El ID de categoría no es válido.");
      return; // Prevenir el envío si el ID de categoría es inválido
    }

    // Crear el objeto producto
    const producto = {
      nombre,
      descripcion,
      precio,
      cantidad,
      categoria_id: categoriaId,
    };

    console.log("Enviando producto:", producto);

    try {
      const response = await fetch("http://localhost:3000/productos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(producto),
      });

      if (response.ok) {
        console.log("Producto agregado correctamente");
        onClose(); // Cierra el modal después de agregar
      } else {
        // Si la respuesta no es OK, imprimir la respuesta completa para más detalles
        const responseBody = await response.json();
        console.error("Error al agregar producto:", responseBody);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
        >
          ✖
        </button>
        <h2 className="text-xl font-semibold mb-4">Agregar Producto</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium">Nombre</label>
            <input
              type="text"
              className="w-full border p-2 rounded"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Descripción</label>
            <textarea
              className="w-full border p-2 rounded"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
            ></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium">Precio</label>
            <input
              type="number"
              className="w-full border p-2 rounded"
              value={precio}
              onChange={(e) => setPrecio(Number(e.target.value))}
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Categoría</label>
            <select
              className="w-full border p-2 rounded"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.nombre}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium">Cantidad</label>
            <input
              type="number"
              className="w-full border p-2 rounded"
              value={cantidad}
              onChange={(e) => setCantidad(Number(e.target.value))}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Guardar
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProductModal;






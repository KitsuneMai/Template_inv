import React, { useEffect, useState } from "react";

interface Category {
  id: number;
  nombre: string;
}

const ProductForm: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [nombre, setNombre] = useState<string>("");
  const [descripcion, setDescripcion] = useState<string>("");
  const [precio, setPrecio] = useState<number>(0);
  const [cantidad, setCantidad] = useState<number>(0);
  const [imagen, setImagen] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    fetch("http://localhost:3000/categorias")
      .then((response) => response.json())
      .then((data) => {
        setCategories(data);
        if (data.length > 0) {
          setSelectedCategory(data[0].id.toString());
        }
      })
      .catch((error) => console.error("Error al obtener categorías:", error));
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setImagen(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombre || !descripcion || precio <= 0 || cantidad <= 0 || !selectedCategory) {
      console.error("Todos los campos son obligatorios y deben ser válidos.");
      return;
    }

    const categoriaId = parseInt(selectedCategory);
    if (isNaN(categoriaId)) {
      console.error("El ID de categoría no es válido.");
      return;
    }

    const formData = new FormData();
    formData.append("nombre", nombre);
    formData.append("descripcion", descripcion);
    formData.append("precio", precio.toString());
    formData.append("cantidad", cantidad.toString());
    formData.append("categoria_id", categoriaId.toString());

    if (imagen) {
      formData.append("file", imagen);
    }

    try {
      const response = await fetch("http://localhost:3000/productos", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert(" Producto agregado correctamente");

        // Limpiar campos después del registro exitoso
        setNombre("");
        setDescripcion("");
        setPrecio(0);
        setCantidad(0);
        setImagen(null);
        setPreview(null);
      } else {
        console.error(" Error al agregar producto:", await response.json());
      }
    } catch (error) {
      console.error(" Error en la solicitud:", error);
    }
  };

  return (
    <form className="max-w-[1500px] mx-auto bg-white p-6 rounded-lg shadow-md grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-3">
        <label className="text-sm font-medium">Nombre</label>
        <input type="text" className="border p-2 rounded" value={nombre} onChange={(e) => setNombre(e.target.value)} />

        <label className="text-sm font-medium">Cantidad</label>
        <input type="number" className="border p-2 rounded" value={cantidad} onChange={(e) => setCantidad(Number(e.target.value))} />

        <label className="text-sm font-medium">Precio</label>
        <input type="number" className="border p-2 rounded" value={precio} onChange={(e) => setPrecio(Number(e.target.value))} />

        <label className="text-sm font-medium">Categoría</label>
        <select className="border p-2 rounded" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>{cat.nombre}</option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-3 items-center">
        <label className="text-sm font-medium">Descripción</label>
        <textarea className="border p-2 rounded min-h-[150px] h-auto w-full md:w-[80%]" value={descripcion} onChange={(e) => setDescripcion(e.target.value)}></textarea>

        <div className="w-full flex flex-col items-center">
          <label className="text-sm font-medium">Imagen</label>
          <div className="w-60 h-60 border rounded-lg flex items-center justify-center overflow-hidden cursor-pointer relative">
            {preview ? (
              <img src={preview} alt="Vista previa" className="w-full h-full object-cover" />
            ) : (
              <span className="text-gray-400">Subir imagen</span>
            )}
            <input type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleImageChange} />
          </div>
        </div>

        <button type="submit" className="mt-4 w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          Guardar Producto
        </button>
      </div>
    </form>
  );
};

export default ProductForm;









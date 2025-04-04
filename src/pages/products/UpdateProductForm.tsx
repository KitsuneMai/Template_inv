// import { useState, useEffect } from "react";

// interface Product {
//   id: number;
//   nombre: string;
//   descripcion: string;
//   precio: number;
//   cantidad: number;
//   imagenUrl: string;
//   categoria: {
//     id: number;
//     nombre: string;
//   };
// }

// interface Categoria {
//   id: number;
//   nombre: string;
// }

// interface UpdateProductModalProps {
//   producto: Product;
//   isOpen: boolean;
//   onClose: () => void;
//   onSuccess: () => void;
// }

// const UpdateProductModal: React.FC<UpdateProductModalProps> = ({
//   producto,
//   isOpen,
//   onClose,
//   onSuccess,
// }) => {
//   const [formData, setFormData] = useState<Product>({ ...producto });
//   const [imagen, setImagen] = useState<File | null>(null);
//   const [preview, setPreview] = useState<string | null>(null);
//   const [categorias, setCategorias] = useState<Categoria[]>([]);
//   const [categoriaId, setCategoriaId] = useState<number>(0); // 👈 Nuevo estado independiente

//   useEffect(() => {
//     if (isOpen && producto) {
//       setFormData({
//         ...producto,
//       });

//       setCategoriaId(producto.categoria.id); // 👈 Cargamos la categoría actual
//       setPreview(
//         producto.imagenUrl
//           ? `http://localhost:3000/uploads/${producto.imagenUrl}`
//           : null
//       );
//     }
//   }, [isOpen, producto]);

//   useEffect(() => {
//     const fetchCategorias = async () => {
//       try {
//         const response = await fetch("http://localhost:3000/categorias");
//         if (!response.ok)
//           throw new Error("No se pudieron cargar las categorías");
//         const data = await response.json();
//         setCategorias(data);
//       } catch (error) {
//         console.error("Error al obtener categorías:", error);
//       }
//     };

//     fetchCategorias();
//   }, []);

//   const handleChange = (
//     e: React.ChangeEvent<
//       HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
//     >
//   ) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files?.length) {
//       const file = e.target.files[0];
//       setImagen(file);
//       setPreview(URL.createObjectURL(file));
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!categoriaId || isNaN(categoriaId) || categoriaId <= 0) {
//       console.error("Error: Debes seleccionar una categoría válida.");
//       return;
//     }

//     try {
//       let response;

//       if (imagen) {
//         const formDataToSend = new FormData();
//         formDataToSend.append("nombre", formData.nombre);
//         formDataToSend.append("descripcion", formData.descripcion);
//         formDataToSend.append("precio", formData.precio.toString());
//         formDataToSend.append("cantidad", formData.cantidad.toString());
//         formDataToSend.append("categoria_id", categoriaId.toString()); // ✅ usamos el estado separado
//         formDataToSend.append("file", imagen);

//         response = await fetch(`http://localhost:3000/productos/${producto.id}`, {
//           method: "PUT",
//           body: formDataToSend,
//         });
//       } else {
//         response = await fetch(`http://localhost:3000/productos/${producto.id}`, {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             nombre: formData.nombre,
//             descripcion: formData.descripcion,
//             precio: formData.precio,
//             cantidad: formData.cantidad,
//             categoria_id: categoriaId, // ✅ nuevamente usamos `categoriaId`
//           }),
//         });
//       }

//       if (response.ok) {
//         console.log("Producto actualizado correctamente");
//         onSuccess();
//         onClose();
//       } else {
//         const errorData = await response.json();
//         console.error("Error al actualizar producto:", errorData);
//       }
//     } catch (error) {
//       console.error("Error en la solicitud:", error);
//     }
//   };

//   if (!isOpen) return null;

//   const handleClose = () => {
//     setFormData({
//       id: 0,
//       nombre: "",
//       descripcion: "",
//       precio: 0,
//       cantidad: 0,
//       imagenUrl: "",
//       categoria: { id: 0, nombre: "" }, // Solo para no romper el tipo
//     });
//     setCategoriaId(0); // ✅ Limpiar la categoría seleccionada
//     setPreview(null);
//     onClose();
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
//         <div className="flex flex-col gap-3">
//           <h2 className="text-2xl font-bold text-blue-600">Editar Producto</h2>

//           <label className="text-sm font-medium">Nombre</label>
//           <input
//             type="text"
//             name="nombre"
//             value={formData.nombre}
//             onChange={handleChange}
//             className="border p-2 rounded"
//           />

//           <label className="text-sm font-medium">Cantidad</label>
//           <input
//             type="number"
//             name="cantidad"
//             value={formData.cantidad}
//             onChange={handleChange}
//             className="border p-2 rounded"
//           />

//           <label className="text-sm font-medium">Precio</label>
//           <input
//             type="number"
//             name="precio"
//             value={formData.precio}
//             onChange={handleChange}
//             className="border p-2 rounded"
//           />

//           <label className="text-sm font-medium">Categoría</label>
//           <select
//             name="categoria_id"
//             value={categoriaId}
//             onChange={(e) => setCategoriaId(Number(e.target.value))}
//             className="border p-2 rounded"
//           >
//             <option value={0} disabled>
//               Seleccione una categoría
//             </option>
//             {categorias.map((categoria) => (
//               <option key={categoria.id} value={categoria.id}>
//                 {categoria.nombre}
//               </option>
//             ))}
//           </select>
//         </div>

//         <div className="flex flex-col gap-3 items-center">
//           <label className="text-sm font-medium">Descripción</label>
//           <textarea
//             name="descripcion"
//             value={formData.descripcion}
//             onChange={handleChange}
//             className="border p-2 rounded min-h-[150px] h-auto w-full md:w-[80%]"
//           ></textarea>

//           <div className="w-full flex flex-col items-center">
//             <label className="text-sm font-medium">Imagen</label>
//             <div className="w-60 h-60 border rounded-lg flex items-center justify-center overflow-hidden cursor-pointer relative">
//               {preview ? (
//                 <img
//                   src={preview}
//                   alt="Vista previa"
//                   className="w-full h-full object-cover"
//                 />
//               ) : (
//                 <span className="text-gray-400">Subir imagen</span>
//               )}
//               <input
//                 type="file"
//                 accept="image/*"
//                 className="absolute inset-0 opacity-0 cursor-pointer"
//                 onChange={handleImageChange}
//               />
//             </div>
//           </div>

//           <div className="flex gap-2 mt-4">
//             <button
//               type="submit"
//               onClick={handleSubmit}
//               className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
//             >
//               Guardar Cambios
//             </button>
//             <button
//               onClick={handleClose}
//               className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
//             >
//               Cancelar
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UpdateProductModal;


import { useEffect, useState, ChangeEvent, FormEvent } from "react";

type Categoria = {
  id: number;
  nombre: string;
};

type Producto = {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  cantidad: number;
  categoria?: Categoria;
  imagenUrl?: string;
};

type Props = {
  producto: Producto;
  onClose: () => void;
  onSuccess: () => void;
};

const UpdateProductForm: React.FC<Props> = ({ producto, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({ ...producto });
  const [imagen, setImagen] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [categoriaId, setCategoriaId] = useState<number>(0);

  useEffect(() => {
    if (producto) {
      setFormData({ ...producto });
      setCategoriaId(producto.categoria?.id || 0);
      setPreview(
        producto.imagenUrl
          ? `http://localhost:3000/uploads/${producto.imagenUrl}`
          : null
      );
    }
  }, [producto]);

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const res = await fetch("http://localhost:3000/categorias");
        const data = await res.json();
        setCategorias(data);
      } catch (error) {
        console.error("Error cargando categorías:", error);
      }
    };
    fetchCategorias();
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      const file = e.target.files[0];
      setImagen(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!categoriaId || isNaN(categoriaId) || categoriaId <= 0) return;

    try {
      let response: Response;

      if (imagen) {
        const formDataToSend = new FormData();
        formDataToSend.append("nombre", formData.nombre);
        formDataToSend.append("descripcion", formData.descripcion);
        formDataToSend.append("precio", formData.precio.toString());
        formDataToSend.append("cantidad", formData.cantidad.toString());
        formDataToSend.append("categoria_id", categoriaId.toString());
        formDataToSend.append("file", imagen);

        response = await fetch(
          `http://localhost:3000/productos/${producto.id}`,
          {
            method: "PUT",
            body: formDataToSend,
          }
        );
      } else {
        response = await fetch(
          `http://localhost:3000/productos/${producto.id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              nombre: formData.nombre,
              descripcion: formData.descripcion,
              precio: formData.precio,
              cantidad: formData.cantidad,
              categoria_id: categoriaId,
            }),
          }
        );
      }

      if (response.ok) {
        onSuccess();
        onClose();
      } else {
        const errorData = await response.json();
        console.error("Error al actualizar:", errorData);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form
    onSubmit={handleSubmit}
    className="grid grid-cols-1 md:grid-cols-2 gap-6"
  >
    <div className="flex flex-col gap-3">
      <h2 className="text-2xl font-bold text-blue-600">Editar Producto</h2>
  
      <label className="text-sm font-medium">Nombre</label>
      <input
        type="text"
        name="nombre"
        value={formData.nombre}
        onChange={handleChange}
        className="border p-2 rounded"
      />
  
      <label className="text-sm font-medium">Cantidad</label>
      <input
        type="number"
        name="cantidad"
        value={formData.cantidad}
        onChange={handleChange}
        className="border p-2 rounded"
      />
  
      <label className="text-sm font-medium">Precio</label>
      <input
        type="number"
        name="precio"
        value={formData.precio}
        onChange={handleChange}
        className="border p-2 rounded"
      />
  
      <label className="text-sm font-medium">Categoría</label>
      <select
        value={categoriaId}
        onChange={(e) => setCategoriaId(Number(e.target.value))}
        className="border p-2 rounded"
      >
        <option value={0} disabled>
          Seleccione una categoría
        </option>
        {categorias.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.nombre}
          </option>
        ))}
      </select>
    </div>
  
    <div className="flex flex-col gap-3 items-center">
      <label className="text-sm font-medium">Descripción</label>
      <textarea
        name="descripcion"
        value={formData.descripcion}
        onChange={handleChange}
        className="border p-2 rounded min-h-[150px] h-auto w-full md:w-[80%]"
      ></textarea>
  
      <div className="w-full flex flex-col items-center">
        <label className="text-sm font-medium">Imagen</label>
        <div className="w-60 h-60 border rounded-lg flex items-center justify-center overflow-hidden cursor-pointer relative">
          {preview ? (
            <img
              src={preview}
              alt="Vista previa"
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-gray-400">Subir imagen</span>
          )}
          <input
            type="file"
            accept="image/*"
            className="absolute inset-0 opacity-0 cursor-pointer"
            onChange={handleImageChange}
          />
        </div>
      </div>
  
      <div className="flex gap-2 mt-4">
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Guardar Cambios
        </button>
        <button
          type="button"
          onClick={onClose}
          className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
        >
          Cancelar
        </button>
      </div>
    </div>
  </form>
  );
};

export default UpdateProductForm;



// import React, { useEffect, useState } from "react";
// import UpdateProductModal from "./UpdateProductForm";

// interface Product {
//   id: number;
//   nombre: string;
//   descripcion: string;
//   precio: number;
//   cantidad: number;
//   imagenUrl: string;
//   categoria_id: number;
//   categoria?: {
//     id: number;
//     nombre: string;
//   };
// }

// const ProductList: React.FC = () => {
//   const [productos, setProductos] = useState<Product[]>([]);
//   const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   // Cargar productos desde la API
//   useEffect(() => {
//     fetch("http://localhost:3000/productos")
//       .then((response) => response.json())
//       .then((data) => setProductos(data))
//       .catch((error) => console.error("Error al obtener productos:", error));
//   }, []);

//   // Manejar la apertura del modal con el producto seleccionado
//   const handleEditClick = (producto: Product) => {
//     setSelectedProduct(producto);
//     setIsModalOpen(true);
//   };

//   // Actualizar la lista de productos después de editar uno
//   const handleProductUpdate = () => {
//     fetch("http://localhost:3000/productos")
//       .then((response) => response.json())
//       .then((data) => setProductos(data))
//       .catch((error) => console.error("Error al actualizar productos:", error));
//   };

  // Eliminar producto
  // const handleDeleteProduct = async (id: number) => {
  //   const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar este producto?");
  //   if (!confirmDelete) return;

  //   try {
  //     const response = await fetch(`http://localhost:3000/productos/${id}`, {
  //       method: "DELETE",
  //     });

  //     if (response.ok) {
  //       // Si el backend responde con 204 No Content, actualizamos la lista de productos
  //       setProductos((prevProductos) => prevProductos.filter((producto) => producto.id !== id));
  //     } else {
  //       console.error("Error al eliminar producto");
  //     }
  //   } catch (error) {
  //     console.error("Error en la solicitud de eliminación:", error);
  //   }
  // };

//   return (
//     <div className="max-w-7xl mx-auto p-6">
//       <h2 className="text-2xl font-bold mb-4">Lista de Productos</h2>
//       <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
//         {productos.map((producto) => (
//           <div
//             key={producto.id}
//             className="bg-white p-4 rounded-lg shadow-md hover:scale-105 transition-transform flex flex-col items-center text-center h-full"
//           >
//             <img
//               src={`http://localhost:3000/uploads/${producto.imagenUrl}`}
//               alt={producto.nombre}
//               className="w-32 h-32 object-cover rounded-lg mb-3"
//             />
//             <h3 className="text-lg font-semibold">{producto.nombre}</h3>
//             <p className="text-gray-600 flex-grow" title={producto.descripcion}>
//               {producto.descripcion.length > 100
//                 ? `${producto.descripcion.substring(0, 100)}...`
//                 : producto.descripcion}
//             </p>

//             {/* Botones alineados al fondo */}
//             <div className="mt-auto flex gap-2 w-full justify-center pt-4 border-t">
//               {/* Botón Editar con efecto gradient */}
//               <button
//                 onClick={() => handleEditClick(producto)}
//                 className="relative inline-flex items-center justify-center p-0.5 text-sm font-medium 
//                 text-white rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 
//                 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white 
//                 focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800"
//               >
//                 <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-transparent 
//                 group-hover:bg-white group-hover:text-black rounded-md">
//                   Editar
//                 </span>
//               </button>

//               {/* Botón Eliminar con diseño compacto */}
            //   <button
            //   onClick={() => handleDeleteProduct(producto.id)}
            //   className="relative inline-flex items-center justify-center p-0.5 text-sm font-medium 
            //   text-white rounded-lg group bg-gradient-to-br from-red-500 via-red-300 to-yellow-200 
            //   group-hover:from-red-500 group-hover:via-red-300 group-hover:to-yellow-200 
            //   dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none 
            //   focus:ring-red-100 dark:focus:ring-red-400"
            // >
            //   <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-transparent 
            //   group-hover:bg-white group-hover:text-black rounded-md">
            //     Eliminar
            //   </span>
            // </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Modal de actualización de producto */}
//       {selectedProduct && (
//         <UpdateProductModal
//           producto={selectedProduct}
//           isOpen={isModalOpen}
//           onClose={() => setIsModalOpen(false)}
//           onSuccess={handleProductUpdate} // Recargar la lista después de editar
//         />
//       )}
//     </div>
//   );
// };

// export default ProductList;







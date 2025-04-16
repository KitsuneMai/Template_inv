// import React from "react";

// interface CartItem {
//   productoId: number;
//   nombre: string;
//   cantidad: number;
//   precio: number;
//   imagenUrl: string;
// }

// interface CartProps {
//   items: CartItem[];
//   onRemoveItem?: (productoId: number) => void;
//   onCheckout?: () => void;
// }

// const Cart: React.FC<CartProps> = ({ items, onRemoveItem, onCheckout }) => {
//   const total = items.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

//   return (
//     <div className="bg-white p-4 rounded shadow-lg w-full max-w-md">
//       <h2 className="text-xl font-semibold mb-4">🛒 Carrito</h2>

//       {items.length === 0 ? (
//         <p className="text-gray-500">El carrito está vacío.</p>
//       ) : (
//         <ul className="space-y-4">
//           {items.map((item) => (
//             <li key={item.productoId} className="flex items-center justify-between">
//               <div className="flex items-center gap-3">
//                 <img
//                   src={`http://localhost:3000/uploads/${item.imagenUrl}`}
//                   alt={item.nombre}
//                   className="w-16 h-16 object-cover rounded"
//                 />
//                 <div>
//                   <p className="font-medium">{item.nombre}</p>
//                   <p className="text-sm text-gray-600">Cantidad: {item.cantidad}</p>
//                   <p className="text-sm text-gray-600">${item.precio}</p>
//                 </div>
//               </div>
//               {onRemoveItem && (
//                 <button
//                   onClick={() => onRemoveItem(item.productoId)}
//                   className="text-red-500 hover:text-red-700"
//                 >
//                   ✖
//                 </button>
//               )}
//             </li>
//           ))}
//         </ul>
//       )}

//       {items.length > 0 && (
//         <div className="mt-4 border-t pt-4">
//           <p className="font-semibold text-right">Total: ${total}</p>
//           {onCheckout && (
//             <button
//               onClick={onCheckout}
//               className="w-full mt-2 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
//             >
//               Realizar Venta
//             </button>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Cart;




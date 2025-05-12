import { useEffect, useState } from "react";

type ProductoCarrito = {
  productoId: number;
  nombre: string;
  precio: number;
  cantidad: number;
  imagenUrl: string;
};

export default function Carrito() {
  const [productos, setProductos] = useState<ProductoCarrito[]>([]);
  const [carritoId, setCarritoId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCarrito();
  }, []);

  const fetchCarrito = async () => {
    try {
      const res = await fetch("/carrito?tiendaId=1", {
        credentials: "include",
      });
      const data = await res.json();
      setProductos(data.productos);
      setCarritoId(data.carritoId); // Guardamos el carritoId para futuras acciones
    } catch (error) {
      console.error("Error al obtener carrito", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCantidad = async (productoId: number, nuevaCantidad: number) => {
    if (!carritoId || nuevaCantidad < 1) return;

    try {
      await fetch("/carrito/agregar", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          carritoId,
          productoId,
          cantidad: nuevaCantidad,
        }),
      });

      setProductos((prev) =>
        prev.map((p) =>
          p.productoId === productoId ? { ...p, cantidad: nuevaCantidad } : p
        )
      );
    } catch (error) {
      console.error("Error al modificar cantidad", error);
    }
  };

  const handleEliminar = async (productoId: number) => {
    if (!carritoId) return;

    try {
      const producto = productos.find((p) => p.productoId === productoId);
      if (!producto) return;

      await fetch("http://localhost:3000/carrito?tiendaId=${id}", {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          carritoId,
          productoId,
          cantidad: producto.cantidad,
        }),
      });

      setProductos((prev) => prev.filter((p) => p.productoId !== productoId));
    } catch (error) {
      console.error("Error al eliminar producto", error);
    }
  };

  const total = productos.reduce((acc, p) => acc + p.precio * p.cantidad, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-500 to-orange-500 p-6 text-white mt-20">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-4">
          <h2 className="text-3xl font-bold mb-4">Tu carrito</h2>
          {loading ? (
            <p>Cargando...</p>
          ) : productos.length === 0 ? (
            <p>No tienes productos en el carrito.</p>
          ) : (
            productos.map((producto) => (
              <div key={producto.productoId} className="bg-white text-black rounded-lg p-4 flex items-center justify-between shadow">
                <div className="flex items-center gap-4">
                  <img src={producto.imagenUrl} alt={producto.nombre} className="w-20 h-20 object-cover rounded" />
                  <div>
                    <h3 className="text-lg font-semibold">{producto.nombre}</h3>
                    <p>${producto.precio.toFixed(2)} x {producto.cantidad}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => handleCantidad(producto.productoId, producto.cantidad - 1)} className="px-2 bg-gray-200 rounded">-</button>
                  <span>{producto.cantidad}</span>
                  <button onClick={() => handleCantidad(producto.productoId, producto.cantidad + 1)} className="px-2 bg-gray-200 rounded">+</button>
                  <button onClick={() => handleEliminar(producto.productoId)} className="ml-4 text-red-600 hover:text-red-800">Eliminar</button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="bg-white text-black p-6 rounded-lg shadow h-fit">
          <h3 className="text-xl font-semibold mb-4">Resumen</h3>
          <p className="text-lg">Total: <strong>${total.toFixed(2)}</strong></p>
          <button className="mt-6 w-full bg-pink-600 hover:bg-pink-700 text-white py-2 rounded shadow">
            Realizar compra
          </button>
        </div>
      </div>
    </div>
  );
}

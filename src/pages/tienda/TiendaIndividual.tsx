import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface Usuario {
  id: number;
  email: string;
  createdAt: string;
  roles: string[];
}

interface Tienda {
  id: number;
  nombre: string;
  descripcion: string | null;
  imagenPortada: string | null;
  imagenLogo: string | null;
  usuario: Usuario;
}

interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  cantidad: number;
  imagen: string;
  categoria: string;
}

export default function TiendaIndividual() {
  const { id } = useParams(); // <- Captura el ID de la URL
  const [tienda, setTienda] = useState<Tienda | null>(null);
  const [productos, setProductos] = useState<Producto[]>([]);

  useEffect(() => {
    const fetchTiendaYProductos = async () => {
      try {
        const tiendaRes = await fetch(`http://localhost:3000/tiendas/${id}`);
        const tiendaData: Tienda = await tiendaRes.json();
        setTienda(tiendaData);

        const productosRes = await fetch(
          `http://localhost:3000/productos/tienda/${tiendaData.id}`
        );
        const productosData: Producto[] = await productosRes.json();
        setProductos(productosData);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    if (id) fetchTiendaYProductos();
  }, [id]);

  if (!tienda) return <p className="p-4">Cargando tienda...</p>;

  return (
    <div className="relative w-full">
      {/* Imagen de portada */}
      <div className="w-full aspect-[16/5] overflow-hidden">
        <img
          src={`http://localhost:3000/uploads/${tienda.imagenPortada}?t=${Date.now()}`}
          alt="Portada de tienda"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Logo */}
      <div className="absolute top-10 left-8 sm:top-24 sm:left-20 bg-white p-1 rounded-full shadow-lg">
        <img
          src={`http://localhost:3000/uploads/${tienda.imagenLogo}?t=${Date.now()}`}
          alt="Logo de la tienda"
          className="w-20 h-20 sm:w-32 sm:h-32 object-cover rounded-full border-4 border-white"
        />
      </div>

      {/* Info de tienda */}
      <div className="p-6 mt-4">
        <h1 className="text-3xl font-bold text-gray-800">{tienda.nombre}</h1>
        <p className="text-gray-600 mt-2">{tienda.descripcion}</p>
      </div>

      {/* Productos */}
      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {productos.map((producto) => (
          <div
            key={producto.id}
            className="border rounded-lg shadow p-4 bg-white"
          >
            <img
              src={`http://localhost:3000/uploads/${producto.imagen}`}
              alt={producto.nombre}
              className="w-full h-40 object-cover rounded"
            />
            <h3 className="text-xl font-semibold mt-2">{producto.nombre}</h3>
            <p className="text-gray-600">{producto.descripcion}</p>
            <p className="text-orange-600 font-bold mt-2">
              ${producto.precio}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

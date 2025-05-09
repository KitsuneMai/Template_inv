import { useState, useEffect } from 'react';

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

const StoreHeader = () => {
  const [tienda, setTienda] = useState<Tienda | null>(null);

  useEffect(() => {
    const fetchTienda = async () => {
      try {
        const res = await fetch('http://localhost:3000/carrito/tienda', {
          method: 'GET',
          credentials: 'include',
        });

        const data: Tienda = await res.json();
        setTienda(data);
      } catch (err) {
        console.error('Error al obtener la tienda:', err);
      }
    };

    fetchTienda();
  }, []);

  return (
    <div className="relative w-full">
      <div className="w-full aspect-[16/5] overflow-hidden">
        <img
          src={`http://localhost:3000/uploads/${tienda?.imagenPortada}?t=${Date.now()}`}
          alt="Portada de tienda"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute top-10 left-8 sm:top-24 sm:left-20 bg-white p-1 rounded-full shadow-lg">
        <img
          src={`http://localhost:3000/uploads/${tienda?.imagenLogo}?t=${Date.now()}`}
          alt="Logo de la tienda"
          className="w-20 h-20 sm:w-32 sm:h-32 object-cover rounded-full border-4 border-white"
        />
      </div>
    </div>
  );
};

export default StoreHeader;












  
  
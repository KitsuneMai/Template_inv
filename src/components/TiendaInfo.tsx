//TiendaInfo.tsx 


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

const StoreHeader = ({children}: {children?: React.ReactNode}) => {
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
      <div className="mt-10 px-6 sm:px-20">
        <h1 className="text-2xl sm:text-3xl font-bold">{tienda?.nombre}</h1>
        <p className="text-white mt-10">{tienda?.descripcion}</p>
        {children}
      </div>
    </div>
  );
};

export default StoreHeader;

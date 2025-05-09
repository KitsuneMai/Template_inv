import { useEffect, useState } from "react";
import CarruselTiendas from "../../components/CarruselTiendas";
import TiendaCard from "../../components/TiendaCard";
import { Link } from "react-router-dom";
import { LayoutGrid, List } from "lucide-react";


interface Tienda {
  id: number;
  nombre: string;
  descripcion: string | null;
  imagenLogo: string | null;
}

export default function TodasLasTiendas() {
  const [tiendas, setTiendas] = useState<Tienda[]>([]);
  const [vista, setVista] = useState<'tarjetas' | 'alfabetica'>('tarjetas'); // Controla la vista actual
  const [filtroLetra, setFiltroLetra] = useState<string>(''); // Filtro por letra

  useEffect(() => {
    fetch("http://localhost:3000/tiendas")
      .then((res) => res.json())
      .then((data) => setTiendas(data))
      .catch((err) => console.error("Error cargando tiendas", err));
  }, []);

  // Ordenar siempre las tiendas alfabéticamente para la vista de tarjetas
  const tiendasOrdenadas = tiendas.sort((a, b) => a.nombre.localeCompare(b.nombre));

  // Filtrar tiendas por letra para la vista alfabética
  const tiendasFiltradas = filtroLetra
    ? tiendas.filter((tienda) => tienda.nombre.toUpperCase().startsWith(filtroLetra))
    : tiendas;

  // Organizar las tiendas por letra para la vista alfabética
  const tiendasPorLetra = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((letra) => ({
    letra,
    tiendas: tiendasFiltradas.filter((tienda) => tienda.nombre.toUpperCase().startsWith(letra))
  }));

  return (
    <div className="p-32">
      <div className="relative z-20">
        <CarruselTiendas tiendas={tiendas} />
      </div>

      <div className="relative z-10">
        <CarruselTiendas tiendas={tiendas} reverse />
      </div>

      <h1 className="text-2xl font-bold my-20">Almacenes</h1>

      {/* Botones para cambiar entre vistas */}
      <div className="flex gap-4 mb-8 ml-[1605px]">
        <button
          onClick={() => setVista("tarjetas")}
          className={`p-2 rounded ${vista === "tarjetas" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"}`}
        >
          <LayoutGrid className="w-6 h-6" />
        </button>
        <button
          onClick={() => setVista("alfabetica")}
          className={`p-2 rounded ${vista === "alfabetica" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"}`}
        >
          <List className="w-6 h-6" />
        </button>
      </div>


      {/* Filtro por letra (solo para vista alfabética) */}
      {vista === 'alfabetica' && (
        <div className="flex gap-4 mb-10 ml-24">
          {["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"].map((letra) => (
            <button
              key={letra}
              onClick={() => setFiltroLetra(letra)}
              className="p-2 border rounded hover:bg-gray-200"
            >
              {letra}
            </button>
          ))}
          <button
            onClick={() => setFiltroLetra('')}
            className="p-2 border rounded hover:bg-gray-200"
          >
            Todos
          </button>
        </div>
      )}

      {/* Mostrar tiendas según la vista seleccionada */}
      <div className="max-w-screen-2xl mx-auto px-4">
        {vista === 'tarjetas' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-7">
            {tiendasOrdenadas.map((tienda) => (
              <TiendaCard
                key={tienda.id}
                id={tienda.id}
                nombre={tienda.nombre}
                imagenLogo={tienda.imagenLogo}
              />
            ))}
          </div>
        ) : (
          <div>
            {tiendasPorLetra.map(({ letra, tiendas }) => (
              tiendas.length > 0 && (
                <div key={letra} className="mb-8">
                  <h2 className="text-2xl font-bold mb-2">{letra}</h2>
                  <ul>
                    {tiendas.map((tienda) => (
                      <li key={tienda.id} className="p-2 border-b">
                        <Link
                          to={`/tienda/${tienda.id}`}
                          className="text-blue-600 hover:underline font-semibold"
                        >
                          {tienda.nombre}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )
            ))}
          </div>
        )}
      </div>

    </div>
  );
}





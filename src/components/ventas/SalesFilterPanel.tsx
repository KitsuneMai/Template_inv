import React, { useState, useEffect } from "react";
import SalesDashboard from "../ventas/SalesDashboard";

interface ProductoVenta {
  id: number;
  cantidad: number;
  precioUnitario: string;
  producto: {
    id: number;
    nombre: string;
    descripcion: string;
    precio: string;
    cantidad: number;
    imagenUrl: string;
  };
}

interface Venta {
  id: number;
  productosVenta: ProductoVenta[];
  total: string;
  fechaVenta: string;
}

interface SalesFilterPanelProps {
  onFilterChange: (filter: string, searchQuery?: string) => void;
}

const SalesFilterPanel: React.FC<SalesFilterPanelProps> = ({ onFilterChange }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [ventas, setVentas] = useState<Venta[]>([]);
  const [filtroActivo, setFiltroActivo] = useState<string>("");

  const handleFilterClick = (filter: string) => {
    setFiltroActivo(filter);
    onFilterChange(filter);
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    onFilterChange("buscar", value);
  };

  useEffect(() => {
    const fetchVentasUsuario = async () => {
      try {
        const response = await fetch("http://localhost:3000/ventas/usuario", {
          method: "GET",
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error(`Error al obtener ventas: ${response.status}`);
        }

        const ventas = await response.json();
        setVentas(ventas);
        // No activamos ningún filtro aún
      } catch (error) {
        console.error("Error al obtener las ventas del usuario:", error);
      }
    };

    fetchVentasUsuario();
  }, []);

  return (
    <div className="flex flex-col items-center mt-4">
      {/* Visual importado */}
      <SalesDashboard
        searchQuery={searchQuery}
        onFilterClick={handleFilterClick}
        onSearchChange={handleSearchChange}
      />

      {/* Render de las ventas solo si el filtro activo es "todas" */}
      {filtroActivo === "todas" && (
        <div className="w-full max-w-3xl space-y-4 mt-4">
          {ventas.length === 0 ? (
            <p className="text-gray-600">No hay ventas registradas.</p>
          ) : (
            ventas.map((venta) => (
              <div key={venta.id} className="border p-4 rounded-xl shadow">
                <p className="font-semibold">Venta #{venta.id}</p>
                <p className="text-sm text-gray-500">
                  Fecha: {new Date(venta.fechaVenta).toLocaleString()}
                </p>
                <p>Total: ${venta.total}</p>
                <div className="mt-2 space-y-1">
                  {venta.productosVenta.map((pv) => (
                    <div key={pv.id} className="text-sm border-t pt-1">
                      <strong>{pv.producto.nombre}</strong> x{pv.cantidad} — ${pv.precioUnitario}
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default SalesFilterPanel;






import { useState, useEffect } from 'react';
import ImageUploadPreview from '../../components/ImageUploadPreview';
import CustomButton from '../../components/CustomButton';

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
  imagenPortada?: string | null;
  imagenLogo?: string | null;
  usuario: Usuario;
}

const TiendaSettings = () => {
  const [tienda, setTienda] = useState<Tienda | null>(null);
  const [imagenPortada, setImagenPortada] = useState<File | null>(null);
  const [imagenLogo, setImagenLogo] = useState<File | null>(null);
  const [updating, setUpdating] = useState(false);
  const [timestamp, setTimestamp] = useState(Date.now());
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");

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

  useEffect(() => {
    if (tienda) {
      setNombre(tienda.nombre || "");
      setDescripcion(tienda.descripcion || "");
    }
  }, [tienda]);

  const handlePortadaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setImagenPortada(file);
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setImagenLogo(file);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!tienda?.id) return;
  
    setUpdating(true);
    const formData = new FormData();
  
    // Solo se agrega el archivo de portada si ha cambiado
    if (imagenPortada) {
      formData.append('imagenPortada', imagenPortada);
    }
  
    // Solo se agrega el archivo de logo si ha cambiado
    if (imagenLogo) {
      formData.append('imagenLogo', imagenLogo);
    }
  
    // Solo se actualiza el nombre si ha cambiado
    if (nombre && nombre !== tienda.nombre) {
      formData.append('nombre', nombre);
    }
  
    // Solo se actualiza la descripción si ha cambiado
    if (descripcion && descripcion !== tienda.descripcion) {
      formData.append('descripcion', descripcion);
    }
  
    try {
      const res = await fetch(`http://localhost:3000/tiendas/${tienda.id}`, {
        method: 'PUT',
        credentials: 'include',
        body: formData,
      });
  
      if (res.ok) {
        const updated: Tienda = await res.json();
        setTienda(updated);
        setTimestamp(Date.now());
      } else {
        console.error('Error al actualizar la tienda');
      }
    } catch (err) {
      console.error('Error:', err);
    }
  
    setUpdating(false);
  };

  return (
    <div className="p-20 md:w-[100%] mx-auto bg-rose-100 mb-20">
      <h2 className="text-2xl font-semibold mb-10">Gestiona tu Tienda</h2>

      <form onSubmit={handleSubmit}>
      <div className="mb-10 flex flex-wrap gap-4 justify-start">
        {/* Portada como un banner ancho */}
        <ImageUploadPreview
          file={imagenPortada}
          existingUrl={tienda?.imagenPortada || null}
          shape="rect"
          label="Imagen de Portada"
          onChange={handlePortadaChange}
          disabled={updating}
          // wrapper: ocupa la mitad aprox.
          className="w-full md:w-[60%]"
          // aquí defines la forma: ancho 100%, relación 4:1
          containerClassName="w-full aspect-[4/1] h-[220px]"
        />

        {/* Logo circular más pequeño */}
        <ImageUploadPreview
          file={imagenLogo}
          existingUrl={tienda?.imagenLogo || null}
          shape="circle"
          label="Logo de la Tienda"
          onChange={handleLogoChange}
          disabled={updating}
          className="w-full md:w-[35%] h-[220px]"
          containerClassName="w-56 h-56"
        />
      </div>
        <div className="mb-4 flex-col items-center transform translate-x-[20%]">
          <label className="block mb-1">Nombre de la tienda</label>
          <input
           type="text"
           value={nombre}
           placeholder={tienda?.nombre || ""}
           onChange={(e) => setNombre(e.target.value)}
           disabled={updating}
           className="w-[60%] px-3 py-2 border border-gray-300 rounded"/>
        </div>
        <div className="mb-4 flex-col items-center transform translate-x-[20%]">
          <label className="block mb-1">Descripción</label>
          <textarea
            value={descripcion}
            placeholder={tienda?.descripcion || ""}
            onChange={(e) => setDescripcion(e.target.value)}
            disabled={updating}
            rows={4}
            className="w-[60%] px-3 py-2 border border-gray-300 rounded resize-none"
          />
        </div>
        <CustomButton
          type="submit"
          label={updating ? "Actualizando..." : "Actualizar Tienda"}
          size="md"
          className={`mt-8 transform translate-x-[160%] ${updating ? "opacity-50 cursor-not-allowed" : ""}`}
        />
      </form>
    </div>
  );
};

export default TiendaSettings;

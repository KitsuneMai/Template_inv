import React, { useState, useEffect } from "react";

interface TiendaConfigProps {
  portada: string;
  logo: string;
  tiendaId: number;
}

const TiendaConfig: React.FC<TiendaConfigProps> = ({ portada, logo, tiendaId }) => {
  const [newPortada, setNewPortada] = useState<File | null>(null);
  const [newLogo, setNewLogo] = useState<File | null>(null);
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'portada' | 'logo') => {
    const file = e.target.files?.[0];
    if (file) {
      if (type === 'portada') setNewPortada(file);
      else setNewLogo(file);
    }
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    if (newPortada) formData.append("portada", newPortada);
    if (newLogo) formData.append("logo", newLogo);

    try {
      const response = await fetch(`http://localhost:3000/tiendas/${tiendaId}/actualizar-imagenes`, {
        method: "POST",
        body: formData,
        credentials: "include", // Para enviar la sesión con JWT
      });
      
      if (response.ok) {
        // Actualizar el estado o hacer algo con la respuesta
        alert("Imágenes actualizadas correctamente.");
      } else {
        alert("Error al actualizar las imágenes.");
      }
    } catch (error) {
      console.error("Error al subir las imágenes", error);
    }
  };

  return (
    <div className="mt-6 p-6 bg-gray-100 rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Configura tu tienda</h2>
      <div className="mb-4">
        <label className="block text-gray-700">Imagen de portada:</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleImageChange(e, 'portada')}
          className="mt-2 p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Logo:</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleImageChange(e, 'logo')}
          className="mt-2 p-2 border border-gray-300 rounded"
        />
      </div>
      <button onClick={handleSubmit} className="bg-blue-500 text-white py-2 px-4 rounded">
        Actualizar imágenes
      </button>
    </div>
  );
};

export default TiendaConfig;

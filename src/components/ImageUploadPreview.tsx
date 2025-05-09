import React, { useRef } from 'react';
import CustomButton from './CustomButton'; // Importa tu CustomButton si lo tienes en otro archivo

interface ImageUploadPreviewProps {
  file: File | null;
  existingUrl?: string | null;
  shape?: 'rect' | 'circle';
  label: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  className?: string;              // Para el wrapper
  containerClassName?: string;     // Para el div que muestra la imagen
}

const ImageUploadPreview: React.FC<ImageUploadPreviewProps> = ({
  file,
  existingUrl,
  shape = 'rect',
  label,
  onChange,
  disabled = false,
  className = '',
  containerClassName = ''
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);  // Referencia al input de archivo

  const previewUrl = file
    ? URL.createObjectURL(file)
    : existingUrl
    ? existingUrl.startsWith('http')
      ? existingUrl
      : `http://localhost:3000/uploads/${existingUrl}`
    : null;

  // Función para disparar el click del input de archivo cuando el botón sea presionado
  const handleFileSelect = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();  // Dispara el click del input de archivo
    }
  };

  return (
    <div className={`mb-6 ${className}`}>
      <label className="block mb-20 font-medium">{label}</label>
      <div className="flex flex-col items-center gap-14">
        {/* Si tenemos un preview de la imagen, mostramos el contenedor */}
        {previewUrl && (
          <div
            className={`overflow-hidden flex items-center justify-center
              ${shape === 'circle' ? 'rounded-full' : 'rounded-lg'}
              border border-gray-300 bg-gray-100
              ${containerClassName}`}
          >
            <img
              src={previewUrl}
              alt="Preview"
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Usamos el CustomButton para seleccionar archivo */}
        <CustomButton
          label="Seleccionar archivo"
          onClick={handleFileSelect}  // Disparamos el click en el input de archivo
          size="md"
          className="mt-4"
        />

        {/* El input de archivo está oculto */}
        <input
          ref={fileInputRef}
          type="file"
          onChange={onChange}
          disabled={disabled}
          className="hidden"  // Ocultamos el input
        />
      </div>
    </div>
  );
};

export default ImageUploadPreview;





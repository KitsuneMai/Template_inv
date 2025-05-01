interface TiendaDinamicaProps {
    portada: string;
    logo: string;
  }
  
  export default function TiendaDinamica({ portada, logo }: TiendaDinamicaProps) {
    return (
      <div className="relative w-full">
        {/* Imagen de portada responsiva */}
        <div className="w-full aspect-[16/5] overflow-hidden">
          <img
            src={portada}
            alt="Portada de tienda"
            className="w-full h-full object-cover"
          />
        </div>
  
        {/* Logo superpuesto, también responsivo */}
        <div className="absolute top-6 left-4 sm:top-10 sm:left-6 bg-white p-1 rounded-full shadow-lg">
          <img
            src={logo}
            alt="Logo de la tienda"
            className="w-20 h-20 sm:w-32 sm:h-32 object-cover rounded-full border-4 border-white"
          />
        </div>
  
        {/* Contenido de tienda */}
        <div className="p-6 mt-4">
          <h1 className="text-3xl font-bold text-gray-800">Nombre de la Tienda</h1>
          <p className="text-gray-600 mt-2">
            Aquí se puede mostrar información de la tienda, productos, etc.
          </p>
        </div>
      </div>
    );
  }
  
import CustomButton from "./CustomButton";

interface CompactCardProps {
  image: string;
  title: string;
  description: string;
  href?: string;
}

export default function CompactCard({ image, title, description }: CompactCardProps) {
  return (
    <div className="relative group w-full">
      {/* Fondo desplazado detrás */}
      <div className="absolute -top-3 right-3 w-[100%] h-[50%] rounded-lg bg-gray-200 group-hover:bg-secondary-hover transition-all duration-300 group-hover:translate-x-[9%] translate-x-0 z-0" />

      {/* Tarjeta principal con zoom al hacer hover */}
      <div className="relative flex flex-col border border-gray-200 rounded-lg shadow-sm bg-white z-10 transition-all duration-300 transform group-hover:scale-[1.02] group-hover:shadow-md overflow-hidden">
        {/* Imagen */}
        <div className="w-full aspect-[4/3] overflow-hidden rounded-t-lg">
          <img
            className="w-full h-full object-cover"
            src={image}
            alt={title}
          />
        </div>

        {/* Contenido */}
        <div className="p-4 flex flex-col justify-between flex-grow min-h-[220px]">
          <div>
            <h5 className="mb-2 text-xl font-bold tracking-tight text-highlight group-hover:text-gray-800 transition-colors duration-300">
              {title}
            </h5>
            <p className="mb-3 font-normal text-gray-700 group-hover:text-gray-800 transition-colors duration-300">
              {description}
            </p>
          </div>

          {/* Botón visual */}
          <div className="mt-auto self-start">
            <CustomButton label="Ver más" size="sm" />
          </div>
        </div>
      </div>
    </div>
  );
}

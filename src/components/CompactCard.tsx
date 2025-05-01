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
      <div className="absolute -top-3 right-3 w-full h-full rounded-lg bg-light-pink group-hover:bg-secondary-hover transition-all duration-300 group-hover:translate-x-2 translate-x-0 z-0" />

      {/* Tarjeta */}
      <div className="relative flex flex-col border border-gray-200 rounded-lg shadow-sm bg-white dark:bg-white dark:border-gray-700 z-10 transition-all duration-300 group-hover:shadow-md overflow-hidden">
        {/* Imagen contenida correctamente */}
        <div className="w-full aspect-[4/3] overflow-hidden rounded-t-lg">
          <img
            className="w-full h-full object-cover"
            src={image}
            alt={title}
          />
        </div>

        {/* Contenido */}
        <div className="p-4 flex flex-col justify-between flex-grow">
          <div>
            <h5 className="mb-2 text-xl font-bold tracking-tight text-highlight dark:text-highkight">
              {title}
            </h5>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{description}</p>
          </div>

          {/* Botón solo visual */}
          <div className="mt-auto self-start">
            <CustomButton label="Ver más" size="sm" />
          </div>
        </div>
      </div>
    </div>
  );
}

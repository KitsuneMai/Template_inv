export default function CollageSection() {
    return (
      <div className="grid grid-cols-[2.8fr_1.8fr_1.7fr] gap-0 h-[400px] w-full mt-8">
        {/* Sección 1 con efecto de zoom general + texto animado */}
        <div className="bg-white flex flex-col items-center justify-center text-center text-xl font-semibold transition-transform duration-300 hover:scale-[1.02] group">
          <h2 className="text-highlight text-2xl mb-1 transition-transform duration-300 group-hover:scale-105">
            Todo lo que necesitas en
          </h2>
          <h1 className="text-[#dd5191] text-3xl font-bold transition-transform duration-300 group-hover:scale-110">
            MI Centro Comercial
          </h1>
        </div>
  
        {/* Sección 2 */}
        <div className="bg-[#dd5192] flex items-center justify-center text-white text-xl font-semibold">
          Sección 2
        </div>
  
        {/* Sección 3 (dividida en 2) */}
        <div className="grid grid-rows-2 gap-0 h-full">
          <div className="bg-[#fa6230] flex items-center justify-center text-white text-xl font-semibold h-full">
            Sección 3a
          </div>
          <div className="bg-[#fa2523] flex items-center justify-center text-white text-xl font-semibold h-full">
            Sección 3b
          </div>
        </div>
      </div>
    );
  }
  
  
  
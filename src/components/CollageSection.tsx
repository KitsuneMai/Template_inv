export default function CollageSection() {
  return (
    <div className="grid grid-cols-[2.8fr_1.8fr_1.9fr] gap-0 h-[600px] w-full mt-0">
      {/* Sección 1 */}
      <div className="group bg-white flex flex-col items-center justify-center text-center text-xl font-semibold transition-transform duration-300 hover:scale-[1.02] h-full">
        <h2 className="text-highlight text-2xl mb-1 transition-transform duration-300 group-hover:scale-105">
          Todo lo que necesitas en
        </h2>
        <h1 className="text-[#dd5191] text-3xl font-bold transition-transform duration-300 group-hover:scale-110">
          MI Centro Comercial
        </h1>
      </div>

      {/* Sección 2 */}
      <div className="group bg-[#dd5192] flex items-center justify-center text-white text-xl font-semibold transition-transform duration-300 hover:scale-[1.02] h-full">
        <span className="transition-transform duration-300 group-hover:scale-105">Sección 2</span>
      </div>

      {/* Sección 3 dividida */}
      <div className="grid grid-rows-2 gap-0 h-full">
        <div className="group bg-[#fa6230] flex items-center justify-center text-white text-xl font-semibold transition-transform duration-300 hover:scale-[1.02] h-full">
          <span className="transition-transform duration-300 group-hover:scale-105">Sección 3a</span>
        </div>
        <div className="group bg-[#fa2523] flex items-center justify-center text-white text-xl font-semibold transition-transform duration-300 hover:scale-[1.02] h-full">
          <span className="transition-transform duration-300 group-hover:scale-105">Sección 3b</span>
        </div>
      </div>
    </div>
  );
}


  
  
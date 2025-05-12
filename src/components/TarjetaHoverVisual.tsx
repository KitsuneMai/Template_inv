const TarjetaHoverVisual = ({ imagen }: { imagen: string }) => (
    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 ease-in-out z-50 pointer-events-none">
      <img
        src={`http://localhost:3000/uploads/${imagen}`}
        alt="Vista previa tienda"
        className="w-72 h-96 object-cover rounded-none shadow-xl"
      />
    </div>
  );


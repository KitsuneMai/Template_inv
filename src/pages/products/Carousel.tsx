import { useState } from "react";

interface CarouselProps {
  onImageClick: (index: number) => void;
}

const images = [
  "/images/carousel-1.jpg",
  "/images/carousel-2.jpg",
  "/images/carousel-3.jpg",
  "/images/carousel-4.jpg",
  "/images/carousel-5.jpg",
];

const Carousel: React.FC<CarouselProps> = ({ onImageClick }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className="relative w-full max-w-7xl mx-auto" id="default-carousel">
      {/* Carrusel con mayor altura */}
      <div className="relative h-[350px] md:h-[350px] overflow-hidden rounded-lg">
        {images.map((src, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out cursor-pointer ${
              index === currentIndex ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
            onClick={index === currentIndex ? () => onImageClick(currentIndex) : undefined}
          >
            <img
              src={src}
              className="w-full h-full object-cover"
              alt={`Slide ${index + 1}`}
            />
          </div>
        ))}

        {/* Fondo degradado más extendido */}
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-b from-transparent via-white/60 to-white z-10 pointer-events-none" />
      </div>

      {/* Botón anterior */}
      <button
        onClick={handlePrev}
        className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        aria-label="Previous"
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50">
          <svg
            className="w-4 h-4 text-white"
            fill="none"
            viewBox="0 0 6 10"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5 1 1 5l4 4"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>

      {/* Botón siguiente */}
      <button
        onClick={handleNext}
        className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        aria-label="Next"
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50">
          <svg
            className="w-4 h-4 text-white"
            fill="none"
            viewBox="0 0 6 10"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="m1 9 4-4-4-4"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>
    </div>
  );
};

export default Carousel;










import React, { useEffect, useState } from "react";
import FancyCard from "./FancyCard";
import { AnimatePresence, motion } from "framer-motion";

interface FancyCardProps {
  image: string;
  title: string;
  description: string;
  href?: string;
}

interface FancyCardCarouselProps {
  cards: FancyCardProps[];
  interval?: number;
  indicatorsClassName?: string;
}

const FancyCardCarousel: React.FC<FancyCardCarouselProps> = ({
  cards,
  interval = 4000,
  indicatorsClassName = "mt-4",
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % cards.length);
    }, interval);
    return () => clearInterval(timer);
  }, [cards.length, interval]);

  const variants = {
    enter: {
      opacity: 0,
      scale: 0.8,
      filter: "blur(14px)",
    },
    center: {
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: 0.6,
        ease: "easeInOut",
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      filter: "blur(14px)",
      transition: {
        duration: 0.6,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className="flex flex-col items-center w-full relative">
      <div className="w-full flex justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            className="w-full"
          >
            <FancyCard {...cards[currentIndex]} />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Indicadores debajo */}
      <div
        className={`absolute left-0 right-0 ${indicatorsClassName} flex justify-center gap-2 z-20`}
      >
        {cards.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full border-2 ${
              index === currentIndex
                ? "bg-highlight border-highlight scale-110"
                : "bg-gray-300 border-gray-400"
            } transition-all duration-300`}
          />
        ))}
      </div>
    </div>
  );
};

export default FancyCardCarousel;



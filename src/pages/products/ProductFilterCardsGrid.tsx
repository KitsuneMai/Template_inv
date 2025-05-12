import React from "react";
import CompactCard from "../../components/CompactCard"; // ajusta la ruta si está en otro folder

interface FilterCardData {
  image: string;
  title: string;
  description: string;
  filterValue: string;
}

interface ProductFilterCardsGridProps {
  cards: FilterCardData[];
  onFilterChange: (filter: string) => void;
}

const ProductFilterCardsGrid: React.FC<ProductFilterCardsGridProps> = ({ cards, onFilterChange }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto mt-4">
      {cards.map((card) => (
        <div key={card.filterValue} onClick={() => onFilterChange(card.filterValue)} className="cursor-pointer">
          <CompactCard
            image={card.image}
            title={card.title}
            description={card.description}
          />
        </div>
      ))}
    </div>
  );
};

export default ProductFilterCardsGrid;

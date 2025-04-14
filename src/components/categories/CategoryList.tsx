// components/categories/CategoryList.tsx
import React, { useEffect, useState } from "react";
import CategoryCard from "./CategoryCard";

interface Categoria {
  id: number;
  nombre: string;
}

const iconosPorNombre: Record<string, string> = {
  Accesorios: "👜",
  Comida: "🍔",
  Ropa: "👗",
  Tecnologia: "💻",
};

const CategoryList: React.FC = () => {
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  useEffect(() => {
    fetch("http://localhost:3000/categorias")
      .then((res) => res.json())
      .then((data) => setCategorias(data))
      .catch((err) => console.error("Error cargando categorías:", err));
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {categorias.map((cat) => (
        <CategoryCard
          key={cat.id}
          id={cat.id}
          nombre={cat.nombre}
          icono={iconosPorNombre[cat.nombre] || "📦"} // ícono por defecto
        />
      ))}
    </div>
  );
};

export default CategoryList;


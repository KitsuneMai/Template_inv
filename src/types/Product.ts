// src/types/Product.ts

export interface Product {
    id: number;
    nombre: string;
    descripcion: string;
    precio: number;
    cantidad: number;
    imagenUrl: string;
    categoria_id: number;
    categoria: {
      id: number;
      nombre: string;
    };
  }
  
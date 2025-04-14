import { Product } from "../types/Product";

export const parseProduct = (data: any): Product => ({
  ...data,
  precio: parseFloat(data.precio),
  cantidad: parseInt(data.cantidad),
  categoria_id: Number(data.categoria_id),
});

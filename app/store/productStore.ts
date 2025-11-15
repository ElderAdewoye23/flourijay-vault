
import { create } from "zustand";
import { products as initialProducts } from "../data/products";

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
}

interface ProductStore {
  products: Product[];
  addProduct: (product: Product) => void;
  editProduct: (updated: Product) => void;
  deleteProduct: (id: number) => void;
}

export const useProductStore = create<ProductStore>((set) => ({
  products: initialProducts,

  addProduct: (product) =>
    set((state) => ({
      products: [...state.products, { ...product, id: Date.now() }],
    })),

  editProduct: (updated) =>
    set((state) => ({
      products: state.products.map((p) =>
        p.id === updated.id ? updated : p
      ),
    })),

  deleteProduct: (id) =>
    set((state) => ({
      products: state.products.filter((p) => p.id !== id),
    })),
}));

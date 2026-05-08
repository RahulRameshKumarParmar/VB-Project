import axios from "axios";
import { create } from "zustand";

export interface Product {
  id: number;
  thumbnail: string;
  tags: {
    0: string;
    1: string;
  };
  title: string;
  brand: string;
  rating: number;
  stock: number;
  price: number;
  discountPercentage: number;
  description: string;
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  returnPolicy: string;
  weight: number;
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
}

interface ProductState {
  allProducts: Product[];
  page: number;
  setPage: (page: number) => void;
  getProducts: () => void;
  getCategoryList: () => void;
  getByCategory: (categoryName: string) => void;
  allCategories: string[];
}

export const useProductStore = create<ProductState>((set, get) => ({
  allProducts: [],
  page: 1,
  setPage: (page) => set({ page }),
  allCategories: [],

  getProducts: async () => {
    let currentPage = get().page;
    try {
      //   page 1 should start at skip=0, so use (page - 1) * limit.
      const data = await axios.get(
        `https://dummyjson.com/products?limit=10&skip=${(currentPage - 1) * 10}`,
      );
      set({
        allProducts: data.data.products,
      });
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  },

  getCategoryList: async () => {
    try {
      const data = await axios.get(
        `https://dummyjson.com/products/category-list`,
      );
      set({
        allCategories: data.data
      })
    } catch (error) {
      console.error("Login error:", error);
    }
  },

  getByCategory: async (categoryName) => {
    try {
      const data = await axios.get(
        `https://dummyjson.com/products/category/${categoryName}`,
      );
      set({
        allProducts: data.data.products,
      });
    } catch (error) {
      console.error("Login error:", error);
    }
  },
}));

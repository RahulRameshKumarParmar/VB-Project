import axios from "axios";
import { create } from "zustand";

export interface User {
  id: number;
  image: string;
  firstName: string;
  lastName: string;
  gender: string;
  age: string;
  role: string;
  bloodGroup: string;
  height: number;
  weight: number;
  email: string;
  phone: string;
  birthDate: string;
  eyeColor: string;
  address: {
    address: string;
    city: string;
    state: string;
    stateCode: string;
    postalCode: string;
  };
  company: {
    department: string;
    name: string;
    title: string;
  };
  university: string;
}

// Define the shape of your state
interface UserState {
  allUser: User[];
  getUsers: () => void;
  page: number;
  setPage: (page: number) => void;
}

// Create the store
export const useUserStore = create<UserState>((set, get) => ({
  allUser: [],
  page: 1,
  setPage: (page) => set({ page }),

  getUsers: async () => {
    let currentPage = get().page;
    try {
      // Change: page 1 should start at skip=0, so use (page - 1) * limit.
      const data = await axios.get(
        `https://dummyjson.com/users?limit=10&skip=${(currentPage - 1) * 10}`,
      );
      set({
        allUser: data.data.users,
      });
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  },
}));

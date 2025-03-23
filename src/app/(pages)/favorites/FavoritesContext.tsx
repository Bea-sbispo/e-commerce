"use client";

import { useAuth } from "@/helpers/use-auth";
import { Product } from "@/types/globals";
import { useRouter } from "next/navigation";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface FavoritesContextType {
  favorites: Product[];
  addToFavorites: (product: Product) => void;
  removeFromFavorites: (id: number) => void;
  isFavorite: (id: number) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined,
);

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const { user, setUser } = useAuth();
  const [favorites, setFavorites] = useState<Product[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (user && user.userFavorites) {
      setFavorites(user.userFavorites);
    }
  }, [user]);

  const updateUserFavorites = (updatedFavorites: Product[]) => {
    if (!user) return;
    const updatedUser = { ...user, userFavorites: updatedFavorites };
    setUser(updatedUser);
    sessionStorage.setItem("currentUser", JSON.stringify(updatedUser));
  };

  const addToFavorites = (product: Product) => {
    if (!user) return router.push("/auth");

    if (!favorites.some((item) => item.id === product.id)) {
      const newFavorites = [...favorites, product];
      setFavorites(newFavorites);
      updateUserFavorites(newFavorites);
    }
  };

  const removeFromFavorites = (id: number) => {
    const newFavorites = favorites.filter((item) => item.id !== id);
    setFavorites(newFavorites);
    updateUserFavorites(newFavorites);
  };

  const isFavorite = (id: number) => {
    return favorites.some((item) => item.id === id);
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, addToFavorites, removeFromFavorites, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
};

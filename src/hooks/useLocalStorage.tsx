import { useState, useEffect } from "react";

export interface FavoriteCatFact {
  id: string;
  text: string;
}

type UseLocalStorageReturnType = {
  favorites: FavoriteCatFact[];
  saveFavorite: (fact: FavoriteCatFact) => void;
};

const useLocalStorage = (): UseLocalStorageReturnType => {
  const [favorites, setFavorites] = useState<FavoriteCatFact[]>(() => {
    const storedFavorites = localStorage.getItem("favorites");
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  });

  const saveFavorite = (fact: FavoriteCatFact) => {
    if (!favorites.some((favorite) => favorite.id === fact.id)) {
      setFavorites((prevFavorites) => [...prevFavorites, fact]);
    }
  };

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  return { favorites, saveFavorite };
};

export default useLocalStorage;

import { act, renderHook } from "@testing-library/react";
import useLocalStorage, { FavoriteCatFact } from "./useLocalStorage";

interface LocalStorage {
  getItem: (key: string) => string | null;
  setItem: (key: string, value: string) => void;
  clear: () => void;
}

const localStorageMock = (function (): LocalStorage {
  let store: Record<string, string> = {};

  return {
    getItem: function (key: string) {
      return store[key] || null;
    },
    setItem: function (key: string, value: string) {
      store[key] = value.toString();
    },
    clear: function () {
      store = {};
    },
  };
})();

describe("useLocalStorage hook", () => {
  beforeEach(() => {
    Object.defineProperty(window, "localStorage", {
      value: localStorageMock,
    });
  });

  afterEach(() => {
    window.localStorage.clear();
  });

  test("loads initial data from localStorage", () => {
    const initialFavorites: FavoriteCatFact[] = [
      { id: "123", text: "Test Fact 1" },
      { id: "456", text: "Test Fact 2" },
    ];

    localStorage.setItem("favorites", JSON.stringify(initialFavorites));

    const { result } = renderHook(() => useLocalStorage());

    expect(result.current.favorites).toEqual(initialFavorites);
  });

  test("saves a new favorite to localStorage", () => {
    const newFavorite: FavoriteCatFact = { id: "789", text: "New Fact" };

    const { result } = renderHook(() => useLocalStorage());

    act(() => {
      result.current.saveFavorite(newFavorite);
    });

    const savedFavorites = JSON.parse(localStorage.getItem("favorites"));

    expect(savedFavorites).toContainEqual(newFavorite);
  });
});

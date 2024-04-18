import { Accessor, Component, createContext, createEffect, createSignal, useContext } from "solid-js";
import { createStore } from "solid-js/store";

type ShoppingCartProviderProps = {
  children: any;
};

type ShoppingCartContext = {
  items: CartItem[];
  totalQuantity: number;
  addToCart: (id: number) => void;
  increment: (id: number) => void;
  decrement: (id: number) => void;
  remove: (id: number) => void;
};

type CartItem = {
  id: number;
  quantity: number;
};

const ShoppingCartContext = createContext({} as ShoppingCartContext);

export const useShoppingCart = () => {
  return useContext(ShoppingCartContext);
};

const ShoppingCartProvider: Component<ShoppingCartProviderProps> = (props) => {
  const initial: CartItem[] = JSON.parse(localStorage.getItem("solidjs_cart") || "[]");
  const [items, setItems] = createStore<CartItem[]>(initial);

  createEffect(() => localStorage.setItem("solidjs_cart", JSON.stringify(items.map((item) => ({ ...item })))));

  const addToCart = (id: number) => {
    setItems((prev) => [...prev, { id, quantity: 1 }]);
  };

  const increment = (id: number) => {
    setItems(
      (item) => item.id === id,
      "quantity",
      (q) => q + 1
    );
  };

  const decrement = (id: number) => {
    if (items.find((item) => item.id === id)?.quantity === 1) return remove(id);

    setItems(
      (item) => item.id === id,
      "quantity",
      (q) => q - 1
    );
  };

  const remove = (id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const store = {
    items,
    addToCart,
    increment,
    decrement,
    remove,
    get totalQuantity() {
      return items.reduce((quantity, item) => quantity + item.quantity, 0);
    },
  };

  return <ShoppingCartContext.Provider value={store}>{props.children}</ShoppingCartContext.Provider>;
};

export default ShoppingCartProvider;

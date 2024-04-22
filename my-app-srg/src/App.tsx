import { Component, createContext, useContext, createSignal, JSX } from "solid-js";

type Product = {
  id: number;
  name: string;
  quantity: number;
};

type CartContextType = {
  items: () => Product[];
  addToCart: (product: Omit<Product, 'quantity'>) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  removeFromCart: (productId: number) => void;
};

const CartContext = createContext<CartContextType>();

const CartProvider: Component = (props) => {
  const [items, setItems] = createSignal<Product[]>([
    { id: 1, name: "foo", quantity: 5 },
    { id: 2, name: "bar", quantity: 3 },
    { id: 3, name: "fobar", quantity: 8 },
  ]);

  const addToCart = (product: Omit<Product, 'quantity'>) => {
    setItems((prevItems) => {
      const index = prevItems.findIndex(item => item.id === product.id);
      if (index > -1) {
        const newItems = [...prevItems];
        newItems[index] = { ...newItems[index], quantity: newItems[index].quantity + 1 };
        return newItems;
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const updateQuantity = (productId: number, quantity: number) => {
    setItems((prevItems) => prevItems.map(item =>
      item.id === productId ? { ...item, quantity } : item
    ));
  };

  const removeFromCart = (productId: number) => {
    setItems((prevItems) => prevItems.filter(item => item.id !== productId));
  };

  const store: CartContextType = {
    items,
    addToCart,
    updateQuantity,
    removeFromCart
  };

  return (
    <CartContext.Provider value={store}>
      {props.children}
    </CartContext.Provider>
  );
};

const ShoppingCart: Component = () => {
  const { items, updateQuantity, removeFromCart } = useContext(CartContext);

  return (
    
    <div>
      {items().map((item) => (
        <CartItem
          key={item.id}
          item={item}
          onUpdateQuantity={updateQuantity}
          onRemove={removeFromCart}
        />
      ))}
    </div>
  );
};

type CartItemProps = {
  item: Product;
  onUpdateQuantity: (productId: number, quantity: number) => void;
  onRemove: (productId: number) => void;
};

const CartItem: Component<CartItemProps> = (props) => {
  return (
    <div>
      <span>{props.item.name}</span>
      <span>{props.item.quantity}</span>
      <input
        type="number"
        value={props.item.quantity.toString()}
        onChange={(e) => props.onUpdateQuantity(props.item.id, parseInt(e.currentTarget.value))}
      />
      <button onClick={() => props.onRemove(props.item.id)}>Remove</button>
    </div>
  );
};

const App: Component = () => {
  return (
    <>
    <h1>hello</h1>
    
    <CartProvider>
      <ShoppingCart />
    </CartProvider>
    </>
  
  );
};

export default App;

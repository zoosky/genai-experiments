import { createSignal } from 'solid-js';

const products = [
    { id: 123, name: "banana", price: 20, quantity: 1 },
    { id: 124, name: "apple", price: 15, quantity: 1 },
    { id: 125, name: "orange", price: 10, quantity: 1 },
    { id: 126, name: "grape", price: 25, quantity: 1 },
    { id: 127, name: "mango", price: 30, quantity: 1 },
];

const ShoppingCart = () => {
  const [cartItems, setCartItems] = createSignal([]);

  const addItemToCart = (item) => {
    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex((i) => i.id === item.id);
      if (existingItemIndex > -1) {
        return prevItems.map((i, index) =>
          index === existingItemIndex ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        return [...prevItems, { ...item, quantity: 1 }];
      }
    });
  };

  const removeItemFromCart = (itemId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  const updateItemQuantity = (itemId, quantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, quantity: Math.max(0, quantity) } : item
      )
    );
  };

  return (
    <div>
          <h2>Shopping Cart</h2>

          
      <For each={cartItems()}>
        {(item) => (
          <div key={item.id}>
            <p>{item.name}: ${item.price} x {item.quantity}</p>
            <button onClick={() => updateItemQuantity(item.id, item.quantity + 1)}>+</button>
            <button onClick={() => updateItemQuantity(item.id, item.quantity - 1)}>-</button>
            <button onClick={() => removeItemFromCart(item.id)}>Remove</button>
          </div>
        )}
          </For>
              <div>
      {/* Other components */}
              <button onClick={() => addItemToCart(products[0])}>Add first product to cart</button>
              <div>
                  
              <button onClick={() => products.forEach(product => addItemToCart(product))}>
  Add all to cart
              </button>
              </div>
              
    </div>
      </div>
      
  );
};

export default ShoppingCart;

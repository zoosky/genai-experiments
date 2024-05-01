import { createSignal } from 'solid-js';
import CartItem from './CartItem';

function Cart() {
  const [items, setItems] = createSignal([]);

  const addItem = (newItem) => {
    setItems([...items(), newItem]);
  };

  const updateQuantity = (id, quantity) => {
    const updatedItems = items().map(item =>
      item.id === id ? { ...item, quantity: quantity } : item
    );
    setItems(updatedItems);
  };

  const removeItem = (id) => {
    setItems(items().filter(item => item.id !== id));
  };

  const total = () => items().reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div>
      <h2>Shopping Cart</h2>
      <div>
        {items().map(item => (
          <CartItem item={item} updateQuantity={updateQuantity} removeItem={removeItem} />
        ))}
      </div>
      <div>Total: ${total()}</div>
      <button onClick={() => addItem({ id: items().length + 1, name: "New Item", price: 10, quantity: 1 })}>
        Add Item
      </button>
    </div>
  );
}

export default Cart;

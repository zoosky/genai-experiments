import { createSignal } from 'solid-js';

function CartItem({ item, updateQuantity, removeItem }) {
  const [quantity, setQuantity] = createSignal(item.quantity);

  const handleQuantityChange = (event) => {
    const newQuantity = parseInt(event.target.value);
    setQuantity(newQuantity);
    updateQuantity(item.id, newQuantity);
  };

  return (
    <div>
      <span>{item.name} - ${item.price}</span>
      <input type="number" value={quantity()} min="1" onInput={handleQuantityChange} />
      <button onClick={() => removeItem(item.id)}>Remove</button>
    </div>
  );
}

export default CartItem;

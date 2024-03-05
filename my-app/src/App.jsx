import logo from './logo.svg';
import styles from './App.module.css';
import Cart from './cart.jsx';

function App() {
  return (
    <div class={styles.App}>
      <header class={styles.header}>
        
            <Cart /> {/* Embedding the Cart component */}
      </header>
    </div>
  );
}

export default App;

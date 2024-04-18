import { Routes, Route } from "solid-app-router";
import { Container, Flex } from "@hope-ui/solid";

import ShoppingCartProvider from "./context/ShoppingCartContext";
import Navbar from "./components/Navbar";
import Store from "./pages/Store";
import About from "./pages/About";
import ShoppingCart from "./components/ShoppingCart";
import { createSignal } from "solid-js";

const App = () => {
  const [showCart, setShowCart] = createSignal(false);

  return (
    <ShoppingCartProvider>
      <Flex direction="column" gap="$4" backgroundColor="$neutral1" minH="100vh" pb="$4">
        <Navbar onShowCart={() => setShowCart(true)} />
        <Container px="$6">
          <Routes>
            <Route path="/" element={<Store />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </Container>
        <ShoppingCart opened={showCart} onClose={() => setShowCart(false)} />
      </Flex>
    </ShoppingCartProvider>
  );
};

export default App;

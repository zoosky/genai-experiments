import { Accessor, Component, For, Show } from "solid-js";
import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Text,
} from "@hope-ui/solid";

import { useShoppingCart } from "../context/ShoppingCartContext";
import storeItems from "../data/items.json";
import CartItem from "./CartItem";
import formatCurrency from "../utilities/formatCurrency";

type Props = {
  opened: Accessor<boolean>;
  onClose: () => void;
};

const ShoppingCart: Component<Props> = (props) => {
  const cart = useShoppingCart();

  const totalPrice = () =>
    cart.items.reduce((total, cartItem) => {
      const item = storeItems.find((i) => i.id === cartItem.id);
      return total + (item?.price || 0) * cartItem.quantity;
    }, 0);

  return (
    <Drawer size="sm" placement="right" opened={props.opened()} onClose={props.onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Cart</DrawerHeader>

        <DrawerBody>
          <Flex direction="column" gap="$6">
            <Show
              when={cart.items.length > 0}
              fallback={
                <Text as="cite" textAlign="center" fontSize="$lg" color="$neutral11">
                  No items in the cart
                </Text>
              }
            >
              <For each={cart.items}>
                {(item) => <CartItem id={item.id} quantity={item.quantity} onRemove={() => cart.remove(item.id)} />}
              </For>
              <Text textAlign="right" fontWeight="bold" fontSize="$xl">
                Total: {formatCurrency(totalPrice())}
              </Text>
            </Show>
          </Flex>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default ShoppingCart;

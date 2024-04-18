import { Component, Show } from "solid-js";
import { Box, Button, ButtonGroup, Flex, IconButton, Image, Text } from "@hope-ui/solid";
import { IoRemove, IoAdd } from "solid-icons/io";

import formatCurrency from "../utilities/formatCurrency";
import { useShoppingCart } from "../context/ShoppingCartContext";

type Props = {
  id: number;
  name: string;
  price: number;
  imgUrl: string;
  description: string;
};

const StoreItem: Component<Props> = (props) => {
  const cart = useShoppingCart();

  const cartItem = () => cart.items.find((item) => item.id === props.id);
  const quantity = () => cartItem()?.quantity || 0;

  return (
    <Box borderWidth="1px" borderColor="$neutral6" borderRadius="$lg" overflow="hidden">
      <Image src={props.imgUrl} alt={props.name} objectFit="cover" h="200px" w="100%" />
                    
      <Flex direction="column" p="$4" gap="$4">
        <Flex justifyContent="space-between">
          <Box fontWeight="$semibold">{props.name}</Box>
          
          <Text px="1.5ch" alignSelf="center">
                {props.description}
              </Text>
          <Box fontWeight="$semibold" color="$blackAlpha11">
            {formatCurrency(props.price)}
          </Box>
        </Flex>
        <Show
          when={quantity() > 0}
          fallback={
            <Button size="sm" colorScheme="info" onClick={() => cart.addToCart(props.id)}>
              Add to Cart 1
            </Button>
          }
        >
          <Flex justifyContent="space-between">
            <Button size="sm" colorScheme="danger" variant="outline" onClick={[cart.remove, props.id]}>
              Remove
            </Button>

            <ButtonGroup size="sm" colorScheme="info" attached>
              <IconButton mr="-1px" icon={<IoRemove />} aria-label="remove" onClick={[cart.decrement, props.id]} />
              <Text px="1.5ch" alignSelf="center">
                {quantity()}
              </Text>
              <IconButton mr="-1px" icon={<IoAdd />} aria-label="add" onClick={[cart.increment, props.id]} />
            </ButtonGroup>
          </Flex>
        </Show>
      </Flex>
    </Box>
  );
};

export default StoreItem;

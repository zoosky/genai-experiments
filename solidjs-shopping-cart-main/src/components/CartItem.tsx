import { Component, Show } from "solid-js";
import { Box, Button, Flex, IconButton, Image, Text } from "@hope-ui/solid";
import { AiFillDelete } from "solid-icons/ai";

import items from "../data/items.json";
import formatCurrency from "../utilities/formatCurrency";

type Props = {
  id: number;
  quantity: number;
  onRemove: () => void;
};

const CartItem: Component<Props> = (props) => {
  const item = items.find((item) => item.id === props.id);

  return (
    <Flex alignItems="center" justifyContent="space-between">
      <Flex gap="$2" alignItems="center">
        <Image src={item?.imgUrl} alt={item?.name} height="75px" width="125px" objectFit="cover" />
        <Flex direction="column">
          <Flex alignItems="center" gap="$1">
            <Text fontSize="$md">{item?.name} </Text>
            <Show when={props.quantity > 1}>
              <Text fontSize="$sm" color="$neutral11">
                (x{props.quantity.toString()})
              </Text>
            </Show>
          </Flex>
          <Text fontSize="$sm" color="$neutral11">
            {formatCurrency(item?.price!)}
          </Text>
        </Flex>
      </Flex>
      <Flex alignItems="center" gap="$2">
        <Text fontSize="$md">{formatCurrency(props.quantity * item?.price!)}</Text>
        <IconButton
          size="sm"
          variant="outline"
          colorScheme="danger"
          icon={<AiFillDelete />}
          aria-label="delete"
          onClick={props.onRemove}
        />
      </Flex>
    </Flex>
  );
};

export default CartItem;

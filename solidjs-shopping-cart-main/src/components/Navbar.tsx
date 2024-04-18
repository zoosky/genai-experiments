import { Component } from "solid-js";
import { Anchor, Badge, Box, Container, Flex, IconButton } from "@hope-ui/solid";
import { IoCart } from "solid-icons/io";
import { Link } from "solid-app-router";

import { useShoppingCart } from "../context/ShoppingCartContext";

type Props = {
  onShowCart: () => void;
};

const NavBar: Component<Props> = (props) => {
  const cart = useShoppingCart();

  return (
    <Box py="$3" shadow="$sm" backgroundColor="white" position="sticky" top="0">
      <Container px="$6">
        <Flex justifyContent="space-between" alignItems="center">
          <Flex gap="$5">
            <Anchor as={Link} href="/">
              Home
            </Anchor>
            <Anchor as={Link} href="/about">
              About
            </Anchor>
          </Flex>
          <Box position="relative">
            <IconButton aria-label="Cart" icon={<IoCart />} colorScheme="info" compact onClick={props.onShowCart} />
            <Badge
              variant="solid"
              colorScheme="danger"
              position="absolute"
              top="0"
              right="0"
              transform="translate(25%, -25%)"
            >
              {cart.totalQuantity}
            </Badge>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
};

export default NavBar;

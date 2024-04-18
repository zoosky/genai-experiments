import { Anchor, Flex, Text } from "@hope-ui/solid";

const About = () => {
  return (
    <Flex direction="column" gap="$4">
      <Text fontSize="$2xl">Solidjs Shopping Cart</Text>
      <Text>
        A simple shopping cart with{" "}
        <Anchor external href="https://www.solidjs.com/" color="$info9">
          Solid.js
        </Anchor>{" "}
        and{" "}
        <Anchor external href="https://hope-ui.com/" color="$info9">
          Hope UI
        </Anchor>
        .
      </Text>
    </Flex>
  );
};

export default About;

import { Grid, GridItem } from "@hope-ui/solid";
import { For } from "solid-js";

import items from "../data/items.json";
import StoreItem from "../components/StoreItem";

const Store = () => {
  return (
    <Grid templateColumns={{ "@sm": "repeat(1, 1fr)", "@md": "repeat(2, 1fr)", "@lg": "repeat(3, 1fr)" }} gap="$6">
      <For each={items}>
        {(item) => (
          <GridItem>
            <StoreItem {...item} />
          </GridItem>
        )}
      </For>
    </Grid>
  );
};

export default Store;

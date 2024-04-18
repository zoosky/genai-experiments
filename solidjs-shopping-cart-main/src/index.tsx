/* @refresh reload */
import { render } from "solid-js/web";
import { Router } from "solid-app-router";
import { HopeProvider } from "@hope-ui/solid";

import App from "./App";

render(
  () => (
    <Router>
      <HopeProvider>
        <App />
      </HopeProvider>
    </Router>
  ),
  document.getElementById("root") as HTMLElement
);

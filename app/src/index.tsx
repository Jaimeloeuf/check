/* @refresh reload */
import { render } from "solid-js/web";
import { Router } from "solid-app-router";

// Import bulma as side effect
import "bulma";

import App from "./App";

render(
  () => (
    <Router>
      <App />
    </Router>
  ),
  document.getElementById("root") as HTMLElement
);

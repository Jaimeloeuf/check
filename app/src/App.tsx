import routes from "./routes";
import { useRoutes, Link } from "solid-app-router";

export default function App() {
  const Routes = useRoutes(routes);

  return (
    <>
      <h1>Site</h1>

      <div>
        <Link href="/">Home</Link>
        <br />

        <Link class="nav" href="/checklist/15">
          /checklist/15
        </Link>
        <br />

        <Link class="nav" href="/checklist/15?view=grid">
          /checklist/15?view=grid
        </Link>
      </div>

      <Routes />
    </>
  );
}

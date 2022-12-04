import {
  SessionContextValue,
  useSessionContext,
} from "@contexts/SessionContext";
import {
  createReactRouter,
  createRouteConfig,
  Outlet,
  RouterProvider,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { beerDetailsRoute, beerRoute } from "./BeerDetails/BeerDetails";
import { beersRoute } from "./BeersList/BeersList";
import { layoutRoute } from "./MainLayout/MainLayout";
import { randomBeerRoute } from "./RandomBeerDetails/RandomBeerDetails";

const rootRoute = createRouteConfig();

const routeConfig = rootRoute.addChildren([
  layoutRoute.addChildren([
    beersRoute,
    randomBeerRoute,
    beerRoute.addChildren([beerDetailsRoute]),
  ]),
]);

const router = createReactRouter({
  routeConfig,
  useContext: () => {
    const session = useSessionContext();
    return { session };
  },
});

declare module "@tanstack/react-router" {
  interface RouterContext {
    session: SessionContextValue;
  }
}

declare module "@tanstack/react-router" {
  interface RegisterRouter {
    router: typeof router;
  }
}

export const Router = () => {
  return (
    <RouterProvider router={router}>
      <Outlet />
      <TanStackRouterDevtools position="bottom-right" />
    </RouterProvider>
  );
};

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
import { protectedRoute } from "./Protected/Protected";
import { randomBeerRoute } from "./RandomBeerDetails/RandomBeerDetails";
import { signInRoute } from "./SignIn/SignIn";

const rootRoute = createRouteConfig();

const routeConfig = rootRoute.addChildren([
  layoutRoute.addChildren([
    beersRoute,
    randomBeerRoute,
    beerRoute.addChildren([beerDetailsRoute]),
    signInRoute,
    protectedRoute,
  ]),
]);

export const router = createReactRouter({
  routeConfig,
  useContext: () => {
    const session = useSessionContext();
    return { session };
  },
});

declare module "@tanstack/react-router" {
  interface RegisterRouter {
    router: typeof router;
  }
  interface RouterContext {
    session: SessionContextValue;
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

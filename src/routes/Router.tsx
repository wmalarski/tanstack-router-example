import {
  createReactRouter,
  createRouteConfig,
  Outlet,
  RouterProvider,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { z } from "zod";
import { BeerDetails } from "./BeerDetails/BeerDetails";
import { BeersList } from "./BeersList/BeersList";
import { MainLayout } from "./MainLayout/MainLayout";
import { RandomBeerDetails } from "./RandomBeerDetails/RandomBeerDetails";

const rootRoute = createRouteConfig();

const indexRoute = rootRoute.createRoute({
  path: "/",
  component: BeersList,
});

const randomRoute = rootRoute.createRoute({
  path: "random",
  component: RandomBeerDetails,
});

const beersRoute = rootRoute.createRoute({
  path: "beers",
});

const beerRoute = beersRoute.createRoute({
  path: "$id",
  parseParams: (params) => ({ id: z.number().int().parse(+params.id) }),
  stringifyParams: ({ id }) => ({ id: `${id}` }),
  component: BeerDetails,
});

const layoutRoute = rootRoute.createRoute({
  id: "layout",
  component: MainLayout,
});

const routeConfig = rootRoute.addChildren([
  layoutRoute.addChildren([
    indexRoute,
    randomRoute,
    beersRoute.addChildren([beerRoute]),
  ]),
]);

const router = createReactRouter({
  routeConfig,
});

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

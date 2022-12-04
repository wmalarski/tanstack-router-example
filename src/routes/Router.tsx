import {
  createReactRouter,
  createRouteConfig,
  Outlet,
  RouterProvider,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { z } from "zod";

const Navbar = () => {
  return (
    <div>
      <router.Link to="/">Home</router.Link>
      <router.Link to="/random">Random</router.Link>
      <router.Link to="/beers/$id" params={{ id: 1 }}>
        Random
      </router.Link>
    </div>
  );
};

const rootRoute = createRouteConfig();

const indexRoute = rootRoute.createRoute({
  path: "/",
  component: () => {
    return (
      <div>
        <span>Component</span>
      </div>
    );
  },
});

const randomRoute = rootRoute.createRoute({
  path: "random",
  component: () => {
    return (
      <div>
        <span>Random</span>
      </div>
    );
  },
});

const beersRoute = rootRoute.createRoute({
  path: "beers",
});

const beerRoute = beersRoute.createRoute({
  path: "$id",
  parseParams: (params) => ({ id: z.number().int().parse(+params.id) }),
  stringifyParams: ({ id }) => ({ id: `${id}` }),
  component: () => {
    return (
      <div>
        <span>Beer</span>
      </div>
    );
  },
});

const layoutRoute = rootRoute.createRoute({
  id: "layout",
  component: () => {
    return (
      <div>
        <Navbar />
        <Outlet />
      </div>
    );
  },
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

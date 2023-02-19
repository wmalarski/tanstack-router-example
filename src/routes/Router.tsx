import { useSessionContext } from "@contexts/SessionContext";
import { Outlet, ReactRouter, RouterProvider } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { beerDetailsRoute, beerRoute } from "./BeerDetails/BeerDetails";
import { beersRoute } from "./BeersList/BeersList";
import { layoutRoute } from "./MainLayout/MainLayout";
import { protectedRoute } from "./Protected/Protected";
import { randomBeerRoute } from "./RandomBeerDetails/RandomBeerDetails";
import { rootRoute } from "./Root/Root";
import { signInRoute } from "./SignIn/SignIn";

const routeTree = rootRoute.addChildren([
  layoutRoute.addChildren([
    beersRoute,
    randomBeerRoute,
    beerRoute.addChildren([beerDetailsRoute]),
    signInRoute,
    protectedRoute,
  ]),
]);

export const router = new ReactRouter({
  routeTree,
  context: () => {
    const session = useSessionContext();
    return { session };
  },
});
// useContext: () => {
// },

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
  // interface RouterContext {
  //   session: SessionContextValue;
  // }
}

export const Router = () => {
  return (
    <RouterProvider router={router}>
      <Outlet />
      <TanStackRouterDevtools position="bottom-right" />
    </RouterProvider>
  );
};

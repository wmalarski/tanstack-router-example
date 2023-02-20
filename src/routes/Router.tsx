import { useSessionContext } from "@contexts/SessionContext";
import { LoaderClientProvider } from "@tanstack/react-loaders";
import { ReactRouter, RouterProvider } from "@tanstack/react-router";
import { beersLayoutRoute } from "./beers";
import { beerDetailsRoute } from "./beers/beer/beer";
import { beersIndexRoute } from "./beers/beers";
import { loaderClient } from "./loaderClient";
import { layoutRoute } from "./MainLayout/MainLayout";
import { protectedRoute } from "./protected/protected";
import { randomBeerRoute } from "./random/random";
import { signInRoute } from "./signIn/signIn";
import { rootRoute } from "./__root";

const routeTree = rootRoute.addChildren([
  layoutRoute.addChildren([
    beersIndexRoute,
    randomBeerRoute,
    beersLayoutRoute.addChildren([beerDetailsRoute]),
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
    <LoaderClientProvider loaderClient={loaderClient}>
      <RouterProvider router={router} />
    </LoaderClientProvider>
    // <Outlet />
    // <TanStackRouterDevtools position="bottom-right" />
  );
};

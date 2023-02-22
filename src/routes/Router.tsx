import { useSessionContext } from "@contexts/SessionContext";
import { LoaderClientProvider } from "@tanstack/react-loaders";
import { ReactRouter, RouterProvider } from "@tanstack/react-router";
import { beerRoute } from "./Beer/Beer";
import { beersIndexRoute } from "./Beers/Beers";
import { loaderClient } from "./loaderClient";
import { protectedRoute } from "./Protected/Protected";
import { randomRoute } from "./Random/Random";
import { rootRoute } from "./Root/Root";
import { signInRoute } from "./SignIn/SignIn";

const routeTree = rootRoute.addChildren([
  beersIndexRoute,
  randomRoute,
  beerRoute,
  signInRoute,
  protectedRoute,
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

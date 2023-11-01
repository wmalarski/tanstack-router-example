import { LoaderClientProvider } from "@tanstack/react-loaders";
import { Router, RouterProvider } from "@tanstack/react-router";
import { beerRoute } from "./Beer/Beer";
import { beersIndexRoute } from "./Beers/Beers";
import { protectedRoute } from "./Protected/Protected";
import { randomRoute } from "./Random/Random";
import { rootRoute } from "./Root/Root";
import { signInRoute } from "./SignIn/SignIn";
import { loaderClient } from "./loaderClient";

const routeTree = rootRoute.addChildren([
  beersIndexRoute,
  randomRoute,
  beerRoute,
  signInRoute,
  protectedRoute,
]);

export const router = new Router({
  routeTree,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export const AppRouter = () => {
  return (
    <LoaderClientProvider loaderClient={loaderClient}>
      <RouterProvider router={router} />
    </LoaderClientProvider>
    // <TanStackRouterDevtools position="bottom-right" />
  );
};

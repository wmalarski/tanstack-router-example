import { QueryClient, useQueryClient } from "@tanstack/react-query";
import { Router, RouterProvider } from "@tanstack/react-router";
import { useState } from "react";
import { beerRoute } from "./Beer/Beer";
import { beersIndexRoute } from "./Beers/Beers";
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

const getRouter = (queryClient: QueryClient) => {
  return new Router({
    routeTree,
    defaultPreload: 'intent',
    defaultPreloadStaleTime: 0,
    context: { queryClient }
  });
}

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof getRouter>;
  }
}

export const AppRouter = () => {
  const queryClient = useQueryClient();

  const [router] = useState(() => getRouter(queryClient))

  return <RouterProvider router={router} />;
};

import { rootRoute } from "@routes/__root";
import { Route } from "@tanstack/react-router";

export const beersLayoutRoute = new Route({
  path: "beers",
  getParentRoute: () => rootRoute,
});

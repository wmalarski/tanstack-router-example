import { getBeers } from "@services/beers";
import { createRouteConfig, useMatch } from "@tanstack/react-router";
import { z } from "zod";

const BeersList = () => {
  const { loaderData } = useMatch(beersRoute.id);

  return (
    <div>
      <span>Beers</span>
      <pre>{JSON.stringify(loaderData, null, 2)}</pre>
    </div>
  );
};

export const beersRoute = createRouteConfig().createRoute({
  path: "/",
  component: BeersList,
  validateSearch: z.object({
    page: z.number().int().min(1).optional(),
  }),
  loader: ({ search }) => {
    return getBeers({ page: search.page });
  },
});

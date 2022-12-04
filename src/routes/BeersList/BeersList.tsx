import { getBeers, getBeersKey } from "@services/beers";
import { queryClient } from "@services/queryClient";
import { useQuery } from "@tanstack/react-query";
import { createRouteConfig, useMatch } from "@tanstack/react-router";
import { z } from "zod";

const BeersList = () => {
  const { search } = useMatch(beersRoute.id);

  const { data } = useQuery(getBeersKey({ page: search.page }), getBeers);

  return (
    <div>
      <span>Beers</span>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export const beersRoute = createRouteConfig().createRoute({
  path: "/",
  component: BeersList,
  validateSearch: z.object({
    page: z.number().int().min(1).optional(),
  }),
  loader: async ({ search }) => {
    const key = getBeersKey({ page: search.page });
    queryClient.getQueryData(key) ??
      (await queryClient.prefetchQuery(key, getBeers));
    return {};
  },
});

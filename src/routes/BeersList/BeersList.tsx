import { getBeerKey, getBeers, getBeersKey } from "@services/beers";
import { queryClient } from "@services/queryClient";
import type { Beer } from "@services/types";
import { useQuery } from "@tanstack/react-query";
import { createRouteConfig, Link, useMatch } from "@tanstack/react-router";
import { z } from "zod";

const BeersList = () => {
  const { search } = useMatch(beersRoute.id);

  const { data } = useQuery(getBeersKey({ page: search.page }), getBeers);

  return (
    <div>
      <span>Beers</span>
      {data?.map((beer) => (
        <Link key={beer.id} to="/beer/$id" params={{ id: beer.id }}>
          <h2>{beer.name}</h2>
          <h3>{beer.description}</h3>
        </Link>
      ))}
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
  onLoaded: ({ search }) => {
    const key = getBeersKey({ page: search.page });
    const data = queryClient.getQueryData<Beer[]>(key);
    data?.forEach((beer) => {
      queryClient.setQueryData(getBeerKey({ id: beer.id }), beer);
    });
  },
  pendingComponent: () => {
    return <span>Loading Beers List</span>;
  },
});

import { rootRoute } from "@routes/Root/Root";
import { getBeerKey, getBeers, getBeersKey } from "@services/beers";
import { queryClient } from "@services/queryClient";
import type { Beer } from "@services/types";
import { Loader } from "@tanstack/react-loaders";
import { useQuery } from "@tanstack/react-query";
import { Link, Route, useSearch } from "@tanstack/react-router";
import { QueryFunctionResult } from "@utils/types";
import { z } from "zod";

const Beers = () => {
  const { page } = useSearch({ from: beersIndexRoute.id });

  const { data } = useQuery(getBeersKey({ page }), getBeers);

  return (
    <div>
      <span>Beers</span>
      {data?.map((beer) => (
        <Link key={beer.id} to="/beers/$id" params={{ id: beer.id }}>
          <h2>{beer.name}</h2>
          <h3>{beer.description}</h3>
        </Link>
      ))}
    </div>
  );
};

export const beersLoader = new Loader({
  key: "beers",
  loader: async (page: number) => {
    const key = getBeersKey({ page });
    const invoices =
      queryClient.getQueryData<QueryFunctionResult<typeof getBeers>>(key) ??
      (await queryClient.fetchQuery(key, getBeers));
    return invoices;
  },
});

export const beersIndexRoute = new Route({
  path: "/",
  component: Beers,
  validateSearch: z.object({
    page: z.number().int().min(1).optional().default(1),
  }),
  getParentRoute: () => rootRoute,
  onLoad: ({ search }) => {
    return beersLoader.load(search.page);
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

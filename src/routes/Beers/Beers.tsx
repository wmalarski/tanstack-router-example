import { rootRoute } from "@routes/Root/Root";
import { loaderClient } from "@routes/loaderClient";
import { getBeerKey, getBeers, getBeersKey } from "@services/beers";
import { queryClient } from "@services/queryClient";
import type { Beer } from "@services/types";
import { useQuery } from "@tanstack/react-query";
import { Link, Route, useSearch } from "@tanstack/react-router";
import { z } from "zod";

const Beers = () => {
  const { page } = useSearch({ from: beersIndexRoute.id });

  const { data } = useQuery({
    queryKey: getBeersKey({ page }),
    queryFn: getBeers,
  });

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

export const beersIndexRoute = new Route({
  path: "/",
  component: Beers,
  validateSearch: z.object({
    page: z.number().int().min(1).optional().default(1),
  }),
  loaderContext: ({ search: { page } }) => ({ page }),
  getParentRoute: () => rootRoute,
  loader: ({ context, abortController }) => {
    return loaderClient.load({
      key: "beers",
      variables: context.page,
      signal: abortController.signal,
    });
  },
  onEnter: ({ search }) => {
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

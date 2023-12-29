import { rootRoute } from "@routes/Root/Root";
import { getBeerKey, getBeers, getBeersKey } from "@services/beers";
import { queryClient } from "@services/queryClient";
import type { Beer } from "@services/types";
import { useQuery } from "@tanstack/react-query";
import { Link, Route, useSearch } from "@tanstack/react-router";
import { z } from "zod";

type BeerListItemProps = {
  beer: Beer;
};

export const BeerListItem = ({ beer }: BeerListItemProps) => {
  return (
    <li>
      <img src={beer.image_url} />
      <Link to="/beers/$id" params={{ id: beer.id }}>
        <h2>{beer.name}</h2>
      </Link>
      <span>{beer.description}</span>
      <details>
        <summary>More</summary>
        <pre>{JSON.stringify(beer, null, 2)}</pre>
      </details>
    </li>
  );
};

const Beers = () => {
  const { page } = useSearch({ from: beersIndexRoute.id });

  const { data } = useQuery({
    queryKey: getBeersKey({ page }),
    queryFn: getBeers,
  });

  return (
    <div>
      <span>Beers</span>
      <ul>
        {data?.map((beer) => (
          <BeerListItem key={beer.id} beer={beer} />
        ))}
      </ul>
    </div>
  );
};

export const beersIndexRoute = new Route({
  path: "/",
  component: Beers,
  validateSearch: z.object({
    page: z.number().int().min(1).optional().default(1),
  }),

  // loaderContext: ({ search: { page } }) => ({ page }),
  getParentRoute: () => rootRoute,
  loaderDeps: ({ search }) => ({ page: search.page }),
  loader: ({ deps }) => {
    const queryKey = getBeersKey({ page: deps.page });

    const invoices = queryClient.ensureQueryData({
      queryKey,
      queryFn: getBeers
    });

    return invoices;
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

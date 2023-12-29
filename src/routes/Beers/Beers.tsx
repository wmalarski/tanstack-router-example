import { rootRoute } from "@routes/Root/Root";
import { getBeerQueryOptions, getBeersQueryOptions } from "@services/beers";
import type { Beer } from "@services/types";
import { useQuery } from "@tanstack/react-query";
import { Link, Route, useSearch } from "@tanstack/react-router";
import {
  coerce,
  integer,
  minValue,
  number,
  object,
  optional,
  parse,
} from "valibot";

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

export const beersIndexRoute = new Route({
  path: "/",
  component: () => {
    const { page } = useSearch({ from: beersIndexRoute.id });
  
    const { data } = useQuery(getBeersQueryOptions({ page }));
  
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
  },
  validateSearch: (search) =>
    parse(
      object({
        page: optional(coerce(number([integer(), minValue(1)]), Number), 1),
      }),
      search,
    ),
  getParentRoute: () => rootRoute,
  loaderDeps: ({ search }) => ({ page: search.page }),
  loader: async ({ deps, context: { queryClient } }) => {
    const beers = await queryClient.ensureQueryData(
      getBeersQueryOptions({ page: deps.page }),
    );

    beers?.forEach((beer) => {
      const { queryKey } = getBeerQueryOptions({ id: beer.id });
      queryClient.setQueryData(queryKey, beer);
    });
  },
  pendingComponent: () => {
    return <span>Loading Beers List</span>;
  },
  errorComponent: () => {
    return <span>Loading Beers List Error</span>;
  },
});

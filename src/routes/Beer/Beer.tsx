import { rootRoute } from "@routes/Root/Root";
import { loaderClient } from "@routes/loaderClient";
import { getBeer, getBeerKey } from "@services/beers";
import { useQuery } from "@tanstack/react-query";
import { Route, useParams } from "@tanstack/react-router";
import { z } from "zod";

const Beer = () => {
  const { id } = useParams({ from: beerRoute.id });

  const { data } = useQuery({
    queryKey: getBeerKey({ id }),
    queryFn: getBeer,
  });

  return (
    <div>
      <span>Beer</span>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export const beerRoute = new Route({
  path: "beers/$id",
  getParentRoute: () => rootRoute,
  parseParams: (params) => ({ id: z.coerce.number().int().parse(params.id) }),
  stringifyParams: ({ id }) => ({ id: `${id}` }),
  loader: ({ params, abortController }) => {
    return loaderClient.load({
      key: "beer",
      variables: params.id,
      signal: abortController.signal,
    });
  },
  component: Beer,
  pendingComponent: () => {
    return <span>Loading Beer Details</span>;
  },
});

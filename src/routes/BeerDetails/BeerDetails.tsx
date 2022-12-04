import { getBeer, getBeerKey } from "@services/beers";
import { queryClient } from "@services/queryClient";
import { useQuery } from "@tanstack/react-query";
import { createRouteConfig, useMatch } from "@tanstack/react-router";
import { z } from "zod";

const BeerDetails = () => {
  const { params } = useMatch(beerDetailsRoute.id);

  const { data } = useQuery(getBeerKey({ id: params.id }), getBeer);

  return (
    <div>
      <span>Beer</span>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export const beerRoute = createRouteConfig().createRoute({
  path: "beer",
});

export const beerDetailsRoute = beerRoute.createRoute({
  path: "$id",
  parseParams: (params) => ({ id: z.number().int().parse(+params.id) }),
  stringifyParams: ({ id }) => ({ id: `${id}` }),
  component: BeerDetails,
  loader: async ({ params }) => {
    const key = getBeerKey({ id: params.id });
    queryClient.getQueryData(key) ??
      (await queryClient.prefetchQuery(key, getBeer));
    return {};
  },
});

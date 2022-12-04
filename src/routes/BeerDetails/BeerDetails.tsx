import { getBeer } from "@services/beers";
import { createRouteConfig, useMatch } from "@tanstack/react-router";
import { z } from "zod";

const BeerDetails = () => {
  const { loaderData } = useMatch(beerDetailsRoute.id);

  return (
    <div>
      <span>Beer</span>
      <pre>{JSON.stringify(loaderData, null, 2)}</pre>
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
  loader: ({ params }) => {
    return getBeer({ id: params.id });
  },
});

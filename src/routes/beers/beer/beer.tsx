import { beersRoute } from "@routes/beers";
import { getBeer, getBeerKey } from "@services/beers";
import { queryClient } from "@services/queryClient";
import { Loader } from "@tanstack/react-loaders";
import { useQuery } from "@tanstack/react-query";
import { Route, useParams } from "@tanstack/react-router";
import { QueryFunctionResult } from "@utils/types";
import { z } from "zod";

const BeerDetails = () => {
  const { id } = useParams({ from: beerDetailsRoute.id });

  const { data } = useQuery(getBeerKey({ id }), getBeer);

  return (
    <div>
      <span>Beer</span>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export const beerLoader = new Loader({
  key: "invoice",
  loader: async (id: number) => {
    const key = getBeerKey({ id });
    const invoice =
      queryClient.getQueryData<QueryFunctionResult<typeof getBeer>>(key) ??
      (await queryClient.fetchQuery(key, getBeer));
    return invoice;
  },
});

export const beerDetailsRoute = new Route({
  path: "beers/$id",
  getParentRoute: () => beersRoute,
  parseParams: (params) => ({ id: z.coerce.number().int().parse(params.id) }),
  stringifyParams: ({ id }) => ({ id: `${id}` }),
  component: BeerDetails,
  // loader: async ({ params: { id }, preload }) => {
  //   return beerLoader.load({
  //     variables: id,
  //     preload,
  //   });
  // },
  pendingComponent: () => {
    return <span>Loading Beer Details</span>;
  },
});

import { rootRoute } from "@routes/__root";
import { getBeer, getBeerKey } from "@services/beers";
import { queryClient } from "@services/queryClient";
import { Loader } from "@tanstack/react-loaders";
import { useQuery } from "@tanstack/react-query";
import { Route, useParams } from "@tanstack/react-router";
import { QueryFunctionResult } from "@utils/types";
import { z } from "zod";

const Beer = () => {
  const { id } = useParams({ from: beerRoute.id });

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

export const beerRoute = new Route({
  path: "beers/$id",
  getParentRoute: () => rootRoute,
  parseParams: (params) => ({ id: z.coerce.number().int().parse(params.id) }),
  stringifyParams: ({ id }) => ({ id: `${id}` }),
  component: Beer,
  pendingComponent: () => {
    return <span>Loading Beer Details</span>;
  },
});

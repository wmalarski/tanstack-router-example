import { rootRoute } from "@routes/Root/Root";
import { getBeer, getBeerKey } from "@services/beers";
import { queryClient } from "@services/queryClient";
import { Loader } from "@tanstack/react-loaders";
import { useQuery } from "@tanstack/react-query";
import { Route, useParams } from "@tanstack/react-router";
import { QueryFunctionResult } from "@utils/types";
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

export const beerLoader = new Loader({
  key: "beer",
  loader: async (id: number) => {
    const queryKey = getBeerKey({ id });
    const invoice =
      queryClient.getQueryData<QueryFunctionResult<typeof getBeer>>(queryKey) ??
      (await queryClient.fetchQuery({ queryKey, queryFn: getBeer }));
    return invoice;
  },
});

export const beerRoute = new Route({
  path: "beers/$id",
  getParentRoute: () => rootRoute,
  parseParams: (params) => ({ id: z.coerce.number().int().parse(params.id) }),
  stringifyParams: ({ id }) => ({ id: `${id}` }),
  onLoad: ({ params }) => {
    return beerLoader.load(params.id);
  },
  component: Beer,
  pendingComponent: () => {
    return <span>Loading Beer Details</span>;
  },
});

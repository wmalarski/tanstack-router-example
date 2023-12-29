import { rootRoute } from "@routes/Root/Root";
import { getBeerQueryOptions } from "@services/beers";
import { queryClient } from "@services/queryClient";
import { useQuery } from "@tanstack/react-query";
import { Route, useParams } from "@tanstack/react-router";
import { z } from "zod";

const Beer = () => {
  const { id } = useParams({ from: beerRoute.id });

  const { data } = useQuery(getBeerQueryOptions({ id }));

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
  loader: async ({ params }) => {
    await queryClient.ensureQueryData(getBeerQueryOptions({ id: params.id }));
  },
  component: Beer,
  pendingComponent: () => {
    return <span>Loading Beer Details</span>;
  },
});

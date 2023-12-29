import { rootRoute } from "@routes/Root/Root";
import { getRandomBeerQueryOptions } from "@services/beers";
import { queryClient } from "@services/queryClient";
import { useQuery } from "@tanstack/react-query";
import { Route } from "@tanstack/react-router";

const Random = () => {
  const loaderData = useQuery(getRandomBeerQueryOptions());

  return (
    <div>
      <span>Random</span>
      <pre>{JSON.stringify(loaderData, null, 2)}</pre>
    </div>
  );
};

export const randomRoute = new Route({
  path: "random",
  component: Random,
  loader: async () => {
    await queryClient.ensureQueryData(getRandomBeerQueryOptions());
  },
  getParentRoute: () => rootRoute,
  pendingComponent: () => {
    return <span>Loading Random Beer Details</span>;
  },
});

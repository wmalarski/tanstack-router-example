import { rootRoute } from "@routes/Root/Root";
import { getRandomBeerQueryOptions } from "@services/beers";
import { useQuery } from "@tanstack/react-query";
import { Route } from "@tanstack/react-router";

export const randomRoute = new Route({
  path: "random",
  component: () => {
    const loaderData = useQuery(getRandomBeerQueryOptions());
  
    return (
      <div>
        <span>Random</span>
        <pre>{JSON.stringify(loaderData, null, 2)}</pre>
      </div>
    );
  },
  loader: async ({context: { queryClient }}) => {
    await queryClient.ensureQueryData(getRandomBeerQueryOptions());
  },
  getParentRoute: () => rootRoute,
  pendingComponent: () => {
    return <span>Loading Random Beer Details</span>;
  },
  errorComponent: (error) => {
    return (
      <div>
        Loading Random Error
        <pre>{JSON.stringify(error, null, 2)}</pre>
      </div>
    );
  },
});

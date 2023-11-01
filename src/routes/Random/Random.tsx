import { rootRoute } from "@routes/Root/Root";
import { loaderClient } from "@routes/loaderClient";
import { getRandomBeer } from "@services/beers";
import { Loader } from "@tanstack/loaders";
import { Route, useLoader } from "@tanstack/react-router";

const Random = () => {
  const loaderData = useLoader({ from: "/random" });

  return (
    <div>
      <span>Random</span>
      <pre>{JSON.stringify(loaderData, null, 2)}</pre>
    </div>
  );
};

export const randomLoader = new Loader({
  key: "random",
  fn: async () => {
    return getRandomBeer();
  },
});

export const randomRoute = new Route({
  path: "random",
  component: Random,
  loader: ({ abortController }) => {
    return loaderClient.load({
      key: "random",
      signal: abortController.signal,
    });
  },
  getParentRoute: () => rootRoute,
  pendingComponent: () => {
    return <span>Loading Random Beer Details</span>;
  },
});

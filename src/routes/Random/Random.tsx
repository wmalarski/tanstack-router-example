import { rootRoute } from "@routes/Root/Root";
import { getRandomBeer } from "@services/beers";
import { Loader, useLoader } from "@tanstack/react-loaders";
import { Route } from "@tanstack/react-router";

const Random = () => {
  const [loaderData, instance] = useLoader({ key: randomLoader.key });

  return (
    <div>
      <span>Random</span>
      <pre>{JSON.stringify(loaderData.data, null, 2)}</pre>
    </div>
  );
};

export const randomLoader = new Loader({
  key: "random",
  loader: async () => {
    return getRandomBeer();
  },
});

export const randomRoute = new Route({
  path: "random",
  component: Random,
  onLoad: () => {
    return randomLoader.load();
  },
  getParentRoute: () => rootRoute,
  pendingComponent: () => {
    return <span>Loading Random Beer Details</span>;
  },
});

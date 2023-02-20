import { rootRoute } from "@routes/__root";
import { useLoader } from "@tanstack/react-loaders";
import { Route } from "@tanstack/react-router";

const RandomBeerDetails = () => {
  const [loaderData] = useLoader({ key: randomBeerRoute.id });

  return (
    <div>
      <span>Random</span>
      <pre>{JSON.stringify(loaderData, null, 2)}</pre>
    </div>
  );
};

export const randomBeerRoute = new Route({
  path: "random",
  component: RandomBeerDetails,
  getParentRoute: () => rootRoute,
  // loader: () => {
  //   return getRandomBeer();
  // },
  pendingComponent: () => {
    return <span>Loading Random Beer Details</span>;
  },
});

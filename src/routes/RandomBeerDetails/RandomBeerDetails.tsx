import { getRandomBeer } from "@services/beers";
import { createRouteConfig, useMatch } from "@tanstack/react-router";

const RandomBeerDetails = () => {
  const { loaderData } = useMatch(randomBeerRoute.id);
  return (
    <div>
      <span>Random</span>
      <pre>{JSON.stringify(loaderData, null, 2)}</pre>
    </div>
  );
};

export const randomBeerRoute = createRouteConfig().createRoute({
  path: "random",
  component: RandomBeerDetails,
  loader: () => {
    return getRandomBeer();
  },
});

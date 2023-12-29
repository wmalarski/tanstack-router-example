import { getRandomBeer } from "@services/beers";

export const randomLoader = new Loader({
  key: "random",
  fn: async () => {
    return getRandomBeer();
  },
});

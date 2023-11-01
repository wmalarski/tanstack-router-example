import { getRandomBeer } from "@services/beers";
import { Loader } from "@tanstack/loaders";

export const randomLoader = new Loader({
  key: "random",
  fn: async () => {
    return getRandomBeer();
  },
});

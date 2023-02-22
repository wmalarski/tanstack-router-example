import { LoaderClient } from "@tanstack/react-loaders";
import { beerLoader } from "./Beer/Beer";
import { beersLoader } from "./Beers/Beers";
import { randomLoader } from "./Random/Random";

export const loaderClient = new LoaderClient({
  loaders: [beerLoader, beersLoader, randomLoader],
});

declare module "@tanstack/react-loaders" {
  interface Register {
    loaderClient: typeof loaderClient;
  }
}

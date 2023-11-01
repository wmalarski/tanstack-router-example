import { LoaderClient } from "@tanstack/loaders";
import { beerLoader } from "./Beer/Beer.data";
import { beersLoader } from "./Beers/Beers.data";
import { randomLoader } from "./Random/Random.data";
import { sessionLoader } from "./Root/Root.data";

export const loaderClient = new LoaderClient({
  loaders: [beerLoader, beersLoader, randomLoader, sessionLoader],
});

declare module "@tanstack/loaders" {
  interface Register {
    loaderClient: typeof loaderClient;
  }
}

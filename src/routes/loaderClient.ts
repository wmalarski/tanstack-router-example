import { LoaderClient } from "@tanstack/react-loaders";
import { beerLoader } from "./Beer/Beer";
import { beersLoader } from "./Beers/Beers";
import { randomLoader } from "./Random/Random";
import { sessionLoader } from "./Root/Root";

export const loaderClient = new LoaderClient({
  loaders: [beerLoader, beersLoader, randomLoader, sessionLoader],
});

declare module "@tanstack/react-loaders" {
  interface Register {
    loaderClient: typeof loaderClient;
  }
}

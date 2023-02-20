import { LoaderClient } from "@tanstack/react-loaders";
import { beerLoader } from "./beers/beer/beer";
import { beersLoader } from "./beers/beers";

export const loaderClient = new LoaderClient({
  loaders: [beerLoader, beersLoader],
});

declare module "@tanstack/react-loaders" {
  interface Register {
    loaderClient: typeof loaderClient;
  }
}

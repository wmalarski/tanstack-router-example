import { LoaderClient } from "@tanstack/react-loaders";
import { beerLoader } from "./Beer/Beer";
import { beersLoader } from "./Beers/Beers";

export const loaderClient = new LoaderClient({
  loaders: [beerLoader, beersLoader],
});

declare module "@tanstack/react-loaders" {
  interface Register {
    loaderClient: typeof loaderClient;
  }
}

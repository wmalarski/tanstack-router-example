import { queryOptions } from "@tanstack/react-query";
import { buildSearchParams } from "@utils/searchParams";
import type { Beer } from "./types";

const endpoint = "https://api.punkapi.com";
const delay = 2000;

type Fetcher = {
  init?: RequestInit;
  pathname: string;
  query?: Record<string, unknown>;
};

const fetcher = async <T>({ pathname, query, init }: Fetcher): Promise<T> => {
  const search = buildSearchParams(query);
  const url = `${endpoint}${pathname}?${search}`;

  const response = await fetch(url, init);
  const json = await response.json();

  return new Promise((resolve, reject) =>
    setTimeout(() => {
      if (response.ok) {
        resolve(json as T);
      } else {
        reject(json);
      }
    }, delay),
  );
};

type GetBeers = {
  abv_gt?: number;
  abv_lt?: number;
  ibu_gt?: number;
  ibu_lt?: number;
  ebc_gt?: number;
  ebc_lt?: number;
  beer_name?: string;
  yeast?: string;
  brewed_before?: Date;
  brewed_after?: Date;
  hops?: string;
  malt?: string;
  food?: string;
  ids?: string;
  page?: number;
  per_page?: number;
};

export const getBeersQueryOptions = (args: GetBeers) => {
  return queryOptions({
    queryKey: ["getBeers", args] as const,
    queryFn: ({ queryKey: [, args], signal }) => {
      return fetcher<Beer[]>({
        pathname: "/v2/beers",
        query: args,
        init: { signal },
      });
    },
  });
};

type GetBeer = {
  id: number;
};

export const getBeerQueryOptions = (args: GetBeer) => {
  return queryOptions({
    queryKey: ["getBeer", args] as const,
    queryFn: async ({ queryKey: [, args], signal }) => {
      const result = await fetcher<Beer[]>({
        pathname: `/v2/beers/${args.id}`,
        init: { signal }
      });
      return result.at(0);
    },
  });
};

export const getRandomBeerQueryOptions = () => {
 return queryOptions({
  queryKey: ["random"],
  queryFn: async ({ signal }) => {
    const result = await fetcher<Beer[]>({
      pathname: "/v2/beers/random",
      init: { signal },
    });
    return result.at(0);
  }
 });
}

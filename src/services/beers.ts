import type { QueryFunction } from "@tanstack/react-query";
import type { Beer } from "./types";

const endpoint = "https://api.punkapi.com";
const delay = 2000;

const buildSearchParams = (
  query?: Record<string, unknown>
): URLSearchParams => {
  const entries = Object.entries(query || {});
  const pairs = entries.flatMap(([key, value]) =>
    value !== undefined ? [[key, `${value}`]] : []
  );
  const search = new URLSearchParams(pairs);

  return search;
};

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
    }, delay)
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

type GetBeersKey = ["getBeers", GetBeers];

export const getBeersKey = (args: GetBeers): GetBeersKey => {
  return ["getBeers", args];
};

export const getBeers: QueryFunction<Beer[], GetBeersKey> = ({ queryKey }) => {
  const [, args] = queryKey;
  return fetcher<Beer[]>({
    pathname: "/v2/beers",
    query: args,
  });
};

type GetBeer = {
  id: number;
};

type GetBeerKey = ["getBeer", GetBeer];

export const getBeerKey = (args: GetBeer): GetBeerKey => {
  return ["getBeer", args];
};

export const getBeer: QueryFunction<Beer | undefined, GetBeerKey> = async ({
  queryKey,
}) => {
  const [, args] = queryKey;
  const result = await fetcher<Beer[]>({
    pathname: `/v2/beers/${args.id}`,
  });
  return result.at(0);
};

export const getRandomBeer = async () => {
  const result = await fetcher<Beer[]>({
    pathname: "/v2/beers/random",
  });
  return result.at(0);
};

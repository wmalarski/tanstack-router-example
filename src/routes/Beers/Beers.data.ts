import { getBeers, getBeersKey } from "@services/beers";
import { queryClient } from "@services/queryClient";
import { Loader } from "@tanstack/loaders";
import { QueryFunctionResult } from "@utils/types";

export const beersLoader = new Loader({
  key: "beers",
  fn: async (page: number) => {
    const queryKey = getBeersKey({ page });
    const invoices =
      queryClient.getQueryData<QueryFunctionResult<typeof getBeers>>(
        queryKey,
      ) ?? (await queryClient.fetchQuery({ queryKey, queryFn: getBeers }));
    return invoices;
  },
});

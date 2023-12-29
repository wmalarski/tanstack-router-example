import { getBeer, getBeerKey } from "@services/beers";
import { queryClient } from "@services/queryClient";
import { QueryFunctionResult } from "@utils/types";

export const beerLoader = new Loader({
  key: "beer",
  fn: async (id: number) => {
    const queryKey = getBeerKey({ id });
    const invoice =
      queryClient.getQueryData<QueryFunctionResult<typeof getBeer>>(queryKey) ??
      (await queryClient.fetchQuery({ queryKey, queryFn: getBeer }));
    return invoice;
  },
});

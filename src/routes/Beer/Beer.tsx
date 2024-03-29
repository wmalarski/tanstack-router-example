import { rootRoute } from "@routes/Root/Root";
import { getBeerQueryOptions } from "@services/beers";
import { useQuery } from "@tanstack/react-query";
import { Route, useParams } from "@tanstack/react-router";
import { coerce, integer, minValue, number, object, parse } from "valibot";

export const beerRoute = new Route({
  path: "beers/$id",
  getParentRoute() {
    return rootRoute;
  },
  parseParams(params) {
    return parse(
      object({ id: coerce(number([integer(), minValue(1)]), Number) }),
      params,
    );
  },
  async loader({ context: { queryClient }, params }) {
    await queryClient.ensureQueryData(getBeerQueryOptions({ id: params.id }));
  },
  component: () => {
    const { id } = useParams({ from: beerRoute.id });
  
    const { data } = useQuery(getBeerQueryOptions({ id }));
  
    return (
      <div>
        <span>Beer</span>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    );
  },
  pendingComponent() {
    return <span>Loading Beer Details</span>;
  },
  errorComponent(error) {
    return (
      <div>
        Loading Beer Error
        <pre>{JSON.stringify(error, null, 2)}</pre>
      </div>
    );
  },
});

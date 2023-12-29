import { rootRoute } from "@routes/Root/Root";
import { getSessionQueryOptions } from "@services/auth";
import { Route } from "@tanstack/react-router";

export const protectedRoute = new Route({
  path: "protected",
  component: () => {
    return (
      <div>
        <span>Protected</span>
      </div>
    );
  },
  getParentRoute: () => rootRoute,
  beforeLoad: async ({ navigate, context: { queryClient } }) => {
    const session = await queryClient.ensureQueryData(getSessionQueryOptions());

    if (!session?.user) {
      throw navigate({ to: "/" });
    }
  },
  pendingComponent: () => {
    return <span>Loading Protected</span>;
  },
  errorComponent: (error) => {
    return (
      <div>
        Loading Protected Error
        <pre>{JSON.stringify(error, null, 2)}</pre>
      </div>
    );
  },
});

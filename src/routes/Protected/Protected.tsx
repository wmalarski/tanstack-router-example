import { rootRoute } from "@routes/Root/Root";
import {
  getSessionQueryOptions
} from "@services/auth";
import { queryClient } from "@services/queryClient";
import { Route } from "@tanstack/react-router";

const Protected = () => {
  return (
    <div>
      <span>Protected</span>
    </div>
  );
};

export const protectedRoute = new Route({
  path: "protected",
  component: Protected,
  getParentRoute: () => rootRoute,
  beforeLoad: async ({ navigate }) => {
    const session = await queryClient.ensureQueryData(getSessionQueryOptions());

    if (!session?.user) {
      throw navigate({ to: "/" });
    }
  },
  pendingComponent: () => {
    return <span>Loading Protected</span>;
  },
});

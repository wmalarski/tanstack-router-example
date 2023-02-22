import { rootRoute } from "@routes/Root/Root";
import { router } from "@routes/Router";
import { getSessionKey, getSessionQuery } from "@services/auth";
import { queryClient } from "@services/queryClient";
import { Session } from "@services/types";
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
  beforeLoad: async () => {
    const session =
      queryClient.getQueryData<Session>(getSessionKey()) ??
      (await queryClient.fetchQuery(getSessionKey(), getSessionQuery));

    if (!session?.user) {
      throw router.navigate({ to: "/" });
    }
  },
  pendingComponent: () => {
    return <span>Loading Protected</span>;
  },
});

import { router } from "@routes/Router";
import { getSession, getSessionKey, Session } from "@services/auth";
import { queryClient } from "@services/queryClient";
import { createRouteConfig } from "@tanstack/react-router";

const Protected = () => {
  return (
    <div>
      <span>Protected</span>
    </div>
  );
};

export const protectedRoute = createRouteConfig().createRoute({
  path: "protected",
  component: Protected,
  beforeLoad: async ({ context }) => {
    const session =
      queryClient.getQueryData<Session>(getSessionKey()) ??
      (await queryClient.fetchQuery(getSessionKey(), getSession));

    if (!session?.user) {
      throw router.navigate({ to: "/" });
    }
  },
  loader: async ({}) => {
    return {};
  },
  pendingComponent: () => {
    return <span>Loading Protected</span>;
  },
});

import { router } from "@routes/Router";
import { getSessionKey, Session } from "@services/auth";
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
  beforeLoad: () => {
    const session = queryClient.getQueryData<Session>(getSessionKey());

    if (!session?.user) {
      throw router.navigate({ to: "/" });
    }
  },
});

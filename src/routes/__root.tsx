import { Outlet, RootRoute } from "@tanstack/react-router";

export const rootRoute = new RootRoute({
  component: () => {
    return (
      <div>
        Root Route
        <Outlet />
      </div>
    );
  },
});

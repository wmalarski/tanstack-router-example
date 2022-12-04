import { createRouteConfig, Link, Outlet } from "@tanstack/react-router";

const MainLayout = () => {
  return (
    <div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/random">Random</Link>
      </nav>
      <Outlet />
    </div>
  );
};

export const layoutRoute = createRouteConfig().createRoute({
  id: "layout",
  component: MainLayout,
});

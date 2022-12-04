import { useSessionContext } from "@contexts/SessionContext";
import { createRouteConfig, Link, Outlet } from "@tanstack/react-router";

const MainLayout = () => {
  const session = useSessionContext();
  return (
    <div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/random">Random</Link>
      </nav>
      <span>{session.status}</span>
      <Outlet />
    </div>
  );
};

export const layoutRoute = createRouteConfig().createRoute({
  id: "layout",
  component: MainLayout,
});

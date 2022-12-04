import { useSessionContext } from "@contexts/SessionContext";
import { createRouteConfig, Link, Outlet } from "@tanstack/react-router";
import { SignOutButton } from "./SignOutButton/SignOutButton";

const MainLayout = () => {
  const session = useSessionContext();

  return (
    <div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/random">Random</Link>
        <Link to="/signIn">Sign In</Link>
      </nav>
      <span>{session.status}</span>
      {session.status === "authorized" ? <SignOutButton /> : null}
      <Outlet />
    </div>
  );
};

export const layoutRoute = createRouteConfig().createRoute({
  id: "layout",
  component: MainLayout,
});

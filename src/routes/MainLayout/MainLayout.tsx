import { useSessionContext } from "@contexts/SessionContext";
import { rootRoute } from "@routes/__root";
import { Link, Outlet, Route } from "@tanstack/react-router";
import { SignOutButton } from "./SignOutButton/SignOutButton";

const MainLayout = () => {
  const session = useSessionContext();

  return (
    <div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/random">Random</Link>
        <Link to="/signIn">Sign In</Link>
        <Link to="/protected">Protected</Link>
      </nav>
      <span>{session.status}</span>
      {session.status === "authorized" ? <SignOutButton /> : null}
      {session.status !== "loading" ? <Outlet /> : null}
    </div>
  );
};

export const layoutRoute = new Route({
  id: "layout",
  getParentRoute: () => rootRoute,
  component: MainLayout,
  pendingComponent: () => {
    return <span>Loading Main Layout</span>;
  },
});

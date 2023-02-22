import { useSessionContext } from "@contexts/SessionContext";
import { Link, Outlet, RootRoute } from "@tanstack/react-router";
import { SignOutButton } from "./SignOutButton/SignOutButton";

const Root = () => {
  const session = useSessionContext();

  return (
    <div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/random">Random</Link>
        <Link to="/signIn">Sign In</Link>
        <Link to="/protected">Protected</Link>
      </nav>
      Root Route
      {session.status === "authorized" ? <SignOutButton /> : null}
      <Outlet />
    </div>
  );
};

export const rootRoute = new RootRoute({
  component: Root,
});

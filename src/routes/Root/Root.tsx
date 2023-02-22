import { getSession } from "@services/auth";
import { Loader, useLoader } from "@tanstack/react-loaders";
import { Link, Outlet, RootRoute } from "@tanstack/react-router";
import { SignOutButton } from "./SignOutButton/SignOutButton";

const Root = () => {
  const [session] = useLoader({ key: sessionLoader.key });

  return (
    <div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/random">Random</Link>
        <Link to="/signIn">Sign In</Link>
        <Link to="/protected">Protected</Link>
      </nav>
      Root Route
      {session.status === "success" ? <SignOutButton /> : null}
      <Outlet />
    </div>
  );
};

export const sessionLoader = new Loader({
  key: "session",
  loader: () => {
    return getSession();
  },
});

export const rootRoute = new RootRoute({
  component: Root,
});

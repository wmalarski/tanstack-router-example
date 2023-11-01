import { Link, Outlet, RootRoute, useLoader } from "@tanstack/react-router";
import { SignOutButton } from "./SignOutButton/SignOutButton";

const Root = () => {
  const session = useLoader({ from: "/" });

  console.log({ session });

  return (
    <div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/random">Random</Link>
        <Link to="/signIn">Sign In</Link>
        <Link to="/protected">Protected</Link>
      </nav>
      Root Route
      <SignOutButton />
      <Outlet />
    </div>
  );
};

export const rootRoute = new RootRoute({
  component: Root,
});

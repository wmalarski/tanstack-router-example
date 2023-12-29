import { getSessionQueryOptions } from "@services/auth";
import { QueryClient, useQuery } from "@tanstack/react-query";
import { Link, Outlet, rootRouteWithContext } from "@tanstack/react-router";
import { SignOutButton } from "./SignOutButton/SignOutButton";

export const rootRoute = rootRouteWithContext<{ queryClient: QueryClient }>()({
  component: () => {
    const session = useQuery(getSessionQueryOptions());
  
    return (
      <div>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/random">Random</Link>
          <Link to="/signIn">Sign In</Link>
          <Link to="/protected">Protected</Link>
        </nav>
        Root Route
        {session.data ? <SignOutButton /> : null}
        <Outlet />
      </div>
    );
  },
  errorComponent: (error) => {
    return (
      <div>
        Loading Root Error
        <pre>{JSON.stringify(error, null, 2)}</pre>
      </div>
    );
  },
  pendingComponent: () => {
    return <span>Loading Root</span>;
  },
});

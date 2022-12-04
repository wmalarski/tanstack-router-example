import { Link, Outlet } from "@tanstack/react-router";

export const MainLayout = () => {
  return (
    <div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/random">Random</Link>
        <Link to="/beers/$id" params={{ id: 1 }}>
          Random
        </Link>
      </nav>
      <Outlet />
    </div>
  );
};

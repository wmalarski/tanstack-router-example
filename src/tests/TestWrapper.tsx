import {
  Outlet,
  RootRoute,
  Router,
  routerContext,
} from "@tanstack/react-router";
import { ReactNode } from "react";

const Root = () => {
  return <Outlet />;
};

const rootRoute = new RootRoute({
  component: Root,
});

const routeTree = rootRoute.addChildren([]);
const router = new Router({ routeTree });

type TestWrapperProps = {
  children: ReactNode;
};

export const TestWrapper = ({ children }: TestWrapperProps) => {
  return (
    <routerContext.Provider value={router}>{children}</routerContext.Provider>
  );
};

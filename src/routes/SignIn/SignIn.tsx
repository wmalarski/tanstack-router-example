import { createRouteConfig } from "@tanstack/react-router";

const SignIn = () => {
  return (
    <div>
      <span>SignIn</span>
    </div>
  );
};

export const signInRoute = createRouteConfig().createRoute({
  path: "signIn",
  component: SignIn,
});

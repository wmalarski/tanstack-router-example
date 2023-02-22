import { rootRoute, sessionLoader } from "@routes/Root/Root";
import { router } from "@routes/Router";
import { signIn, SignInArgs } from "@services/auth";
import { Action, useAction } from "@tanstack/react-actions";
import { Route } from "@tanstack/react-router";

const SignIn = () => {
  const { submit } = useAction(signInAction);

  return (
    <div>
      <span>SignIn</span>
      <button
        onClick={() =>
          submit({
            email: "email",
            password: "password",
          })
        }
      >
        Sign In
      </button>
    </div>
  );
};

const signInAction = new Action({
  key: "signIn",
  action: (args: SignInArgs) => {
    return signIn(args);
  },
  onEachSuccess: () => {
    sessionLoader.invalidate();

    router.navigate({ to: "/protected" });
  },
});

export const signInRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "signIn",
  component: SignIn,
  beforeLoad: async () => {
    const session = await sessionLoader.load();

    if (session?.user) {
      throw router.navigate({ to: "/" });
    }
  },
  pendingComponent: () => {
    return <span>Loading Sign In Pending</span>;
  },
});

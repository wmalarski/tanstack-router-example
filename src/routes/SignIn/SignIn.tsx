import { rootRoute } from "@routes/Root/Root";
import { router } from "@routes/Router";
import { loaderClient } from "@routes/loaderClient";
import { SignInArgs, signIn } from "@services/auth";
import { Action } from "@tanstack/actions";
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
  fn: (args: SignInArgs) => {
    return signIn(args);
  },
  onEachSuccess: () => {
    loaderClient.invalidateLoader({ key: "session" });

    router.navigate({ to: "/protected" });
  },
});

export const signInRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "signIn",
  component: SignIn,
  beforeLoad: async ({ abortController }) => {
    const session = await loaderClient.fetch({
      key: "session",
      signal: abortController.signal,
    });

    if (session?.user) {
      throw router.navigate({ to: "/" });
    }
  },
  pendingComponent: () => {
    return <span>Loading Sign In Pending</span>;
  },
});

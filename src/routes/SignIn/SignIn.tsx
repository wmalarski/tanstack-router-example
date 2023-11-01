import { rootRoute } from "@routes/Root/Root";
import { router } from "@routes/Router";
import { loaderClient } from "@routes/loaderClient";
import { signIn } from "@services/auth";
import { useMutation } from "@tanstack/react-query";
import { Route } from "@tanstack/react-router";

const SignIn = () => {
  const mutation = useMutation({
    mutationFn: signIn,
    onSuccess: async () => {
      await loaderClient.invalidateLoader({ key: "session" });

      await router.navigate({ to: "/protected" });
    },
  });

  const onClick = () => {
    mutation.mutate({
      email: "email",
      password: "password",
    });
  };

  return (
    <div>
      <span>SignIn</span>
      <button onClick={onClick}>Sign In</button>
    </div>
  );
};

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

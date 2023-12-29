import { rootRoute } from "@routes/Root/Root";
import { getSessionQueryOptions, signIn } from "@services/auth";
import { queryClient } from "@services/queryClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Route, useRouter } from "@tanstack/react-router";

const SignIn = () => {
  const queryClient = useQueryClient();

  const router = useRouter();

  const mutation = useMutation({
    mutationFn: signIn,
    onSuccess: async () => {
      const { queryKey } = getSessionQueryOptions();
      await queryClient.invalidateQueries({ queryKey });

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
  beforeLoad: async ({ navigate }) => {
    const session = await queryClient.ensureQueryData(getSessionQueryOptions());

    if (session?.user) {
      throw navigate({ to: "/" });
    }
  },
  pendingComponent: () => {
    return <span>Loading Sign In Pending</span>;
  },
  errorComponent: () => {
    return <span>Loading Sign In Error</span>;
  },
});

import { useAnonService } from "@contexts/SessionContext";
import { router } from "@routes/Router";
import { getSessionKey, Session } from "@services/auth";
import { queryClient } from "@services/queryClient";
import { useMutation } from "@tanstack/react-query";
import { createRouteConfig, useRouter } from "@tanstack/react-router";

const SignIn = () => {
  const router = useRouter();
  const anonService = useAnonService();

  const { mutate } = useMutation(anonService.signIn, {
    onSuccess: () => {
      router.navigate({ to: "/protected" });
    },
  });

  return (
    <div>
      <span>SignIn</span>
      <button onClick={() => mutate({ email: "email", password: "password" })}>
        Sign In
      </button>
    </div>
  );
};

export const signInRoute = createRouteConfig().createRoute({
  path: "signIn",
  component: SignIn,
  beforeLoad: () => {
    const session = queryClient.getQueryData<Session>(getSessionKey());

    if (session?.user) {
      throw router.navigate({ to: "/" });
    }
  },
  pendingComponent: () => {
    return <span>Loading Sign In Pending</span>;
  },
});

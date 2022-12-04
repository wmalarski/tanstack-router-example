import { useAnonService } from "@contexts/SessionContext";
import { router } from "@routes/Router";
import { useMutation } from "@tanstack/react-query";
import { createRouteConfig, useRouter } from "@tanstack/react-router";

const SignIn = () => {
  const router = useRouter();
  const anonService = useAnonService();

  const { mutate } = useMutation(anonService.signIn, {
    onSuccess: () => {
      router.navigate({ to: "/" });
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
  action: (...args) => {
    console.log(args);
  },
  beforeLoad: ({ context }) => {
    if (context.session.status !== "unauthorized") {
      throw router.navigate({ to: "/" });
    }
  },
});

import { router } from "@routes/Router";
import { loaderClient } from "@routes/loaderClient";
import { signOut } from "@services/auth";
import { useMutation } from "@tanstack/react-query";

export const SignOutButton = () => {
  const mutation = useMutation({
    mutationFn: signOut,
    onSuccess: async () => {
      await loaderClient.invalidateLoader({ key: "session" });

      await router.navigate({ to: "/" });
    },
  });

  const onClick = () => {
    mutation.mutate();
  };

  return <button onClick={onClick}>Sign Out</button>;
};

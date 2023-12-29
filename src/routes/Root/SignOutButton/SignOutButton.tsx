import { getSessionQueryOptions, signOut } from "@services/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";

export const SignOutButton = () => {
  const router = useRouter();

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: signOut,
    onSuccess: async () => {
      const { queryKey } = getSessionQueryOptions();
      await queryClient.invalidateQueries({ queryKey });

      await router.navigate({ to: "/" });
    },
  });

  const onClick = () => {
    mutation.mutate();
  };

  return <button onClick={onClick}>Sign Out</button>;
};

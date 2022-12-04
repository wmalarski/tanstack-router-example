import { useAuthService } from "@contexts/SessionContext";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";

export const SignOutButton = () => {
  const router = useRouter();
  const authService = useAuthService();

  const { mutate } = useMutation(authService.signOut, {
    onSuccess: () => {
      router.navigate({ to: "/" });
    },
  });

  return (
    <button
      onClick={() => {
        mutate();
      }}
    >
      Sign Out
    </button>
  );
};

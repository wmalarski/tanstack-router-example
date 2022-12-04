import { useAuthService } from "@contexts/SessionContext";
import { useMutation } from "@tanstack/react-query";

export const SignOutButton = () => {
  const authService = useAuthService();

  const { mutate } = useMutation(authService.signOut);

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

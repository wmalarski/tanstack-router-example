import { router } from "@routes/Router";
import { signOut } from "@services/auth";
import { Action, useAction } from "@tanstack/react-actions";
import { sessionLoader } from "../Root";

export const SignOutButton = () => {
  const { submit } = useAction(signOutAction);

  return (
    <button
      onClick={() => {
        submit();
      }}
    >
      Sign Out
    </button>
  );
};

const signOutAction = new Action({
  key: "signOut",
  action: () => {
    return signOut();
  },
  onEachSuccess: () => {
    sessionLoader.invalidate();

    router.navigate({ to: "/" });
  },
});

import { router } from "@routes/Router";
import { signOut } from "@services/auth";
import { Action, useAction } from "@tanstack/actions";
import { sessionLoader } from "../Root";

export const SignOutButton = () => {
  const { submit } = useAction(signOutAction);

  const onClick = () => {
    submit();
  };

  return <button onClick={onClick}>Sign Out</button>;
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

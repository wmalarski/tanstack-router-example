import { queryOptions } from "@tanstack/react-query";
import { Session } from "./types";

const delay = 2000;
const localStorageKey = "auth_client";

type SignInArgs = {
  email: string;
  password: string;
};

export const signIn = (args: SignInArgs): Promise<Session> => {
  return new Promise((resolve) =>
    setTimeout(() => {
      localStorage.setItem(localStorageKey, JSON.stringify(args.email));
      resolve({ user: { email: args.email } });
    }, delay),
  );
};

export const getSession = (): Promise<Session | null> => {
  return new Promise((resolve) =>
    setTimeout(() => {
      const email = localStorage.getItem(localStorageKey);
      resolve(email ? { user: { email } } : null);
    }, delay),
  );
};

export const signOut = () => {
  return new Promise((resolve) =>
    setTimeout(() => {
      localStorage.removeItem(localStorageKey);
      resolve(void 0);
    }, delay),
  );
};

export const getSessionQueryOptions = () => {
  return queryOptions({
    queryKey: ["getSession"],
    queryFn: () => {
      return getSession();
    },
  });
};

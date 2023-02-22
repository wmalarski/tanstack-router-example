import type { QueryFunction } from "@tanstack/react-query";
import { Session } from "./types";

const delay = 2000;
const localStorageKey = "auth_client";

export type SignInArgs = {
  email: string;
  password: string;
};

export const signIn = (args: SignInArgs): Promise<Session> => {
  localStorage.setItem(localStorageKey, JSON.stringify(args.email));
  return new Promise((resolve) =>
    setTimeout(() => resolve({ user: { email: args.email } }), delay)
  );
};

export const getSession = async (): Promise<Session | null> => {
  const email = localStorage.getItem(localStorageKey);
  return new Promise((resolve) =>
    setTimeout(() => resolve(email ? { user: { email } } : null), delay)
  );
};

export const getSessionKey = () => {
  return ["getSession"];
};

export const getSessionQuery: QueryFunction<
  Session | null,
  ReturnType<typeof getSessionKey>
> = async () => {
  return getSession();
};

export const signOut = async () => {
  localStorage.removeItem(localStorageKey);
  return new Promise((resolve) => setTimeout(() => resolve(void 0), delay));
};

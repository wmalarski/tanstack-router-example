import type { QueryFunction } from "@tanstack/react-query";

const delay = 2000;
const localStorageKey = "auth_client";

export type Session = {
  email: string;
};

type SignIn = {
  email: string;
  password: string;
};

export const signIn = (args: SignIn) => {
  localStorage.setItem(localStorageKey, JSON.stringify(args.email));
  return new Promise((resolve) => setTimeout(() => resolve(void 0), delay));
};

type GetSessionKey = ["getSession"];

export const getSessionKey = (): GetSessionKey => {
  return ["getSession"];
};

export const getSession: QueryFunction<
  Session | undefined,
  GetSessionKey
> = async () => {
  const email = localStorage.getItem(localStorageKey);
  return new Promise((resolve) =>
    setTimeout(() => resolve(email ? { email } : undefined), delay)
  );
};

export const signOut = async () => {
  localStorage.removeItem(localStorageKey);
  return new Promise((resolve) => setTimeout(() => resolve(void 0), delay));
};

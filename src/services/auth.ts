import type { QueryFunction } from "@tanstack/react-query";

const delay = 2000;
const localStorageKey = "auth_client";

export type Session = {
  email: string;
};

export type AuthError = {
  message: string;
};

export type SignIn = {
  email: string;
  password: string;
};

export const signIn = (args: SignIn): Promise<Session> => {
  localStorage.setItem(localStorageKey, JSON.stringify(args.email));
  return new Promise((resolve) =>
    setTimeout(() => resolve({ email: args.email }), delay)
  );
};

type GetSessionKey = ["getSession"];

export const getSessionKey = (): GetSessionKey => {
  return ["getSession"];
};

export const getSession: QueryFunction<
  Session | AuthError,
  GetSessionKey
> = async () => {
  const email = localStorage.getItem(localStorageKey);
  return new Promise((resolve) =>
    setTimeout(() => resolve(email ? { email } : { message: "404" }), delay)
  );
};

export const signOut = async () => {
  localStorage.removeItem(localStorageKey);
  return new Promise((resolve) => setTimeout(() => resolve(void 0), delay));
};

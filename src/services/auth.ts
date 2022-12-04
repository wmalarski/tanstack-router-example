import type { QueryFunction } from "@tanstack/react-query";

const delay = 2000;
const localStorageKey = "auth_client";

export type User = {
  email: string;
};

export type Session = {
  user?: User;
};

export type SignIn = {
  email: string;
  password: string;
};

export const signIn = (args: SignIn): Promise<Session> => {
  localStorage.setItem(localStorageKey, JSON.stringify(args.email));
  return new Promise((resolve) =>
    setTimeout(() => resolve({ user: { email: args.email } }), delay)
  );
};

type GetSessionKey = ["getSession"];

export const getSessionKey = (): GetSessionKey => {
  return ["getSession"];
};

export const getSession: QueryFunction<Session, GetSessionKey> = async () => {
  const email = localStorage.getItem(localStorageKey);
  return new Promise((resolve) =>
    setTimeout(() => resolve(email ? { user: { email } } : {}), delay)
  );
};

export const signOut = async () => {
  localStorage.removeItem(localStorageKey);
  return new Promise((resolve) => setTimeout(() => resolve(void 0), delay));
};

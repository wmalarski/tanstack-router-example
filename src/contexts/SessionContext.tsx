import {
  getSession,
  getSessionKey,
  Session,
  signIn,
  SignIn,
  signOut,
} from "@services/auth";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { createContext, ReactNode, useContext, useMemo } from "react";

type AuthorizedService = {
  session: Session;
  signOut: () => Promise<void>;
};

type UnauthorizedService = {
  signIn: (args: SignIn) => Promise<void>;
};

export type SessionContextValue =
  | {
      status: "loading";
    }
  | {
      status: "authorized";
      service: AuthorizedService;
    }
  | {
      status: "unauthorized";
      service: UnauthorizedService;
    };

const SessionContext = createContext<SessionContextValue>({
  status: "loading",
});

type Props = {
  children: ReactNode;
};

export const useSessionStatus = (): SessionContextValue["status"] => {
  return useContext(SessionContext)["status"];
};

export const useSessionContext = (): SessionContextValue => {
  return useContext(SessionContext);
};

export const useAuthService = (): AuthorizedService => {
  const context = useContext(SessionContext);

  if (context.status !== "authorized") {
    throw new Error("AuthService not defined");
  }

  return context.service;
};

export const useAnonService = (): UnauthorizedService => {
  const context = useContext(SessionContext);

  if (context.status !== "unauthorized") {
    throw new Error("AnonService not defined");
  }

  return context.service;
};

export const SessionContextProvider = ({ children }: Props) => {
  const queryClient = useQueryClient();

  const { data } = useQuery(getSessionKey(), getSession, {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const value = useMemo<SessionContextValue>(() => {
    if (!data) {
      return { status: "loading" };
    }

    if ("email" in data) {
      return {
        status: "authorized",
        service: {
          session: data,
          signOut: async () => {
            await signOut();
            queryClient.setQueryData(getSessionKey(), { message: "404" });
          },
        },
      };
    }
    return {
      status: "unauthorized",
      service: {
        signIn: async (args) => {
          const session = await signIn(args);
          queryClient.setQueryData(getSessionKey(), session);
        },
      },
    };
  }, [data]);

  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  );
};

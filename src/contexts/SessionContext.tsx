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

type SessionContextState =
  | {
      status: "authorized";
      session: Session;
    }
  | {
      status: "unauthorized";
    };

type AuthorizedService = {
  session: Session;
  signOut: () => void;
};

type UnauthorizedService = {
  signIn: (args: SignIn) => void;
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

  const { data } = useQuery<SessionContextState>(
    getSessionKey(),
    async () => {
      const session = await getSession();
      return session
        ? { status: "authorized", session }
        : { status: "unauthorized" };
    },
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    }
  );

  const value = useMemo<SessionContextValue>(() => {
    console.log("useMemo", data);
    switch (data?.status) {
      case "authorized": {
        return {
          status: "authorized",
          service: {
            session: data.session,
            signOut: async () => {
              await signOut();
              queryClient.setQueryData(getSessionKey(), {
                status: "unauthorized",
              });
            },
          },
        };
      }
      case "unauthorized": {
        return {
          status: "unauthorized",
          service: {
            signIn: async (args) => {
              const session = await signIn(args);
              queryClient.setQueryData(getSessionKey(), {
                status: "authorized",
                session,
              });
            },
          },
        };
      }
      default: {
        return { status: "loading" };
      }
    }
  }, [data]);

  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  );
};

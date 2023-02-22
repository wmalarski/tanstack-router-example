import { queryClient } from "@services/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ReactElement } from "react";
import { Router } from "./routes/Router";

export const App = (): ReactElement => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <ReactQueryDevtools
        position="bottom-right"
        toggleButtonProps={{
          style: {
            marginRight: "3.5rem",
            transform: `scale(.7)`,
            transformOrigin: "bottom left",
          },
        }}
      />
    </QueryClientProvider>
  );
};

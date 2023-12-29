import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";
import { AppRouter } from "./routes/Router";

export const App = () => {
  const [queryClient] = useState(() => new QueryClient()); 

  return (
    <QueryClientProvider client={queryClient}>
      <AppRouter />
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
};

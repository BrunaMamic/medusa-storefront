import { QueryClient } from "@tanstack/react-query";
import { MedusaProvider } from "medusa-react";
import '../app/globals.css';
const queryClient = new QueryClient();

export default function MyApp({ Component, pageProps }: any) {
  return (
    <MedusaProvider
      queryClientProviderProps={{ client: queryClient }}
      baseUrl="http://localhost:9000">
      <Component {...pageProps} />
    </MedusaProvider>
  );
}

import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import { appWithTranslation } from "next-i18next";

import "../styles/globals.scss";
import { MenuComponent } from "../src/components/MenuComponent/MenuComponent";
import PageHeaderComponent from "../src/components/PageHeaderComponent/PageHeaderComponent";
import { Footer } from "../src/components/FooterComponent/FooterComponent";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <PageHeaderComponent title="game-title" />
      <MenuComponent />
      <Component {...pageProps} />
      <Footer />
    </QueryClientProvider>
  );
}

export default appWithTranslation(MyApp);

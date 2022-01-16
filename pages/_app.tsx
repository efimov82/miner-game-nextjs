import { appWithTranslation } from "next-i18next";
import type { AppProps } from "next/app";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import AppContext from "../src/AppContext";
import { Footer } from "../src/components/FooterComponent/FooterComponent";
import { MenuComponent } from "../src/components/MenuComponent/MenuComponent";
import PageHeaderComponent from "../src/components/PageHeaderComponent/PageHeaderComponent";
import "../styles/globals.scss";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  const [soundMute, setSoundMute] = useState(false);

  return (
    <AppContext.Provider
      value={{
        state: {
          soundMute,
        },
        setSoundMute,
      }}
    >
      <QueryClientProvider client={queryClient}>
        <PageHeaderComponent title="game-title" />
        <MenuComponent />
        <Component {...pageProps} />
        <Footer />
      </QueryClientProvider>
    </AppContext.Provider>
  );
}

export default appWithTranslation(MyApp);

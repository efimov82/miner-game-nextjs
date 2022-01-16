import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import { appWithTranslation } from "next-i18next";

import "../styles/globals.scss";
import { MenuComponent } from "../src/components/MenuComponent/MenuComponent";
import PageHeaderComponent from "../src/components/PageHeaderComponent/PageHeaderComponent";
import { Footer } from "../src/components/FooterComponent/FooterComponent";
// import ConfigProvider from "../src/components/ConfigProvider/ConfigProvider";
import { useState } from "react";
import AppContext from "../src/AppContext";

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

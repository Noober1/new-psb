import "../styles/globals.css";
import type { AppProps } from "next/app";
import { NextPage } from "next";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { ReactElement, ReactNode } from "react";
import wrapper from "../lib/redux";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { useSelector } from "react-redux";
import { selectConfig } from "../lib/redux/slices/config";
import { dark, light } from "../lib/theme";

const queryClient = new QueryClient();

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const NgulixApp = ({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout = Component.getLayout ?? ((page) => page);
  const config = useSelector(selectConfig);

  return (
    // react query provider
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={config.theme == "light" ? light : dark}>
        {/* MUI CSS Baseline */}
        <CssBaseline />
        {/* react query devtool */}
        <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
        {/* component */}
        {getLayout(<Component {...pageProps} />)}
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default wrapper.withRedux(NgulixApp);

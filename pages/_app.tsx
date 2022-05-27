import "../styles/globals.css";
import type { AppProps } from "next/app";
import { NextPage } from "next";
import { SessionProvider } from "next-auth/react";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { ReactElement, ReactNode } from "react";
import wrapper from "../lib/redux";
import { Alert, CssBaseline, Snackbar, ThemeProvider } from "@mui/material";
import { useSelector } from "react-redux";
import { selectConfig } from "../lib/redux/slices/config";
import { dark, light } from "../lib/theme";
import AuthBoxPopup from "../components/layouts/AuthBoxPopup";
import { selectNoPersistConfig } from "../lib/redux/slices/noPersistConfig";
import useSnackbar from "../components/hooks/useSnackbar";
import UserDataProvider from "../components/atoms/UserDataProvider";

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
  const { snackbar } = useSelector(selectNoPersistConfig);
  const [, closeSnackbar] = useSnackbar({});

  return (
    // react query provider
    <SessionProvider session={pageProps.session} refetchInterval={10}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={config.theme == "light" ? light : dark}>
          <UserDataProvider>
            <>
              {/* MUI CSS Baseline */}
              <CssBaseline />
              {/* react query devtool */}
              <ReactQueryDevtools
                initialIsOpen={false}
                position="bottom-right"
              />
              {/* component */}
              {getLayout(<Component {...pageProps} />)}
              <AuthBoxPopup />
              <Snackbar
                autoHideDuration={5000}
                open={snackbar.open}
                onClose={closeSnackbar}
                anchorOrigin={{
                  horizontal: snackbar.positionX,
                  vertical: snackbar.positionY,
                }}
              >
                <Alert severity={snackbar.severity} variant="filled">
                  {snackbar.message}
                </Alert>
              </Snackbar>
            </>
          </UserDataProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
};

export default wrapper.withRedux(NgulixApp);

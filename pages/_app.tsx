import "../styles/globals.css";
import type { AppProps } from "next/app";
import { NextPage } from "next";
import { SessionProvider } from "next-auth/react";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { ReactElement, ReactNode } from "react";
import wrapper from "../lib/redux";
import {
  CssBaseline,
  IconButton,
  Snackbar,
  ThemeProvider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector } from "react-redux";
import { selectConfig } from "../lib/redux/slices/config";
import { dark, light, colorPalette } from "../lib/theme";
import AuthBoxPopup from "../components/layouts/AuthBoxPopup";
import { selectNoPersistConfig } from "../lib/redux/slices/noPersistConfig";
import useSnackbar from "../components/hooks/useSnackbar";
import UserDataProvider from "../components/atoms/UserDataProvider";
import NextNProgress from "nextjs-progressbar";
import useLoadingScreen from "../components/hooks/useLoadingScreen";
import PageLoading from "../components/organisms/PageLoading";

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
  const { handleCloseSnackbar } = useSnackbar();
  const isDarkMode = config.theme == "light";

  return (
    // Next js session provider
    <SessionProvider session={pageProps.session} refetchInterval={10}>
      {/* react query provider */}
      <QueryClientProvider client={queryClient}>
        {/* MUI theme provider */}
        <ThemeProvider theme={isDarkMode ? light : dark}>
          {/* User data provider */}
          <UserDataProvider>
            <>
              {/* MUI CSS Baseline */}
              <CssBaseline enableColorScheme />
              {/* Progresbar */}
              <NextNProgress
                color={colorPalette[isDarkMode ? "light" : "dark"].secondary}
              />
              {/* react query devtool */}
              <ReactQueryDevtools
                initialIsOpen={false}
                position="bottom-left"
              />
              {/* component */}
              {getLayout(<Component {...pageProps} />)}
              {/* Login Popup */}
              <AuthBoxPopup />
              {/* Main snackbar */}
              <Snackbar
                anchorOrigin={{
                  horizontal: snackbar.positionX,
                  vertical: snackbar.positionY,
                }}
                action={
                  <IconButton
                    onClick={() => handleCloseSnackbar()}
                    color="inherit"
                  >
                    <CloseIcon />
                  </IconButton>
                }
                open={snackbar.open}
                autoHideDuration={5000}
                onClose={() => handleCloseSnackbar()}
                message={snackbar.message}
              />
              {/* page loading screen */}
              <PageLoading />
            </>
          </UserDataProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
};

export default wrapper.withRedux(NgulixApp);

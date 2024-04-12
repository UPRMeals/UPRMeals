import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useState, type ReactElement, type ReactNode, useEffect } from "react";
import type { NextPage } from "next";
import { ThemeProvider } from "@mui/material/styles";
import theme from "@/styles/theme";
import CssBaseline from "@mui/material/CssBaseline";
import Navbar from "../shared/components/navbar";
import { JWTUtils } from "@/shared/utils/jwtUtils";
import { useRouter } from "next/router";
import { Toaster } from "react-hot-toast";
import ErrorProvider from "@/shared/providers/ErrorProvider";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const noNavBarPaths = ["/"];
const unAuthenticatedPaths = [
  "/",
  "/customers",
  "/customers/menu",
  "/customers/auth/login",
  "/customers/auth/signup",
];

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const [hasNavbar, setHasNavbar] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const getLayout = Component.getLayout ?? ((page) => page);

  const isTokenValid = JWTUtils.isTokenValid;
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      const valid = isTokenValid(token);
      if (
        !valid &&
        !unAuthenticatedPaths.includes(window?.location?.pathname ?? "")
      ) {
        router.push(
          `/customers/auth/login?redirect=${window?.location?.pathname ?? ""}`
        );
      }
      setIsAuthenticated(valid);
    };
    checkAuth();
  }, [isTokenValid, router]);

  useEffect(() => {
    setHasNavbar(!noNavBarPaths.includes(window?.location?.pathname ?? ""));
  });

  return getLayout(
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {hasNavbar && <Navbar authenticated={isAuthenticated} />}
      <ErrorProvider>
        <Component {...pageProps} />
      </ErrorProvider>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            padding: "12px",
          },
        }}
      />
    </ThemeProvider>
  );
}

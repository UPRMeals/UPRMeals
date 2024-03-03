import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useState, type ReactElement, type ReactNode, useEffect } from "react";
import type { NextPage } from "next";
import { ThemeProvider } from "@mui/material/styles";
import theme from "@/styles/theme";
import CssBaseline from "@mui/material/CssBaseline";
import Navbar from "./customers/components/navbar";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const noNavBarPaths = ["/"];

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const [hasNavbar, setHasNavbar] = useState<boolean>(false);
  const getLayout = Component.getLayout ?? ((page) => page);

  useEffect(() => {
    setHasNavbar(!noNavBarPaths.includes(window?.location?.pathname ?? ""));
  });

  return getLayout(
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {hasNavbar && <Navbar />}
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

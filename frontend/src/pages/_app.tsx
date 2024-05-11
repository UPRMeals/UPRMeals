import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useState, type ReactElement, type ReactNode, useEffect } from "react";
import type { NextPage } from "next";
import { ThemeProvider } from "@mui/material/styles";
import theme from "@/styles/theme";
import CssBaseline from "@mui/material/CssBaseline";
import Navbar from "../shared/components/navbar";
import { JWTUtils } from "../shared/utils/jwtUtils";
import { useRouter } from "next/router";
import { Toaster } from "react-hot-toast";
import CartProvider from "@/shared/providers/CartProvider";
import ErrorProvider from "../shared/providers/ErrorProvider";
import { useUserService } from "@/shared/hooks/useUserService";
import { UserProfile } from "../../../backend/src/user/user.dto";
import WarningIcon from "@mui/icons-material/Warning";
import { Alert, Box } from "@mui/material";

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
  "/customers/aboutUs",
];

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const [hasNavbar, setHasNavbar] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const getLayout = Component.getLayout ?? ((page) => page);
  const [user, setUser] = useState<UserProfile>();

  const { getProfile } = useUserService();

  useEffect(() => {
    const getUser = async () => {
      const user = await getProfile();
      setUser(user);
    };

    if (!user && isAuthenticated) {
      getUser();
    }
  }, [getProfile, user, isAuthenticated]);

  const isTokenValid = JWTUtils.isTokenValid;
  const isStaffUser = JWTUtils.isStaffUser;
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
    const checkIsStaff = async () => {
      const token = localStorage.getItem("token");
      const isStaff = isStaffUser(token);
      if (!isStaff && window?.location?.pathname?.includes("staff")) {
        router.push("/customers");
      }
    };
    checkIsStaff();
  }, [isStaffUser, router]);

  useEffect(() => {
    setHasNavbar(!noNavBarPaths.includes(window?.location?.pathname ?? ""));
  });

  return getLayout(
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ErrorProvider>
        <CartProvider>
          {hasNavbar && <Navbar authenticated={isAuthenticated} />}
          {user && user.isFlagged && (
            <Alert
              icon={<WarningIcon fontSize="inherit" />}
              severity="warning"
              sx={{ m: 2, mt: 11 }}
            >
              Your account has been flagged. Please visit the cafeteria to
              resolve this issue. You may resume acitivity upon the cafeteria
              staff member
              {"'"}s discretion.
            </Alert>
          )}
          <Box sx={{ pt: user?.isFlagged ? 0 : 10 }}>
            <Component {...pageProps} />
          </Box>
        </CartProvider>
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

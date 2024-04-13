import { useEffect, useState } from "react";
import {
  AppBar,
  Badge,
  Stack,
  SxProps,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useRouter } from "next/router";
import Link from "next/link";
import { Url } from "next/dist/shared/lib/router/router";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Image from "next/legacy/image";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { grey } from "@mui/material/colors";

// TODO: Implement functionality
export const isFlaggedAccount = true;

type NavItemProps = {
  text: string;
  href: Url;
  requiresAuthentication: boolean;
};

const customerNavBarItems: NavItemProps[] = [
  { text: "Menu", href: "/customers/menu", requiresAuthentication: false },
  { text: "My Cart", href: "/customers/cart", requiresAuthentication: true },
];

const staffNavBarItems: NavItemProps[] = [
  { text: "Menus", href: "/staff/menus", requiresAuthentication: true },
  { text: "Pedidos", href: "/staff/orders", requiresAuthentication: true },
];

const NavLink = ({
  title,
  path,
  currentPath,
  textProps,
}: {
  title: string;
  path: Url;
  currentPath: string;
  textProps?: SxProps;
}) => {
  currentPath = currentPath.split("?")[0];
  const isCurrentPath = path === currentPath;
  return (
    <Link href={path}>
      <Typography
        fontSize={"1.25rem"}
        fontWeight={600}
        color={isCurrentPath ? "text.secondary" : "text.primary"}
        sx={{ ...textProps, textTransform: "uppercase" }}
      >
        {title}
      </Typography>
    </Link>
  );
};

const Navbar = ({ authenticated }: { authenticated: boolean }) => {
  const router = useRouter();
  const currentPath = router.asPath;
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const [isStaffPage, setIsStaffPage] = useState<boolean>(false);
  const theme = useTheme();
  const largerScreen = useMediaQuery(theme.breakpoints.up("md"));
  const navBarItemsToDisplay = isStaffPage
    ? staffNavBarItems
    : customerNavBarItems;

  useEffect(() => {
    setIsStaffPage(window.location.pathname.includes("staff"));
  });

  const handleDrawerToggle = () => {
    setOpenDrawer((prevState) => !prevState);
  };

  const drawer = (
    <Box
      onClick={handleDrawerToggle}
      sx={{ textAlign: "center" }}
      color={"white"}
    >
      <Stack rowGap={2} pt={3}>
        {navBarItemsToDisplay.map((item: NavItemProps, index) =>
          !item.requiresAuthentication ||
          (item.requiresAuthentication && authenticated) ? (
            <Box key={index}>
              <NavLink
                title={item.text}
                path={item.href}
                currentPath={currentPath}
                textProps={{
                  color: "white",
                }}
              />
            </Box>
          ) : null
        )}
        <NavLink
          title={authenticated ? "Profile" : "Log In"}
          path={authenticated ? "/customers/profile" : "/customers/auth/login"}
          currentPath={currentPath}
          textProps={{
            color: "white",
          }}
        />
      </Stack>
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar elevation={0}>
        <Toolbar
          sx={{
            backgroundColor: "background.default",
            justifyContent: "space-between",
            alignItems: "center",
            maxHeight: 75,
          }}
        >
          <Box mt={1}>
            <Link href={isStaffPage ? "/staff" : "/customers"}>
              <Image
                src="/logo.png"
                alt="UPRMeals"
                layout="fixed"
                objectFit="contain"
                height={largerScreen ? 100 : 55}
                width={largerScreen ? 150 : 150}
              />
            </Link>
          </Box>
          <IconButton
            color="primary"
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>

          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            <Stack flexDirection={"row"} columnGap={2} alignItems={"center"}>
              {navBarItemsToDisplay.map((item: NavItemProps, index) =>
                !item.requiresAuthentication ||
                (item.requiresAuthentication && authenticated) ? (
                  <NavLink
                    key={index}
                    title={item.text}
                    path={item.href}
                    currentPath={currentPath}
                  />
                ) : null
              )}

              {authenticated ? (
                <IconButton
                  onClick={() => router.push("/customers/profile")}
                  sx={{ ml: 4 }}
                >
                  {isFlaggedAccount ? (
                    <Badge badgeContent={1} color="error">
                      <AccountCircleIcon
                        fontSize={"large"}
                        sx={{ color: grey[400] }}
                      />
                    </Badge>
                  ) : (
                    <AccountCircleIcon
                      fontSize={"large"}
                      sx={{ color: grey[400] }}
                    />
                  )}
                </IconButton>
              ) : (
                <NavLink
                  title={"Log In"}
                  path={"/customers/auth/login"}
                  currentPath={currentPath}
                />
              )}
            </Stack>
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          open={openDrawer}
          onClose={handleDrawerToggle}
          anchor="right"
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: 300,
              backgroundColor: "text.secondary",
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  );
};

export default Navbar;

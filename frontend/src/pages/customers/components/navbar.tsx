import React from "react";
import {
  AppBar,
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

type NavItemProps = {
  text: string;
  href: Url;
};

const navBarItems: NavItemProps[] = [
  { text: "Menu", href: "/customers/menu" },
  { text: "My Cart", href: "/cart" },
];

const navDrawerItems: NavItemProps[] = [
  { text: "Menu", href: "/customers/menu" },
  { text: "My Cart", href: "/cart" },
  { text: "Profile", href: "/customers/profile" },
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

const Navbar = () => {
  const router = useRouter();
  const currentPath = router.asPath;
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const theme = useTheme();
  const largerScreen = useMediaQuery(theme.breakpoints.up("md"));

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
        {navDrawerItems.map((item, index) => {
          return (
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
          );
        })}
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
            <Link href={"/"}>
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
              {navBarItems.map((item: NavItemProps, index) => (
                <NavLink
                  key={index}
                  title={item.text}
                  path={item.href}
                  currentPath={currentPath}
                />
              ))}

              <IconButton
                onClick={() =>
                  router.push(
                    navDrawerItems.find((item) => item.text === "Profile")
                      ?.href ?? ""
                  )
                }
                sx={{ ml: 4 }}
              >
                <AccountCircleIcon
                  fontSize={"large"}
                  sx={{ color: grey[400] }}
                />
              </IconButton>
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

import React from "react";
import { AppBar, Stack, SxProps, Toolbar, Typography } from "@mui/material";
import { useRouter } from "next/router";
import Link from "next/link";
import { Url } from "next/dist/shared/lib/router/router";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

const drawerWidth = 240;

type NavItemProps = {
  text: string;
  href: Url;
};

const navItems: NavItemProps[] = [
  { text: "Orders", href: "/orders" },
  { text: "Customers", href: "/customers" },
  { text: "Menu", href: "/menu" },
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
        color={isCurrentPath ? "primary" : "secondary"}
        sx={{ ...textProps }}
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
        {navItems.map((item) => {
          return (
            <Box>
              <NavLink
                title={item.text}
                path={item.href}
                currentPath={currentPath}
                textProps={{
                  color: "white",
                  fontWeight: 900,
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
      <AppBar>
        <Toolbar sx={{ backgroundColor: "white" }}>
          <IconButton
            color="primary"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}>
            <Link href={"/"}>
              <Typography variant="h6" color={"primary.main"}>
                UPRMeals
              </Typography>
            </Link>
          </Box>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            <Stack flexDirection={"row"} columnGap={2}>
              {navItems.map((item: NavItemProps) => (
                <NavLink
                  title={item.text}
                  path={item.href}
                  currentPath={currentPath}
                />
              ))}
            </Stack>
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          open={openDrawer}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: "primary.main",
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

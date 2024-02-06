import React from "react";
import { AppBar, Stack, Toolbar, Typography } from "@mui/material";
import { useRouter } from "next/router";
import Link from "next/link";
import { Url } from "next/dist/shared/lib/router/router";

const NavLink = ({
  title,
  path,
  currentPath,
}: {
  title: string;
  path: Url;
  currentPath: string;
}) => {
  const isCurrentPath = path === currentPath;
  return (
    <Link href={path}>
      <Typography color={isCurrentPath ? "secondary" : "primary"}>
        {title}
      </Typography>
    </Link>
  );
};

const Navbar = () => {
  const router = useRouter();
  const currentPath = router.asPath;

  return (
    <AppBar position="static" color="transparent">
      <Toolbar>
        <a href={"/"}>
          <Typography variant="h5">UPRMeals</Typography>
        </a>
        <Stack direction={"row"} spacing={2} ml={2}>
          <NavLink title="Orders" path="/orders" currentPath={currentPath} />
          <NavLink
            title="Customers"
            path="/customers"
            currentPath={currentPath}
          />
          <NavLink title="Menu" path="/menu" currentPath={currentPath} />
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

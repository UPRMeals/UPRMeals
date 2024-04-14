import CustomerMenu from "@/modules/customers/components/menu/CustomerMenu";
import { useMenuService } from "@/shared/hooks/useMenuService";
import {
  Box,
  Button,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Menu } from "../../../../../backend/src/menu/menu.dto";
import { useRouter } from "next/router";
import { NextPageWithLayout } from "@/pages/_app";
import { getCartLayout } from "@/shared/providers/CartProvider";

const MenuPage: NextPageWithLayout = () => {
  const router = useRouter();
  const { getActiveMenu } = useMenuService();
  const [activeMenu, setActiveMenu] = useState<Menu>();

  useEffect(() => {
    const fetchMenu = async () => {
      const menu = await getActiveMenu();
      setActiveMenu(menu);
    };
    if (!activeMenu) fetchMenu();
  }, [getActiveMenu]);

  return (
    <Box
      mt={10}
      mb={{ xs: 400, md: 135 }}
      height={"90vh"}
      width={"100vw"}
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      justifyContent={"start"}
    >
      {!activeMenu ? (
        <Box alignContent={"center"} justifyItems={"center"} height={"100%"}>
          <CircularProgress size={80} />
        </Box>
      ) : (
        <>
          <Stack justifyContent={"space-between"} alignItems={"center"} pb={2}>
            <Typography variant="h2" mb={2}>
              Menu de Hoy
            </Typography>
            <Button
              variant="contained"
              sx={{ maxHeight: 50 }}
              onClick={() => router.push("/customers/order")}
            >
              Ordena Ahora
            </Button>
          </Stack>
          <Box
            display={"flex"}
            flexDirection={"column"}
            width={"95%"}
            alignItems={"center"}
          >
            <CustomerMenu menu={activeMenu} isOrderPage={false} />
          </Box>
        </>
      )}
    </Box>
  );
};

MenuPage.getLayout = getCartLayout;
export default MenuPage;

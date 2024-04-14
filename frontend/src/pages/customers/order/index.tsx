import CustomerMenu from "@/modules/customers/components/menu/CustomerMenu";
import { useMenuService } from "@/shared/hooks/useMenuService";
import {
  Box,
  Button,
  CircularProgress,
  Paper,
  useMediaQuery,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Menu } from "../../../../../backend/src/menu/menu.dto";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useRouter } from "next/router";
import { getCartLayout } from "@/shared/providers/CartProvider";
import { NextPageWithLayout } from "@/pages/_app";
import theme from "@/styles/theme";

const OrderPage: NextPageWithLayout = () => {
  const router = useRouter();
  const { getActiveMenu } = useMenuService();
  const [activeMenu, setActiveMenu] = useState<Menu>();

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

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
        <Box
          display={"flex"}
          flexDirection={"column"}
          width={"95%"}
          alignItems={"center"}
        >
          <CustomerMenu menu={activeMenu} isOrderPage={true} />
        </Box>
      )}
      <Paper
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          height: "10%",
          display: "flex",
          justifyContent: isMobile ? "center" : "end",
          alignItems: "center",
        }}
        elevation={3}
      >
        <Button
          variant={isMobile ? "contained" : "text"}
          sx={{
            borderRadius: isMobile ? 20 : 0,
            height: isMobile ? "50%" : "100%",
            width: isMobile ? "60%" : "20%",
          }}
          onClick={() => router.push("/customers/cart")}
          endIcon={<ArrowForwardIcon />}
        >
          Listo
        </Button>
      </Paper>
    </Box>
  );
};

OrderPage.getLayout = getCartLayout;
export default OrderPage;

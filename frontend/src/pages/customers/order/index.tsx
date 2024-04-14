import CustomerMenu from "@/modules/customers/components/menu/CustomerMenu";
import { useMenuService } from "@/shared/hooks/useMenuService";
import { Box, Button, CircularProgress, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import { Menu } from "../../../../../backend/src/menu/menu.dto";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter } from "next/router";
import OrderProvider from "@/shared/providers/OrderProvider";

export default function OrderPage() {
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
    <>
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
            <OrderProvider>
              <CustomerMenu menu={activeMenu} isOrderPage={true} />
            </OrderProvider>
          </Box>
        )}
      </Box>
      <Paper
        sx={{
          zIndex: 1300,
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          height: "10vh",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
        elevation={3}
      >
        <Button
          sx={{ height: "100%", width: "20%", ml: { xs: 5, md: 0 } }}
          onClick={() => router.push("/customers/menu")}
          startIcon={<ArrowBackIcon />}
        >
          Cancelar
        </Button>
        <Button
          sx={{ height: "100%", width: "20%", mr: { xs: 3, md: 0 } }}
          onClick={() => router.push("/customers/cart")}
          endIcon={<ArrowForwardIcon />}
        >
          Listo
        </Button>
      </Paper>
    </>
  );
}

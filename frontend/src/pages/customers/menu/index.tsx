import CustomerMenu from "@/modules/customers/components/menu/CustomerMenu";
import { useMenuService } from "../../../shared/hooks/useMenuService";
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

export default function MenuPage() {
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
      py={10}
      height={"100vh"}
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
              Order Now
            </Button>
          </Stack>
          <CustomerMenu menu={activeMenu} isOrderPage={false} />
        </>
      )}
    </Box>
  );
}

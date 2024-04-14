import CustomerMenu from "@/modules/customers/components/menu/CustomerMenu";
import { useMenuService } from "@/shared/hooks/useMenuService";
import { Box, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { Menu } from "../../../../../backend/src/menu/menu.dto";

export default function OrderPage() {
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
      justifyContent={"center"}
    >
      {!activeMenu ? (
        <Box alignContent={"center"} justifyItems={"center"} height={"100%"}>
          <CircularProgress size={80} />
        </Box>
      ) : (
        <CustomerMenu menu={activeMenu} isOrderPage={true} />
      )}
    </Box>
  );
}

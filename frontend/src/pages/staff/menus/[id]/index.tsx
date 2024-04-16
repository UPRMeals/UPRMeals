import CustomerMenu from "@/modules/customers/components/menu/CustomerMenu";
import { useMenuService } from "@/shared/hooks/useMenuService";
import { Box, CircularProgress, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Menu } from "../../../../../../backend/src/menu/menu.dto";

export default function MenuPage() {
  const router = useRouter();
  const { getMenu } = useMenuService();
  const [menuWithItems, setMenuWithItems] = useState<Menu>();

  useEffect(() => {
    const fetchMenu = async () => {
      const menuId = router.query.id;
      if (!menuId || typeof menuId !== "string") return;
      const menu = await getMenu(Number(menuId));
      setMenuWithItems(menu);
    };
    if (!menuWithItems) fetchMenu();
  }, [getMenu]);

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
      {!menuWithItems ? (
        <Box alignContent={"center"} justifyItems={"center"} height={"100%"}>
          <CircularProgress size={80} />
        </Box>
      ) : (
        <>
          <Stack justifyContent={"space-between"} alignItems={"center"} pb={2}>
            <Typography variant="h2" mb={2}>
              {menuWithItems.name}
            </Typography>
          </Stack>
          <CustomerMenu menu={menuWithItems} isOrderPage={false} />
        </>
      )}
    </Box>
  );
}

import StaffMenu from "../../../../modules/staff/components/menu/StaffMenu";
import { useMenuService } from "../../../../shared/hooks/useMenuService";
import { Box, Button, CircularProgress, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Menu } from "../../../../../../backend/src/menu/menu.dto";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function MenuPage() {
  const router = useRouter();
  const { getMenu } = useMenuService();
  const [menuWithItems, setMenuWithItems] = useState<Menu | null>();

  useEffect(() => {
    const fetchMenu = async () => {
      const menuId = router.query.id;
      if (!menuId || typeof menuId !== "string") return;
      const menu = await getMenu(Number(menuId));
      setMenuWithItems(menu);
    };

    if (!menuWithItems) fetchMenu();
  }, [getMenu, menuWithItems]);

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
        <Box
          alignContent={"center"}
          justifyItems={"center"}
          height={"100%"}
          alignSelf={"center"}
        >
          <CircularProgress size={80} />
        </Box>
      ) : (
        <Stack
          sx={{
            flexDirection: "column",
            width: "80%",
            justifyItems: "flex-start",
            display: "flex",
          }}
        >
          <Box>
            <Button
              onClick={() => {
                router.push("/staff/menus");
              }}
              startIcon={<ArrowBackIcon />}
            >
              Regresar
            </Button>
          </Box>

          <StaffMenu
            menu={menuWithItems}
            refreshMenu={() => {
              setMenuWithItems(undefined);
            }}
          />
        </Stack>
      )}
    </Box>
  );
}

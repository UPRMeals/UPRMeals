import { useMenuService } from "@/shared/hooks/useMenuService";
import { Box, Divider, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import ComboCard from "./components/ComboCard";
import { ActiveMenuResponse } from "../../../../../backend/src/menu/menu.dto";
import ItemCard from "./components/ItemCard";

const CustomerOrderPage = () => {
  const { getActiveMenu } = useMenuService();
  const [activeMenu, setActiveMenu] = useState<ActiveMenuResponse>();

  useEffect(() => {
    const fetchMenu = async () => {
      const menu = await getActiveMenu();
      setActiveMenu(menu as any);
    };
    if (!activeMenu) fetchMenu();
  }, [getActiveMenu]);

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      justifyContent="start"
      alignItems="start"
      width={"95%"}
      rowGap={2}
    >
      <Typography variant="h3">Combos</Typography>
      <Divider flexItem sx={{ mb: 2 }} />
      <Stack
        direction={{ md: "column", lg: "row" }}
        justifyContent={"center"}
        width="100%"
        spacing={{ xs: 2, md: 3 }}
        useFlexGap
        flexWrap="wrap"
        mb={2}
      >
        {activeMenu?.combos?.map((combo: any) => (
          <ComboCard combo={combo} />
        ))}
      </Stack>
      <Typography variant="h3">Proteinas</Typography>
      <Divider flexItem sx={{ mb: 2 }} />
      <Stack
        direction={{ xs: "column", md: "row" }}
        justifyContent={"center"}
        width="100%"
        spacing={{ xs: 2, md: 3 }}
        useFlexGap
        flexWrap="wrap"
        mb={2}
      >
        {activeMenu?.proteins?.map((protein: any) => (
          <ItemCard item={protein} />
        ))}
      </Stack>
      <Typography variant="h3">Acompañantes</Typography>
      <Divider flexItem sx={{ mb: 2 }} />
      <Stack
        direction={{ xs: "column", md: "row" }}
        justifyContent={"center"}
        width="100%"
        spacing={{ xs: 2, md: 3 }}
        useFlexGap
        flexWrap="wrap"
        pb={5}
      >
        {activeMenu?.sides?.map((side: any) => (
          <ItemCard item={side} />
        ))}
      </Stack>
    </Box>
  );
};

export default CustomerOrderPage;

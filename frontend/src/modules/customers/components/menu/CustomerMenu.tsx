import { useMenuService } from "@/shared/hooks/useMenuService";
import { Box, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import ComboCard from "./ComboCard";
import { ActiveMenuResponse } from "../../../../../../backend/src/menu/menu.dto";
import { ItemCard } from "./ItemCard";

const CustomerMenu = ({ isOrderPage }: { isOrderPage: boolean }) => {
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
      <Typography variant="h4">Combos</Typography>
      <Stack
        direction={{ md: "column", lg: "row" }}
        width="100%"
        spacing={{ xs: 2, md: 3 }}
        useFlexGap
        flexWrap="wrap"
        mb={2}
        px="2%"
      >
        {activeMenu?.combos?.map((combo: any, index) => (
          <ComboCard key={index} combo={combo} isOrderPage={isOrderPage} />
        ))}
      </Stack>
      <Typography variant="h4">Proteinas</Typography>
      <Stack
        direction={{ xs: "column", md: "row" }}
        width="100%"
        spacing={{ xs: 2, md: 3 }}
        useFlexGap
        flexWrap="wrap"
        mb={2}
        px="2%"
      >
        {activeMenu?.proteins?.map((protein: any, index) => (
          <ItemCard key={index} item={protein} isOrderPage={isOrderPage} />
        ))}
      </Stack>
      <Typography variant="h4">Acompañantes</Typography>
      <Stack
        direction={{ xs: "column", md: "row" }}
        px="2%"
        width="100%"
        spacing={{ xs: 2, md: 3 }}
        useFlexGap
        flexWrap="wrap"
        pb={5}
      >
        {activeMenu?.sides?.map((side: any, index) => (
          <ItemCard key={index} item={side} isOrderPage={isOrderPage} />
        ))}
      </Stack>
    </Box>
  );
};

export default CustomerMenu;

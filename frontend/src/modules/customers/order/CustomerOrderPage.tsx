import { useMenuService } from "@/shared/hooks/useMenuService";
import { Box, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import ComboCard from "./components/ComboCard";
import { ActiveMenuResponse } from "../../../../../backend/src/menu/menu.dto";

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
      <Typography variant="h2" fontWeight={700}>
        Combos
      </Typography>
      <Stack
        direction={{ xs: "column", md: "row" }}
        justifyContent={"center"}
        width="100%"
        spacing={{ xs: 2, md: 3 }}
      >
        {activeMenu?.combos?.map((combo: any) => (
          <ComboCard combo={combo} />
        ))}
      </Stack>
      <Typography variant="h2" fontWeight={700}>
        Proteinas
      </Typography>
      <Typography variant="h2" fontWeight={700}>
        Acompañantes
      </Typography>
    </Box>
  );
};

export default CustomerOrderPage;

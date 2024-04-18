import { Box, Stack, Typography } from "@mui/material";
import ComboCard from "./ComboCard";
import { Combo, Item, Menu } from "../../../../../../backend/src/menu/menu.dto";
import { ItemCard } from "./ItemCard";

const CustomerMenu = ({
  isOrderPage,
  menu,
}: {
  isOrderPage: boolean;
  menu: Menu;
}) => {
  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      justifyContent="start"
      alignItems="start"
      width={"100%"}
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
        {menu?.combos?.map((combo: Combo, index) => (
          <ComboCard key={index} combo={combo} isOrderPage={isOrderPage} />
        ))}
      </Stack>
      <Typography variant="h4">Proteins</Typography>
      <Stack
        direction={{ xs: "column", md: "row" }}
        width="100%"
        spacing={{ xs: 2, md: 3 }}
        useFlexGap
        flexWrap="wrap"
        mb={2}
        px="2%"
      >
        {menu?.proteins?.map((protein: Item, index) => (
          <ItemCard key={index} item={protein} isOrderPage={isOrderPage} />
        ))}
      </Stack>
      <Typography variant="h4">Sides</Typography>
      <Stack
        direction={{ xs: "column", md: "row" }}
        px="2%"
        width="100%"
        spacing={{ xs: 2, md: 3 }}
        useFlexGap
        flexWrap="wrap"
        pb={5}
      >
        {menu?.sides?.map((side: Item, index) => (
          <ItemCard key={index} item={side} isOrderPage={isOrderPage} />
        ))}
      </Stack>
    </Box>
  );
};

export default CustomerMenu;

import { Card, CardContent, Stack, Typography } from "@mui/material";
import { Item } from "../../../../../../backend/src/menu/menu.dto";

export const ItemCard = ({ item }: { item: Item }) => {
  return (
    <Card
      variant="outlined"
      sx={{
        width: { sm: "100%", md: "20%" },
        borderRadius: 3,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <CardContent>
        <Stack>
          <Typography variant="h6" fontWeight={600}>
            {item.name}
          </Typography>
          <Typography variant="h6" fontWeight={400}>
            ${item.price}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
};

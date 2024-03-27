import {
  Card,
  CardContent,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { Item } from "../../../../../../backend/src/menu/menu.dto";

import AddIcon from "@mui/icons-material/Add";
import { Colors } from "@/styles/theme";

const ItemCard = ({ item }: { item: Item }) => {
  return (
    <Card
      variant="outlined"
      sx={{
        width: { sm: "100%", md: "20%" },
        borderRadius: 3,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor:
          item.type === "PROTEIN"
            ? Colors.OrangeSunset + "22"
            : Colors.Teal + "22",
      }}
    >
      <CardContent>
        <Stack
          direction="row"
          justifyContent={"space-between"}
          alignItems={"start"}
          spacing={2}
        >
          <Typography variant="h6" fontWeight={700}>
            {item.name}
          </Typography>
          <IconButton
            sx={{
              p: 0,
              color:
                item.type === "PROTEIN" ? Colors.OrangeSunset : Colors.Teal,
            }}
          >
            <AddIcon />
          </IconButton>
        </Stack>
        <Typography variant="h6" fontWeight={500}>
          ${item.price}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ItemCard;

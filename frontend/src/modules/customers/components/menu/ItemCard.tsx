import {
  Card,
  CardActions,
  CardContent,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { Item } from "../../../../../../backend/src/item/item.dto";
import AddIcon from "@mui/icons-material/Add";

import { Colors } from "@/styles/theme";
import { blueGrey } from "@mui/material/colors";
import { useCartContext } from "@/shared/providers/CartProvider";
import ItemAdder from "@/shared/components/ItemAdder";

export const ItemCard = ({
  item,
  isOrderPage,
}: {
  item: Item;
  isOrderPage: boolean;
}) => {
  const { addItem, getItemCount, removeItem } = useCartContext();
  const itemCount = getItemCount(item);

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
      {isOrderPage && (
        <CardActions
          sx={{
            justifyContent: "end",
            mb: 1,
          }}
        >
          {itemCount > 0 ? (
            <ItemAdder
              onAddItem={() => addItem(item)}
              onRemoveItem={() => removeItem(item)}
              quantity={itemCount}
            />
          ) : (
            <IconButton
              sx={{
                borderRadius: 10,
                boxShadow: "1px 2px 7px 1px " + blueGrey[100] + "99",
                ":hover": {
                  backgroundColor: blueGrey[50],
                },
              }}
              onClick={() => addItem(item)}
            >
              <AddIcon sx={{ color: Colors.Charcoal }} />
            </IconButton>
          )}
        </CardActions>
      )}
    </Card>
  );
};

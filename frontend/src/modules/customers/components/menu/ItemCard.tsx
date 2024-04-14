import {
  Button,
  Card,
  CardActions,
  CardContent,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { Item } from "../../../../../../backend/src/menu/menu.dto";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

import { Colors } from "@/styles/theme";
import { blueGrey } from "@mui/material/colors";
import { useState } from "react";

export const ItemCard = ({
  item,
  isOrderPage,
}: {
  item: Item;
  isOrderPage: boolean;
}) => {
  const [itemCount, setItemCount] = useState(0);

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
            <Stack
              direction="row"
              alignItems="center"
              sx={{
                height: 40,
                borderRadius: 10,
                boxShadow: "1px 2px 7px 1px " + blueGrey[100] + "99",
              }}
            >
              <Button
                startIcon={
                  <RemoveIcon
                    fontSize="large"
                    sx={{ color: Colors.Charcoal }}
                  />
                }
                sx={{
                  height: "100%",
                  borderTopLeftRadius: 20,
                  borderBottomLeftRadius: 20,
                  ":hover": {
                    height: "100%",
                    borderTopLeftRadius: 20,
                    borderBottomLeftRadius: 20,
                  },
                }}
                onClick={() => setItemCount(itemCount - 1)}
              />
              <Typography px={1} fontWeight={600}>
                {itemCount}
              </Typography>
              <Button
                endIcon={
                  <AddIcon fontSize="large" sx={{ color: Colors.Charcoal }} />
                }
                onClick={() => setItemCount(itemCount + 1)}
                sx={{
                  height: "100%",
                  borderTopRightRadius: 20,
                  borderBottomRightRadius: 20,
                  ":hover": {
                    height: "100%",
                    borderTopRightRadius: 20,
                    borderBottomRightRadius: 20,
                  },
                }}
              />
            </Stack>
          ) : (
            <IconButton
              sx={{
                borderRadius: 10,
                boxShadow: "1px 2px 7px 1px " + blueGrey[100] + "99",
              }}
              onClick={() => setItemCount(itemCount + 1)}
            >
              <AddIcon sx={{ color: Colors.Charcoal }} />
            </IconButton>
          )}
        </CardActions>
      )}
    </Card>
  );
};

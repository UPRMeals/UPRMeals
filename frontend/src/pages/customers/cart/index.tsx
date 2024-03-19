import React, { useState } from "react";
import {
  Box,
  Typography,
  Stack,
  Button,
  Card,
  CardContent,
  IconButton,
  Divider,
  Container,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import Grid from "@mui/material/Grid";
import { Tooltip } from "@mui/material";

const cartItems = [
  {
    id: 1,
    title: "Combo Internacional de Pollo con Papas Fritas",
    price: 4.99,
    quantity: 1,
  },
  { id: 2, title: "Jamon y Queso", price: 4.99, quantity: 2 },
  // Add more items here
];

type CartItemType = {
  id: number;
  title: string;
  price: number;
  quantity: number;
};

type CartItemArray = CartItemType[];

const CartItem = ({
  item,
  onAdd,
  onRemove,
  onDelete,
}: {
  item: CartItemType;
  onAdd: (item: CartItemType) => void;
  onRemove: (item: CartItemType) => void;
  onDelete: (item: CartItemType) => void;
}) => {
  return (
    <Card variant="outlined" sx={{ mb: 2 }}>
      <CardContent>
        <Grid
          container
          spacing={2}
          alignItems="center"
          justifyContent="space-between"
        >
          <Grid item xs={4}>
            <Tooltip title={item.title} placement="top" arrow>
              <Typography variant="h6" noWrap>
                {item.title}
              </Typography>
            </Tooltip>
          </Grid>
          <Grid item xs={4} textAlign="center">
            <IconButton onClick={() => onRemove(item)} size="small">
              <RemoveIcon />
            </IconButton>
            <Typography sx={{ display: "inline", mx: 1 }}>
              {item.quantity}
            </Typography>
            <IconButton onClick={() => onAdd(item)} size="small">
              <AddIcon />
            </IconButton>
          </Grid>
          <Grid item xs={3} textAlign="right">
            <Typography variant="h6">
              ${(item.price * item.quantity).toFixed(2)}
            </Typography>
          </Grid>
          <Grid item xs={1}>
            <IconButton onClick={() => onDelete(item)} size="small">
              <DeleteIcon />
            </IconButton>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default function MyCartPage() {
  const [items, setItems] = useState<CartItemArray>(cartItems);

  const handleAdd = (item: CartItemType) => {
    const newItems = items.map((i) =>
      i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
    );
    setItems(newItems);
  };

  const handleRemove = (item: CartItemType) => {
    const newItems = items
      .map((i) => (i.id === item.id ? { ...i, quantity: i.quantity - 1 } : i))
      .filter((i) => i.quantity > 0);
    setItems(newItems);
  };

  const handleDelete = (item: CartItemType) => {
    const newItems = items.filter((i) => i.id !== item.id);
    setItems(newItems);
  };

  const totalPrice = items.reduce(
    (acc, item: CartItemType) => acc + item.quantity * item.price,
    0
  );

  return (
    <Container maxWidth="md" sx={{ mt: 8, mb: 10 }}>
      <Typography variant="h2" textAlign="center" mb={4}>
        My Cart
      </Typography>
      <Box sx={{ background: "#f5f5f5", p: 3, borderRadius: "10px" }}>
        {items.length === 0 ? (
          <Typography variant="h6" textAlign="center">
            Your cart is empty.
          </Typography>
        ) : (
          <Stack spacing={3}>
            {items.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onAdd={handleAdd}
                onRemove={handleRemove}
                onDelete={handleDelete}
              />
            ))}
            <Divider />
            <Typography variant="h5" textAlign="right">
              Total: ${totalPrice.toFixed(2)}
            </Typography>
            <Button variant="contained" fullWidth sx={{ mt: 2 }}>
              Order Now
            </Button>
          </Stack>
        )}
      </Box>
    </Container>
  );
}

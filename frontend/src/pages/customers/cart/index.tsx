import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  IconButton,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Tooltip,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter } from "next/router";

type CartItemType = {
  id: number;
  title: string;
  price: number;
  quantity: number;
};

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

export default function MyCartPage() {
  const router = useRouter();
  const [items, setItems] = useState(cartItems);

  const handleAdd = (item: CartItemType) => {
    setItems((prevItems) =>
      prevItems.map((i) =>
        i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
      )
    );
  };

  const handleRemove = (item: CartItemType) => {
    setItems((prevItems) =>
      prevItems
        .map((i) => (i.id === item.id ? { ...i, quantity: i.quantity - 1 } : i))
        .filter((i) => i.quantity > 0)
    );
  };

  const handleDelete = (item: CartItemType) => {
    setItems((prevItems) => prevItems.filter((i) => i.id !== item.id));
  };

  const totalPrice = items.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  return (
    <Container maxWidth="md" sx={{ mt: 8, mb: 10 }}>
      <Typography variant="h2" textAlign="center" mb={4}>
        My Cart
      </Typography>
      <TableContainer
        component={Paper}
        sx={{ boxShadow: 3, overflowX: "auto" }}
      >
        <Table aria-label="cart table">
          <TableHead>
            <TableRow>
              <TableCell>Item</TableCell>
              <TableCell align="center">Quantity</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.id}>
                <TableCell component="th" scope="row">
                  <Tooltip
                    title={item.title}
                    placement="top"
                    enterDelay={500}
                    leaveDelay={200}
                  >
                    <Typography noWrap>{item.title}</Typography>
                  </Tooltip>
                </TableCell>
                <TableCell align="center">
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <IconButton onClick={() => handleRemove(item)} size="small">
                      <RemoveIcon />
                    </IconButton>
                    <Typography sx={{ mx: 2 }}>{item.quantity}</Typography>
                    <IconButton onClick={() => handleAdd(item)} size="small">
                      <AddIcon />
                    </IconButton>
                  </Box>
                </TableCell>
                <TableCell align="right">
                  ${(item.price * item.quantity).toFixed(2)}
                </TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => handleDelete(item)} size="small">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box display="flex" justifyContent="space-between" my={2}>
        <Typography variant="h5">Total:</Typography>
        <Typography variant="h5">${totalPrice.toFixed(2)}</Typography>
      </Box>
      <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
        Order Now
      </Button>
      <Paper
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          height: "10%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
        elevation={3}
      >
        <Button
          sx={{ height: "100%", width: "20%", ml: { xs: 5, md: 0 } }}
          onClick={() => router.push("/customers/order")}
          startIcon={<ArrowBackIcon />}
        >
          Regresar
        </Button>
      </Paper>
    </Container>
  );
}

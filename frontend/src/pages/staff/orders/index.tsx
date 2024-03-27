import React, { useState } from "react";
import {
  Box,
  Typography,
  Container,
  Card,
  CardContent,
  CardActions,
  Chip,
  MenuItem,
  FormControl,
  Select,
  IconButton,
  Collapse,
  List,
  ListItem,
  ListItemText,
  Grid,
  SelectChangeEvent,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import CloseIcon from "@mui/icons-material/Close";

// Define types for the orders and their status
type OrderStatus = "Pending" | "In Progress" | "Completed" | "Delivered";
type Order = {
  id: number;
  user: { username: string };
  status: OrderStatus;
  items: { name: string; quantity: number }[];
};

// Define the mock data with items
const initialOrders: Order[] = [
  {
    id: 1,
    user: { username: "jorge.cruz23" },
    status: "Pending",
    items: [
      { name: "Combo Internacional", quantity: 2 },
      { name: "Jamon y Queso", quantity: 1 },
    ],
  },
  {
    id: 2,
    user: { username: "user_two" },
    status: "In Progress",
    items: [
      { name: "Medianoche", quantity: 3 },
      { name: "Steak and Cheese", quantity: 1 },
    ],
  },
  {
    id: 3,
    user: { username: "user_three" },
    status: "Completed",
    items: [
      { name: "Cubano", quantity: 2 },
      { name: "Pernil", quantity: 1 },
    ],
  },
  {
    id: 4,
    user: { username: "user_four" },
    status: "Delivered",
    items: [
      { name: "Cubano", quantity: 2 },
      { name: "Pernil", quantity: 1 },
      { name: "Steak and Cheese", quantity: 1 },
    ],
  },
  {
    id: 5,
    user: { username: "user_five" },
    status: "Pending",
    items: [
      { name: "Cubano", quantity: 2 },
      { name: "Pernil", quantity: 1 },
      { name: "Steak and Cheese", quantity: 1 },
      { name: "Medianoche", quantity: 3 },
    ],
  },
  // Additional mock orders
];

const statusColors = {
  Pending: "default",
  "In Progress": "primary",
  Completed: "error",
  Delivered: "success",
};

export default function StaffOrdersPage() {
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [expanded, setExpanded] = useState<{ [key: number]: boolean }>({});

  const handleStatusChange = (
    orderId: number,
    event: SelectChangeEvent<OrderStatus>
  ) => {
    const newStatus = event.target.value as OrderStatus;
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  const handleExpandClick = (orderId: number) => {
    setExpanded((prevExpanded) => ({
      ...prevExpanded,
      [orderId]: !prevExpanded[orderId],
    }));
  };

  const handleRemoveOrder = (orderId: number) => {
    setOrders(orders.filter((order) => order.id !== orderId));
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Staff Orders for Today
      </Typography>
      <Grid container spacing={2}>
        {orders.map((order) => (
          <Grid item xs={12} sm={6} md={4} key={order.id}>
            <Card variant="outlined">
              <CardContent>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  sx={{ mb: 1 }}
                >
                  <Typography variant="h5" component="h2">
                    Order ID: {order.id}
                  </Typography>
                  <IconButton
                    onClick={() => handleRemoveOrder(order.id)}
                    aria-label="delete order"
                    sx={{
                      color: "inherit",
                      "&:hover": {
                        color: "red",
                      },
                    }}
                  >
                    <CloseIcon />
                  </IconButton>
                </Box>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography color="textSecondary">
                    Customer: {order.user.username}
                  </Typography>
                  <Chip
                    label={order.status}
                    color={
                      statusColors[order.status] as
                        | "default"
                        | "primary"
                        | "secondary"
                        | "success"
                    }
                    size="small"
                  />
                </Box>
              </CardContent>
              <CardActions>
                <FormControl fullWidth>
                  <Select
                    value={order.status}
                    onChange={(event) =>
                      handleStatusChange(
                        order.id,
                        event as SelectChangeEvent<OrderStatus>
                      )
                    }
                    displayEmpty
                  >
                    {Object.keys(statusColors).map((status) => (
                      <MenuItem key={status} value={status as OrderStatus}>
                        {status}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <IconButton
                  onClick={() => handleExpandClick(order.id)}
                  aria-expanded={expanded[order.id]}
                  aria-label="show more"
                >
                  {expanded[order.id] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </IconButton>
              </CardActions>
              <Collapse in={expanded[order.id]} timeout="auto" unmountOnExit>
                <CardContent>
                  <Typography paragraph>Items:</Typography>
                  <List>
                    {order.items.map((item, index) => (
                      <ListItem key={index}>
                        <ListItemText
                          primary={item.name}
                          secondary={`Quantity: ${item.quantity}`}
                        />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </Collapse>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

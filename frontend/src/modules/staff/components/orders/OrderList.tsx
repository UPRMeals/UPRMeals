import React from "react";
import { Grid, Typography, Box, Divider } from "@mui/material";
import OrderCard from "./OrderCard";
import { Order, OrderStatus } from "./types";
import { SelectChangeEvent } from "@mui/material";

type Props = {
  orders: Order[];
  expanded: { [key: number]: boolean };
  setExpanded: React.Dispatch<React.SetStateAction<{ [key: number]: boolean }>>;
  handleStatusChange: (
    id: number,
    event: SelectChangeEvent<OrderStatus>
  ) => void;
  handleRemoveOrder: (id: number) => void;
};

const OrderList: React.FC<Props> = ({
  orders,
  expanded,
  setExpanded,
  handleStatusChange,
  handleRemoveOrder,
}) => {
  const handleExpandClick = (id: number) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <>
      {["Pending", "In Progress", "Completed", "Delivered", "Rejected"].map(
        (status) => (
          <Box
            key={status}
            sx={{
              mb: 4,
              mt: 2,
              p: 2,
              bgcolor: "background.paper",
              borderRadius: "12px",
            }}
          >
            <Typography
              variant="h6"
              sx={{ fontWeight: "medium", color: "primary.main", mb: 1 }}
            >
              {status}
            </Typography>
            <Divider
              variant="middle"
              sx={{ mb: 2, boxShadow: "0px 2px 4px rgba(0,0,0,0.1)" }}
            />
            <Grid container spacing={2}>
              {orders
                .filter((order) => order.status === status.toUpperCase())
                .map((order) => (
                  <Grid item xs={12} sm={6} md={4} key={order.id}>
                    <OrderCard
                      order={order}
                      expanded={expanded[order.id]}
                      handleExpandClick={() => handleExpandClick(order.id)}
                      handleStatusChange={handleStatusChange}
                      handleRemoveOrder={handleRemoveOrder}
                    />
                  </Grid>
                ))}
            </Grid>
          </Box>
        )
      )}
    </>
  );
};

export default OrderList;

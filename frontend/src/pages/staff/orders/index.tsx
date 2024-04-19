import React, { useState } from "react";
import {
  Container,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";
import {
  Order,
  OrderStatus,
  initialOrders,
} from "../../../modules/staff/components/orders/types";
import { SelectChangeEvent } from "@mui/material";
import OrderList from "../../../modules/staff/components/orders/OrderList";

const StaffOrdersPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [expanded, setExpanded] = useState<{ [key: number]: boolean }>({});
  const [openDialog, setOpenDialog] = useState(false);
  const [currentOrder, setCurrentOrder] = useState<number | null>(null);

  const handleExpandClick = (orderId: number) => {
    setExpanded((prev) => ({ ...prev, [orderId]: !prev[orderId] }));
  };

  const handleStatusChange = (
    orderId: number,
    event: SelectChangeEvent<OrderStatus>
  ) => {
    const newStatus = event.target.value as OrderStatus;
    if (newStatus === "Rejected") {
      setOpenDialog(true);
      setCurrentOrder(orderId);
    } else {
      updateOrderStatus(orderId, newStatus);
    }
  };

  const updateOrderStatus = (orderId: number, newStatus: OrderStatus) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
    setExpanded((prev) => ({ ...prev, [orderId]: false }));
  };

  const handleRemoveOrder = (orderId: number) => {
    setOpenDialog(true);
    setCurrentOrder(orderId);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const confirmRemoveOrReject = () => {
    if (currentOrder != null) {
      updateOrderStatus(currentOrder, "Rejected");
      handleCloseDialog();
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ mt: 10 }}>
        Staff Orders for Today
      </Typography>
      <OrderList
        orders={orders}
        expanded={expanded}
        setExpanded={setExpanded}
        handleStatusChange={handleStatusChange}
        handleRemoveOrder={handleRemoveOrder}
      />
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Action"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to reject this order?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmRemoveOrReject} color="primary" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default StaffOrdersPage;

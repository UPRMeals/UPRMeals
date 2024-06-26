import React, { useEffect, useState } from "react";
import { Container, Typography } from "@mui/material";
import {
  Order,
  OrderStatus,
} from "../../../modules/staff/components/orders/types";
import { SelectChangeEvent } from "@mui/material";
import OrderList from "../../../modules/staff/components/orders/OrderList";
import { useOrderService } from "@/shared/hooks/useOrderService";
import OrderDialog from "@/modules/staff/components/orders/OrderDialog";

const StaffOrdersPage: React.FC = () => {
  const { getTodaysOrders, updateOrderStatus } = useOrderService();
  const [orders, setOrders] = useState<Order[]>([]);
  const [expanded, setExpanded] = useState<{ [key: number]: boolean }>({});
  const [openDialog, setOpenDialog] = useState(false);
  const [currentOrder, setCurrentOrder] = useState<number | null>(null);

  const [fetchAttempted, setFetchAttempted] = useState(false);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const fetchedOrders = await getTodaysOrders();
        setOrders(fetchedOrders);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      }
    };

    if (!fetchAttempted) {
      getOrders();
      setFetchAttempted(true);
      console.log("Fetching orders");
    }
  }, [getTodaysOrders, fetchAttempted, orders]);

  const handleStatusChange = (
    orderId: number,
    event: SelectChangeEvent<OrderStatus>
  ) => {
    const newStatus = event.target.value as OrderStatus;
    if (newStatus === "REJECTED") {
      setOpenDialog(true);
      setCurrentOrder(orderId);
    } else {
      updateStatus(orderId, newStatus);
    }
  };

  const updateStatus = async (orderId: number, newStatus: OrderStatus) => {
    // Call API to update the order status
    try {
      await updateOrderStatus(orderId, newStatus);
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (error) {
      console.error("Failed to update order status:", error);
    }
    setExpanded((prev) => ({ ...prev, [orderId]: false }));
  };

  const handleRemoveOrder = (orderId: number) => {
    setOpenDialog(true);
    setCurrentOrder(orderId);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleExpandClick = (id: number) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const confirmRemoveOrReject = () => {
    if (currentOrder != null) {
      updateStatus(currentOrder, "REJECTED");
      handleCloseDialog();
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ mt: 12 }}>
        Staff Orders for Today
      </Typography>
      <OrderList
        orders={orders}
        expanded={expanded}
        setExpanded={setExpanded}
        handleStatusChange={handleStatusChange}
        handleRemoveOrder={handleRemoveOrder}
        handleExpandClick={handleExpandClick}
      />
      <OrderDialog
        open={openDialog}
        handleCloseDialog={handleCloseDialog}
        confirmRemoveOrReject={confirmRemoveOrReject}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      />
    </Container>
  );
};

export default StaffOrdersPage;

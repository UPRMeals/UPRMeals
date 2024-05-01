import { useOrderService } from "@/shared/hooks/useOrderService";
import theme, { Colors } from "@/styles/theme";
import {
  Box,
  Card,
  CardActionArea,
  Chip,
  CircularProgress,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { blueGrey, indigo, lightGreen } from "@mui/material/colors";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { SimplifiedOrder } from "../../../../../backend/src/order/order.dto";
import { NextPageWithLayout } from "@/pages/_app";
import { getCartLayout } from "@/shared/providers/CartProvider";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";

export const StatusColors = {
  PENDING: indigo[500],
  IN_PROGRESS: Colors.OrangeSunset,
  COMPLETED: lightGreen[500],
  DELIVERED: Colors.Teal,
  REJECTED: Colors.Red,
};

enum OrderStatus {
  PENDING = "Pending",
  IN_PROGRESS = "In Progress",
  COMPLETED = "Completed",
  DELIVERED = "Delivered",
  REJECTED = "Rejected",
}

const EmptyState = () => {
  return (
    <Stack display="flex" alignItems={"center"} width={"100%"}>
      <ReceiptLongIcon sx={{ color: Colors.Teal + "bb", fontSize: 64 }} />
      <Typography fontWeight={600} pt={1}>
        You have no orders.
      </Typography>
    </Stack>
  );
};

const OrdersPage: NextPageWithLayout = () => {
  const router = useRouter();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const { getAllOrdersForUser } = useOrderService();
  const [orders, setOrders] = useState<SimplifiedOrder[]>();

  useEffect(() => {
    const fetchOrders = async () => {
      const orders = await getAllOrdersForUser();
      setOrders(orders);
    };
    if (!orders) fetchOrders();
    console.log("fetching", orders);
  }, [getAllOrdersForUser, orders]);

  const OrderCards = () => {
    if (!orders) return <></>;

    return (
      <>
        {orders.map((order) => (
          <Card
            key={order.id}
            sx={{
              backgroundColor: "#fbfbff",
              boxShadow: "1px 2px 7px 1px " + blueGrey[100] + "99",
            }}
          >
            <CardActionArea
              onClick={() => router.push(`/customers/orders/${order.id}`)}
              sx={{
                padding: 2,
              }}
            >
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems={"center"}
                mb={2}
              >
                <Stack direction="row" gap={2} alignItems={"center"}>
                  <Typography variant="h5" fontWeight={600}>
                    # {order.id}
                  </Typography>
                  <Chip
                    sx={{
                      textTransform: "capitalize",
                      color: "white",
                      backgroundColor:
                        StatusColors[order.status as keyof typeof StatusColors],
                    }}
                    label={OrderStatus[order.status]}
                  />
                </Stack>
                <Typography variant="h6" fontWeight={600}>
                  ${order.totalPrice.toFixed(2)}
                </Typography>
              </Stack>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems={"center"}
              >
                <Typography variant="body1">{order.createdAt}</Typography>
                <NavigateNextIcon fontSize={isMobile ? "medium" : "large"} />
              </Stack>
            </CardActionArea>
          </Card>
        ))}
      </>
    );
  };

  return (
    <Box
      width={"100vw"}
      height={"90vh"}
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      mb={20}
    >
      {!orders ? (
        <Box alignContent={"center"} justifyItems={"center"} height={"100%"}>
          <CircularProgress size={80} />
        </Box>
      ) : (
        <Stack p={2} width={isMobile ? "100%" : "60%"} gap={2}>
          <Typography variant="h3" fontWeight={600} mb={1}>
            Order History
          </Typography>
          {orders.length > 0 ? <OrderCards /> : <EmptyState />}
        </Stack>
      )}
    </Box>
  );
};

OrdersPage.getLayout = getCartLayout;
export default OrdersPage;

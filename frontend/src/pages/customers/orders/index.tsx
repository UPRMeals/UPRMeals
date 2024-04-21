import { useOrderService } from "@/shared/hooks/useOrderService";
import theme from "@/styles/theme";
import {
  Box,
  Card,
  CardActionArea,
  Chip,
  CircularProgress,
  Divider,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { blueGrey, indigo, lightGreen } from "@mui/material/colors";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { SimplifiedOrder } from "../../../../../backend/src/order/order.dto";

const StatusColors = {
  PENDING: indigo[500],
  IN_PROGRESS: "",
  COMPLETED: "",
  DELIVERED: lightGreen[500],
};

enum OrderStatus {
  PENDING = "Pending",
  IN_PROGRESS = "In Progress",
  COMPLETED = "Completed",
  DELIVERED = "Delivered",
}

const ORDER_STATUS_LIST = Object.values(OrderStatus);

const OrdersPage = () => {
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

  return (
    <Box
      mt={isMobile ? 10 : 14}
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
                          StatusColors[
                            order.status as keyof typeof StatusColors
                          ],
                      }}
                      label={order.status}
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
        </Stack>
      )}
    </Box>
  );
};

export default OrdersPage;

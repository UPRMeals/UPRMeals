import { useOrderService } from "@/shared/hooks/useOrderService";
import theme, { Colors } from "@/styles/theme";
import { Timeline } from "@mui/lab";
import {
  Box,
  CircularProgress,
  Divider,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import AutorenewOutlinedIcon from "@mui/icons-material/AutorenewOutlined";
import OutdoorGrillOutlinedIcon from "@mui/icons-material/OutdoorGrillOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";

const StatusOptions = {
  Pending: {
    icon: (props: any) => <AutorenewOutlinedIcon {...props} />,
    text: "Your order has been placed and is awaiting processing.",
  },
  "In Progress": {
    icon: (props: any) => <OutdoorGrillOutlinedIcon {...props} />,
    text: "Your order is currently being prepared.",
  },
  Completed: {
    icon: (props: any) => <CheckCircleOutlineOutlinedIcon {...props} />,
    text: "Your order has been prepared and is ready for delivery.",
  },
  Delivered: {
    icon: (props: any) => <LocalShippingOutlinedIcon {...props} />,
    text: "Your order has been delivered. Enjoy!",
  },
};

enum OrderStatus {
  PENDING = "Pending",
  IN_PROGRESS = "In Progress",
  COMPLETED = "Completed",
  DELIVERED = "Delivered",
}

const ORDER_STATUS_LIST = Object.values(OrderStatus);

const OrderStatusPage = () => {
  const router = useRouter();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const { getOrder } = useOrderService();
  const [order, setOrder] = useState<any>();

  useEffect(() => {
    const fetchOrder = async () => {
      const orderId = router.query.orderId;
      if (!orderId || typeof orderId !== "string") return;
      setOrder(await getOrder(orderId));
    };

    if (!order) {
      fetchOrder();
    }
  }, [getOrder, order, router]);

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
      {!order ? (
        <Box alignContent={"center"} justifyItems={"center"} height={"100%"}>
          <CircularProgress size={80} />
        </Box>
      ) : (
        <Stack p={2} width={isMobile ? "100%" : "60%"}>
          <Typography variant="h3" fontWeight={600}>
            Order Status
          </Typography>
          <Typography variant="h5" fontWeight={400} ml={1} mb={2}>
            Order: {order.id}
          </Typography>
          <Stack direction="row" justifyContent={"space-between"} mb={1} mx={1}>
            <Typography variant="body1">{order.createdAt}</Typography>
            <Typography variant="body1" fontWeight={600}>
              Total: ${order.totalPrice}
            </Typography>
          </Stack>
          <Divider />
          <Box>
            <Timeline>
              {ORDER_STATUS_LIST.map((status, index: number) => {
                const isCurrentStatus =
                  index <= ORDER_STATUS_LIST.indexOf(OrderStatus["COMPLETED"]);
                return (
                  <Stack key={index} direction="row" alignItems="start" gap={1}>
                    <Stack
                      direction="column"
                      justifyContent="center"
                      alignItems="center"
                    >
                      {StatusOptions[status].icon({
                        sx: {
                          color: isCurrentStatus ? Colors.Teal : "lightgray",
                        },
                      })}
                      {index !== ORDER_STATUS_LIST.length - 1 && (
                        <Divider
                          sx={{
                            height: "8vh",
                            borderWidth: 2,
                            my: 1,
                            backgroundColor: isCurrentStatus
                              ? Colors.Teal
                              : "lightgray",
                          }}
                          orientation="vertical"
                        />
                      )}
                    </Stack>
                    <Stack
                      direction="column"
                      justifyContent="center"
                      alignItems="start"
                    >
                      <Typography
                        variant="body1"
                        fontWeight={600}
                        color={isCurrentStatus ? Colors.Charcoal : "lightgray"}
                        mb={1}
                      >
                        {status}
                      </Typography>
                      <Typography
                        variant="caption"
                        color={isCurrentStatus ? Colors.Charcoal : "lightgray"}
                      >
                        {StatusOptions[status].text}
                      </Typography>
                    </Stack>
                  </Stack>
                );
              })}
            </Timeline>
          </Box>
          <Divider />
        </Stack>
      )}
    </Box>
  );
};

export default OrderStatusPage;

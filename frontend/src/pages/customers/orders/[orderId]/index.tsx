import { useOrderService } from "@/shared/hooks/useOrderService";
import theme, { Colors } from "@/styles/theme";
import {
  Box,
  CircularProgress,
  Divider,
  Stack,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import AutorenewOutlinedIcon from "@mui/icons-material/AutorenewOutlined";
import OutdoorGrillOutlinedIcon from "@mui/icons-material/OutdoorGrillOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import { SimplifiedOrder } from "../../../../../../backend/src/order/order.dto";
import { Item } from "../../../../../../backend/src/menu/menu.dto";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";

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
  const [order, setOrder] = useState<SimplifiedOrder>();

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
        <Stack p={2} width={isMobile ? "100%" : "70%"}>
          <Typography variant="h3" fontWeight={600} mb={1}>
            Order: {order.id}
          </Typography>
          <Stack direction="row" justifyContent={"space-between"} mb={1} mx={1}>
            <Typography variant="body1">{order.createdAt}</Typography>
            <Stack direction="row" spacing={1} alignItems="center">
              <Typography variant="body1" fontWeight={600}>
                Total: ${order.totalPrice.toFixed(2)}
              </Typography>
              <Tooltip title="Tax not included. It will be calculated during payment at the site.">
                <InfoIcon color="action" />
              </Tooltip>
            </Stack>
          </Stack>
          <Divider />
          <Stack direction={isMobile ? "column" : "row"}>
            <Box width={isMobile ? "100%" : "50%"} p={2}>
              <Typography variant="h5" fontWeight={600} mb={1}>
                Order Status
              </Typography>
              {order.status === "REJECTED" ? (
                <Stack>
                  <Stack direction="row" gap={1} alignItems="center">
                    <Typography color={Colors.Red} gap={1}>
                      Your order has been rejected!
                    </Typography>
                    <SentimentVeryDissatisfiedIcon />
                  </Stack>
                  <Typography variant="caption">
                    We are very sorry to hear this. Please contact the cafeteria
                    for more details.
                  </Typography>
                </Stack>
              ) : (
                ORDER_STATUS_LIST.map((status, index: number) => {
                  const isCurrentStatus =
                    index <=
                    ORDER_STATUS_LIST.indexOf(
                      OrderStatus[order.status as keyof typeof OrderStatus]
                    );
                  return (
                    <Stack
                      key={index}
                      direction="row"
                      alignItems="start"
                      gap={1}
                      ml={1}
                    >
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
                              borderWidth: 1,
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
                          color={
                            isCurrentStatus ? Colors.Charcoal : "lightgray"
                          }
                          mb={1}
                        >
                          {status}
                        </Typography>
                        <Typography
                          variant="caption"
                          color={
                            isCurrentStatus ? Colors.Charcoal : "lightgray"
                          }
                        >
                          {StatusOptions[status].text}
                        </Typography>
                      </Stack>
                    </Stack>
                  );
                })
              )}
            </Box>
            <Divider
              orientation={isMobile ? "horizontal" : "vertical"}
              sx={{ mt: 1 }}
            />
            <Box width={isMobile ? "100%" : "50%"} p={2}>
              <Typography variant="h5" fontWeight={600} mb={1}>
                Order Details
              </Typography>
              <Stack>
                {order.orderCombos.map((combo) => (
                  <Stack key={combo.id}>
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Typography fontWeight={500}>{combo.name}</Typography>
                      <Typography>${combo.price.toFixed(2)}</Typography>
                    </Stack>
                    <Typography variant="caption">
                      {combo.description || ""}
                    </Typography>
                    <Stack mt={1}>
                      <Typography variant="caption">
                        <Typography variant="caption" fontWeight={600}>
                          Protein(s):&nbsp;
                        </Typography>
                        {combo.proteins?.map((p: Item) => p.name).join(", ")}
                      </Typography>
                      <Typography variant="caption">
                        <Typography variant="caption" fontWeight={600}>
                          Side(s):&nbsp;
                        </Typography>
                        {combo.sides?.map((s: Item) => s.name).join(", ")}
                      </Typography>
                    </Stack>
                    <Divider sx={{ my: 2 }} />
                  </Stack>
                ))}
                {order.orderItems.map((item) => (
                  <Stack key={item.id}>
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Typography fontWeight={500}>{item.name}</Typography>
                      <Typography>${item.price.toFixed(2)}</Typography>
                    </Stack>
                    <Divider sx={{ my: 2 }} />
                  </Stack>
                ))}
              </Stack>
            </Box>
          </Stack>
          <Divider sx={{ mt: 2 }} />
        </Stack>
      )}
    </Box>
  );
};

export default OrderStatusPage;

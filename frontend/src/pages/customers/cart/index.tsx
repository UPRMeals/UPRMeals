import {
  Box,
  Typography,
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Tooltip,
  useMediaQuery,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter } from "next/router";
import {
  getCartLayout,
  userCartContext,
} from "@/shared/providers/CartProvider";
import { NextPageWithLayout } from "@/pages/_app";
import theme from "@/styles/theme";

type CartItemType = {
  id: number;
  title: string;
  price: number;
  quantity: number;
};

const MyCartPage: NextPageWithLayout = () => {
  const router = useRouter();
  const { getItems, getTotalPrice, clearItem, removeItem, addItem } =
    userCartContext();

  const items = getItems();
  const totalPrice = getTotalPrice();

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const EditButtons = (props: any) => (
    <Box display="flex" alignItems="center" justifyContent="center">
      <IconButton onClick={() => removeItem(props.item)}>
        <RemoveIcon fontSize="small" />
      </IconButton>
      <Typography sx={{ mx: 2 }} fontWeight={600}>
        {props.item.quantity}
      </Typography>
      <IconButton onClick={() => addItem(props.item)} size="large">
        <AddIcon fontSize="small" />
      </IconButton>
    </Box>
  );

  return (
    <Box
      mt={12}
      height={"100vh"}
      width={"100vw"}
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      justifyContent={"start"}
    >
      <TableContainer sx={{ maxWidth: { xs: "95%", lg: "70%" } }}>
        <Typography variant="h3" alignSelf={"start"} mb={4}>
          My Cart
        </Typography>
        <Table aria-label="cart table" table-layout="fixed">
          <TableHead>
            <TableRow>
              <TableCell sx={{ maxWidth: "10%" }}>Item</TableCell>
              {!isMobile && <TableCell align="center">Quantity</TableCell>}
              <TableCell align="right">Price</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items?.map((item: any) => (
              <TableRow key={item.id}>
                <TableCell component="th" scope="row" sx={{ maxWidth: "10%" }}>
                  <Tooltip
                    title={item.name}
                    placement="top"
                    enterDelay={500}
                    leaveDelay={200}
                  >
                    <Typography>{item.name}</Typography>
                  </Tooltip>
                </TableCell>
                {!isMobile && (
                  <TableCell align="center">
                    <EditButtons item={item} />
                  </TableCell>
                )}
                <TableCell align="right">
                  ${(item.price * item.quantity).toFixed(2)}
                </TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => clearItem(item)} size="small">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box display="flex" justifyContent="space-between" my={2}>
        <Typography variant="h5">Subtotal: </Typography>
        <Typography variant="h5">${totalPrice.toFixed(2)}</Typography>
      </Box>
      <Button
        variant="contained"
        color="primary"
        sx={{ mt: 2, width: isMobile ? "60%" : "30%" }}
      >
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
          justifyContent: isMobile ? "center" : "space-between",
          alignItems: "center",
        }}
        elevation={3}
      >
        <Button
          variant={isMobile ? "contained" : "text"}
          sx={{
            borderRadius: isMobile ? 20 : 0,
            height: isMobile ? "50%" : "100%",
            width: isMobile ? "60%" : "20%",
          }}
          onClick={() => router.push("/customers/order")}
          startIcon={<ArrowBackIcon />}
        >
          Editar Orden
        </Button>
      </Paper>
    </Box>
  );
};

MyCartPage.getLayout = getCartLayout;
export default MyCartPage;

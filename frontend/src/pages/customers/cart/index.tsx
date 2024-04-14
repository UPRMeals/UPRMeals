import {
  Box,
  Typography,
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  useMediaQuery,
  Divider,
  Stack,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DoneIcon from "@mui/icons-material/Done";
import { useRouter } from "next/router";
import {
  getCartLayout,
  userCartContext,
} from "@/shared/providers/CartProvider";
import { NextPageWithLayout } from "@/pages/_app";
import theme, { Colors } from "@/styles/theme";
import EditButtons from "@/shared/components/ItemAdder";

const MyCartPage: NextPageWithLayout = () => {
  const router = useRouter();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const { getItems, getTotalPrice, clearItem, removeItem, addItem } =
    userCartContext();

  const items = getItems();
  const totalPrice = getTotalPrice();

  return (
    <Box
      mt={14}
      width={"100vw"}
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      justifyContent={"start"}
      mb={20}
    >
      <TableContainer sx={{ maxWidth: { xs: "95%", lg: "70%" } }}>
        <Typography variant="h4" alignSelf={"start"} fontWeight={600} mb={1}>
          My Cart
        </Typography>
        <Typography variant="body1" alignSelf={"start"} mb={3} fontWeight={300}>
          Payment will be processed at the cafeteria.
        </Typography>
        <Divider />
        <Table aria-label="cart table" table-layout="fixed" stickyHeader>
          <TableBody>
            {items?.map((item: any) => (
              <TableRow key={item.id}>
                <TableCell component="th" scope="row" sx={{ maxWidth: "10%" }}>
                  <Typography fontWeight={500}>{item.name}</Typography>
                  {isMobile && (
                    <EditButtons
                      quantity={item.quantity}
                      onAddItem={() => addItem(item)}
                      onRemoveItem={() => removeItem(item)}
                      restProps={{ justifyContent: "start", mt: 2 }}
                    />
                  )}
                </TableCell>
                {!isMobile && (
                  <TableCell align="center">
                    <EditButtons
                      quantity={item.quantity}
                      onAddItem={() => addItem(item)}
                      onRemoveItem={() => removeItem(item)}
                    />
                  </TableCell>
                )}
                <TableCell align="right">
                  ${(item.price * item.quantity).toFixed(2)}
                </TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => clearItem(item)} size="small">
                    <DeleteIcon sx={{ color: Colors.Charcoal }} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Stack
        width="100%"
        direction="row"
        justifyContent="space-between"
        sx={{ maxWidth: { xs: "95%", lg: "70%" } }}
        px={2}
        pt={2}
      >
        <Typography variant={"h5"} fontWeight={500}>
          Subtotal:
        </Typography>
        <Typography variant={"h5"} fontWeight={500}>
          ${totalPrice.toFixed(2)}
        </Typography>
      </Stack>
      <Paper
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          height: isMobile ? "15%" : "10%",
          display: "flex",
          flexDirection: isMobile ? "column" : "row-reverse",
          justifyContent: "space-between",
          alignItems: "center",
          py: isMobile ? 2 : 0,
        }}
        elevation={3}
      >
        <Button
          variant={isMobile ? "contained" : "text"}
          sx={{
            borderRadius: isMobile ? 4 : 0,
            height: isMobile ? "45%" : "100%",
            width: isMobile ? "70%" : "20%",
          }}
          endIcon={!isMobile && <DoneIcon />}
        >
          Ordenar
        </Button>
        <Button
          variant={isMobile ? "outlined" : "text"}
          sx={{
            borderRadius: isMobile ? 4 : 0,
            height: isMobile ? "45%" : "100%",
            width: isMobile ? "70%" : "20%",
          }}
          onClick={() => router.push("/customers/order")}
          startIcon={!isMobile && <ArrowBackIcon />}
        >
          Editar
        </Button>
      </Paper>
    </Box>
  );
};

MyCartPage.getLayout = getCartLayout;
export default MyCartPage;

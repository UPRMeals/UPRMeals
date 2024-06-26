import React from "react";
import {
  Card,
  CardContent,
  CardActions,
  IconButton,
  Typography,
  Box,
  Divider,
  Chip,
  FormControl,
  Select,
  MenuItem,
  Collapse,
  List,
  ListItem,
  ListItemText,
  SelectChangeEvent,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import CloseIcon from "@mui/icons-material/Close";
import { Order, OrderStatus, statusColors } from "./types";
import { blueGrey } from "@mui/material/colors";

type Props = {
  order: Order;
  expanded: boolean;
  handleExpandClick: (id: number) => void;
  handleStatusChange: (
    id: number,
    event: SelectChangeEvent<OrderStatus>
  ) => void;
  handleRemoveOrder: (id: number) => void;
};

const OrderCard: React.FC<Props> = ({
  order,
  expanded,
  handleExpandClick,
  handleStatusChange,
  handleRemoveOrder,
}) => {
  return (
    <Card
      variant="outlined"
      sx={{
        m: 1,
        boxShadow: "1px 2px 7px 1px " + blueGrey[100] + "99",
        overflow: "visible",
      }}
    >
      <CardContent>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          sx={{ mb: 1 }}
        >
          <Typography variant="h6" component="h2" sx={{ flexGrow: 1 }}>
            Order ID: {order.id}
          </Typography>
          <IconButton
            onClick={() => handleRemoveOrder(order.id)}
            aria-label="delete order"
            sx={{ color: "inherit", "&:hover": { color: "red" } }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider variant="fullWidth" sx={{ mb: 2 }} />
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography color="textSecondary" sx={{ mr: 2, flexGrow: 1 }}>
            Customer: {order.user.firstName + " " + order.user.lastName}
          </Typography>
          <Chip
            label={order.status}
            sx={{
              bgcolor: statusColors[order.status],
              color: (theme) =>
                theme.palette.getContrastText(statusColors[order.status]),
            }}
            size="small"
          />
        </Box>
      </CardContent>
      <CardActions>
        <FormControl fullWidth sx={{ m: 1 }}>
          <Select
            value={order.status}
            onChange={(event) => handleStatusChange(order.id, event)}
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
          aria-expanded={expanded}
          aria-label="show more"
        >
          {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph sx={{ pb: 0, mb: 0, fontWeight: "bold" }}>
            Order Items:
          </Typography>
          <List dense sx={{ pl: 2 }}>
            {order.orderItems.map((orderItem, index) => (
              <ListItem key={index}>
                <ListItemText primary={orderItem.item.name} />
              </ListItem>
            ))}
          </List>
          <Typography paragraph sx={{ pb: 0, mb: 0, fontWeight: "bold" }}>
            Combos:
          </Typography>
          {order.orderCombos.map((orderCombo, index) => (
            <React.Fragment key={index}>
              <ListItem sx={{ pb: 0, mb: 0 }}>
                <ListItemText primary={orderCombo.combo.name} />
              </ListItem>
              <List dense disablePadding sx={{ pl: 4 }}>
                {orderCombo.orderComboItems.map((comboItem, subIndex) => (
                  <ListItem key={subIndex}>
                    <ListItemText
                      primary={comboItem.item.name}
                      //secondary={`Quantity: ... (however you calculate quantity)`}
                    />
                  </ListItem>
                ))}
              </List>
            </React.Fragment>
          ))}
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default OrderCard;

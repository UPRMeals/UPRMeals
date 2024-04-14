import { Colors } from "@/styles/theme";
import { Box, BoxProps, Button, Typography } from "@mui/material";
import ButtonGroup from "@mui/material/ButtonGroup";
import { blueGrey } from "@mui/material/colors";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const EditButtons = ({
  quantity,
  onRemoveItem,
  onAddItem,
  restProps,
}: {
  quantity: number;
  onRemoveItem: () => void;
  onAddItem: () => void;
  restProps?: BoxProps;
}) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent={"center"}
      {...restProps}
    >
      <ButtonGroup
        sx={{
          alignItems: "center",
          height: 40,
          borderRadius: 10,
          boxShadow: "1px 2px 7px 1px " + blueGrey[100] + "99",
        }}
      >
        <Button
          startIcon={
            <RemoveIcon fontSize="large" sx={{ color: Colors.Charcoal }} />
          }
          sx={{
            border: 0,
            height: "100%",
            borderTopLeftRadius: 20,
            borderBottomLeftRadius: 20,
            ":hover": { border: 0, backgroundColor: blueGrey[50] },
          }}
          onClick={onRemoveItem}
        />
        <Typography fontWeight={600} px={1}>
          {quantity}
        </Typography>
        <Button
          endIcon={<AddIcon fontSize="large" sx={{ color: Colors.Charcoal }} />}
          sx={{
            border: 0,
            height: "100%",
            borderTopRightRadius: 20,
            borderBottomRightRadius: 20,
            ":hover": { border: 0, backgroundColor: blueGrey[50] },
          }}
          onClick={onAddItem}
        />
      </ButtonGroup>
    </Box>
  );
};

export default EditButtons;

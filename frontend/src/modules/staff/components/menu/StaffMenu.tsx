import {
  Box,
  Button,
  Chip,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";

import { Menu } from "../../../../../../backend/src/menu/menu.dto";
import ComboCard from "./ComboCard";
import { ItemCard } from "./ItemCard";
import NoFoodIcon from "@mui/icons-material/NoFood";
import { Colors } from "@/styles/theme";
import AddIcon from "@mui/icons-material/Add";
import { indigo, lightGreen } from "@mui/material/colors";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";
import AddItemDialog from "../AddItemDialog";

const MenuDetails = ({ label, value }: { label: string; value: string }) => {
  return (
    <Stack direction="row">
      <Typography variant="h6" fontWeight={600}>
        {label}:&nbsp;
      </Typography>
      <Typography variant="h6">{value}</Typography>
    </Stack>
  );
};

const EmptyState = ({ itemType }: { itemType: string }) => {
  return (
    <Stack display="flex" alignItems={"center"} width={"100%"} py={3}>
      <NoFoodIcon sx={{ color: Colors.Teal + "bb", fontSize: 64 }} />
      <Typography fontWeight={600}>No hay {itemType}</Typography>
    </Stack>
  );
};

const StaffMenu = ({ menu }: { menu: Menu }) => {
  const [openAddComboDialog, setOpenAddComboDialog] = useState<boolean>(false);
  const [openAddProteinDialog, setOpenAddProteinDialog] =
    useState<boolean>(false);
  const [openAddSideDialog, setOpenAddSideDialog] = useState<boolean>(false);
  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      justifyContent="start"
      alignItems="start"
      width={"100%"}
      pb={3}
    >
      <Stack my={3} width={"100%"}>
        <Stack direction="row" width={"100%"} justifyContent={"space-between"}>
          <Stack direction="row" alignItems="center" justifyContent={"center"}>
            <Typography variant="h3" fontWeight={600}>
              {menu.name}
            </Typography>
            <Chip
              label={menu.isActive ? "Activo" : "Inactivo"}
              sx={{
                ml: 1,
                backgroundColor: menu.isActive ? lightGreen[500] : indigo[400],
                color: "white",
                fontWeight: 600,
              }}
            />
          </Stack>
          <IconButton>
            <EditIcon />
          </IconButton>
        </Stack>
        <MenuDetails
          label="Fecha"
          value={new Date(menu.date).toLocaleDateString()}
        />
        {!!menu.description && (
          <MenuDetails label="Descripción" value={menu.description} />
        )}
      </Stack>

      <Stack
        direction="row"
        width="100%"
        sx={{ display: "flex", justifyContent: "space-between" }}
      >
        <Typography variant="h5">Combos</Typography>
        <Button
          startIcon={<AddIcon />}
          onClick={() => setOpenAddComboDialog(true)}
        >
          Añadir
        </Button>
      </Stack>
      <Divider sx={{ width: "100%" }} />

      <Stack
        direction={{ md: "column", lg: "row" }}
        width="100%"
        spacing={{ xs: 2, md: 3 }}
        useFlexGap
        flexWrap="wrap"
        mt={3}
        mb={2}
        px="2%"
      >
        {menu?.combos?.length > 0 ? (
          menu?.combos?.map((combo: any, index) => (
            <ComboCard key={index} combo={combo} />
          ))
        ) : (
          <EmptyState itemType="combinaciones" />
        )}
      </Stack>

      <Stack
        direction="row"
        width="100%"
        sx={{ display: "flex", justifyContent: "space-between" }}
      >
        <Typography variant="h5">Proteinas</Typography>
        <Button
          startIcon={<AddIcon />}
          onClick={() => setOpenAddProteinDialog(true)}
        >
          Añadir
        </Button>
      </Stack>
      <Divider sx={{ width: "100%" }} />

      <Stack
        direction={{ xs: "column", md: "row" }}
        width="100%"
        spacing={{ xs: 2, md: 3 }}
        useFlexGap
        flexWrap="wrap"
        mt={3}
        mb={2}
        px="2%"
      >
        {menu?.proteins?.length > 0 ? (
          menu?.proteins?.map((protein: any, index) => (
            <ItemCard key={index} item={protein} />
          ))
        ) : (
          <EmptyState itemType="proteinas" />
        )}
      </Stack>

      <Stack
        direction="row"
        width="100%"
        sx={{ display: "flex", justifyContent: "space-between" }}
      >
        <Typography variant="h5">Acompañantes</Typography>
        <Button
          startIcon={<AddIcon />}
          onClick={() => setOpenAddSideDialog(true)}
        >
          Añadir
        </Button>
      </Stack>
      <Divider sx={{ width: "100%" }} />
      <Stack
        direction={{ xs: "column", md: "row" }}
        px="2%"
        width="100%"
        spacing={{ xs: 2, md: 3 }}
        useFlexGap
        flexWrap="wrap"
        mt={3}
        mb={2}
      >
        {menu?.sides?.length > 0 ? (
          menu?.sides?.map((side: any, index) => (
            <ItemCard key={index} item={side} />
          ))
        ) : (
          <EmptyState itemType="acompañantes" />
        )}
      </Stack>

      <AddItemDialog
        open={openAddSideDialog}
        handleClose={async () => {
          setOpenAddSideDialog(false);
        }}
        menuId={menu.id}
        itemType={"SIDE"}
      />
      <AddItemDialog
        open={openAddProteinDialog}
        handleClose={async () => {
          setOpenAddProteinDialog(false);
        }}
        menuId={menu.id}
        itemType={"PROTEIN"}
      />
    </Box>
  );
};

export default StaffMenu;

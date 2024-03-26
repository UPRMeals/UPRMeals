import {
  Box,
  Button,
  TableCell,
  TableHead,
  TableBody,
  TableContainer,
  TableRow,
  Table,
  ButtonBase,
  Chip,
  IconButton,
  Collapse,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useEffect, useState } from "react";
import CreateMenuDialog from "../components/CreateMenuDialog";
import { useMenuService } from "@/modules/staff/menu/hooks/useMenuService";
import { MenuResponse } from "../../../../../backend/src/menu/menu.dto";
import { useRouter } from "next/router";
import DropdownMenu from "@/shared/components/DropdownMenu";
import DeleteMenuDialog from "../components/DeleteMenuDialog";
import { lightGreen } from "@mui/material/colors";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Colors } from "@/styles/theme";
import { cyan } from "@mui/material/colors";

export default function MenusPage() {
  const { getAllMenus } = useMenuService();
  const [openCreateMenuDialog, setOpenCreateMenuDialog] = useState(false);
  const [openDeleteMenuDialog, setOpenDeleteMenuDialog] = useState(false);
  const [selectedMenuId, setSelectedMenuId] = useState<number>();
  const [allMenus, setAllMenus] = useState<MenuResponse[]>();
  const router = useRouter();

  useEffect(() => {
    const getMenus = async () => {
      const menus = await getAllMenus();
      setAllMenus(menus);
    };

    if (!allMenus) {
      getMenus();
    }
  }, [getAllMenus]);

  const tableHeaders = ["", "Nombre", "Fecha", "Status", "", ""];

  function handleMenuOptionsClick(
    selectedOption: "delete" | "activate",
    menuId: number
  ) {
    setSelectedMenuId(menuId);
    switch (selectedOption) {
      case "delete":
        setOpenDeleteMenuDialog(true);
    }
  }

  const Row = ({ menu }: { menu: MenuResponse }) => {
    const [openRow, setOpenRow] = useState(false);
    const selectedGrey = "#f1f1f166";
    const menuStatus: "Active" | "Inactive" = "Active";

    //Placeholder Items
    const menuItems = [
      {
        name: "Arroz Blanco",
        price: 1.99,
        type: "side",
      },
      {
        name: "Arroz Blanco",
        price: 1.99,
        type: "side",
      },
    ];

    return (
      <>
        <TableRow
          key={menu.name}
          sx={{
            //"&:last-child td, &:last-child th": { border: 0 },
            "& > *": {
              borderBottom: "unset",
            },
            backgroundColor: openRow ? selectedGrey : null,
          }}
        >
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpenRow(!openRow)}
            >
              {openRow ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell sx={{ fontWeight: 600 }}>{menu.name}</TableCell>
          <TableCell>{new Date(menu.date).toLocaleDateString()}</TableCell>
          <TableCell>
            <Chip
              label="Active"
              sx={{
                backgroundColor:
                  menuStatus === "Active" ? lightGreen[600] : cyan[400],
                color: "white",
              }}
            />
          </TableCell>
          <TableCell>
            <ButtonBase
              onClick={() => {
                router.push(""); //TODO
              }}
              sx={{
                fontWeight: 700,
                fontFamily: "Poppins",
                fontSize: 16,
                textDecoration: "underline",
                color: "info.main",
              }}
            >
              Ver Menu
            </ButtonBase>
          </TableCell>
          <TableCell sx={{ width: 4 }}>
            <DropdownMenu
              menuItems={[
                {
                  title: "Delete Menu",
                  onClick: () => handleMenuOptionsClick("delete", menu.id),
                },
              ]}
            />
          </TableCell>
        </TableRow>
        <TableRow sx={{ backgroundColor: openRow ? selectedGrey : null }}>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={openRow} timeout="auto" unmountOnExit>
              <Box sx={{ my: 2, pl: "10%" }} width="90%">
                <Typography
                  gutterBottom
                  component="div"
                  sx={{
                    fontSize: 18,
                    fontWeight: 600,
                    color: Colors.Charcoal,
                  }}
                >
                  Contenido
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell>Nombre</TableCell>
                      <TableCell>Tipo</TableCell>
                      <TableCell align="right">Precio</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {menuItems.map((item) => (
                      <TableRow key={item.name}>
                        <TableCell component="th" scope="row">
                          {item.name}
                        </TableCell>
                        <TableCell>{item.type}</TableCell>
                        <TableCell align="right">{item.price}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </>
    );
  };

  return (
    <Box
      mt={8}
      pt={5}
      pb={10}
      px={5}
      display="flex"
      flexDirection={"column"}
      width={"100%"}
    >
      <Box
        sx={{
          border: 1,
          borderColor: "lightgrey",
          backgroundColor: "#ffffff66",
          mt: 3,
          pt: 3,
          pb: 5,
          px: 5,
          borderRadius: 5,
          width: "80%",
          alignSelf: "center",
        }}
        display={"flex"}
        flexDirection={"column"}
      >
        <Box display="flex" alignSelf={"flex-end"}>
          <Button
            onClick={() => {
              setOpenCreateMenuDialog(true);
            }}
            endIcon={<AddIcon fontSize="large" />}
          >
            Crear menu
          </Button>
        </Box>
        <TableContainer>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                {tableHeaders.map((header) => {
                  return (
                    <TableCell key={header} variant="head">
                      <Typography variant="h6"> {header}</Typography>
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {allMenus ? (
                allMenus.map((menu: MenuResponse) => <Row menu={menu} />)
              ) : (
                <></>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <CreateMenuDialog
        open={openCreateMenuDialog}
        handleClose={async () => {
          setOpenCreateMenuDialog(false);
          setAllMenus(await getAllMenus());
        }}
      />
      {selectedMenuId ? (
        <DeleteMenuDialog
          open={openDeleteMenuDialog}
          handleClose={async () => {
            setOpenDeleteMenuDialog(false);
            setAllMenus(await getAllMenus());
          }}
          menuId={selectedMenuId}
        />
      ) : null}
    </Box>
  );
}

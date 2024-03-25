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
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useEffect, useState } from "react";
import CreateMenuDialog from "../components/CreateMenuDialog";
import { useMenuService } from "@/modules/staff/menu/hooks/useMenuService";
import { MenuResponse } from "../../../../../backend/src/menu/menu.dto";
import { useRouter } from "next/router";
import DropdownMenu from "@/shared/components/DropdownMenu";
import DeleteMenuDialog from "../components/DeleteMenuDialog";

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

  const tableHeaders = ["Nombre", "Fecha", "Status", "", ""];

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
      <Box display="flex" alignSelf={"flex-end"}>
        <Button
          variant="contained"
          onClick={() => {
            setOpenCreateMenuDialog(true);
          }}
          endIcon={<AddIcon fontSize="large" />}
        >
          Crear menu
        </Button>
      </Box>

      <Box
        sx={{
          mt: 3,
          backgroundColor: "#e5e5e566",
          py: 3,
          px: 5,
          borderRadius: 5,
          width: "80%",
          alignSelf: "center",
        }}
      >
        <TableContainer>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                {tableHeaders.map((header) => {
                  return <TableCell variant="head">{header}</TableCell>;
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {allMenus ? (
                allMenus.map((menu) => (
                  <TableRow
                    key={menu.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell sx={{ fontWeight: 600 }}>{menu.name}</TableCell>
                    <TableCell>
                      {new Date(menu.date).toLocaleDateString()}
                    </TableCell>
                    <TableCell>Active</TableCell>
                    <TableCell>
                      <ButtonBase
                        onClick={() => {
                          router.push(""); //TODO
                        }}
                        sx={{
                          fontWeight: 700,
                          fontFamily: "Poppins",
                          fontSize: "16px",
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
                            onClick: () =>
                              handleMenuOptionsClick("delete", menu.id),
                          },
                        ]}
                      />
                    </TableCell>
                  </TableRow>
                ))
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

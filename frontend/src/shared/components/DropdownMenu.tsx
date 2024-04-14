import React, { useState } from "react";
import { Box, IconButton, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Colors } from "@/styles/theme";

export type MenuOptionType = {
  title: string;
  onClick: () => void;
  color?: string;
};

const DropdownMenu = ({
  menuItems,
  disabled = false,
}: {
  menuItems: MenuOptionType[];
  disabled?: boolean;
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [open, setOpen] = useState(false);

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };

  const handleMenuClose = (callback?: () => void) => {
    setAnchorEl(null);
    setOpen(false);
    if (callback) {
      callback();
    }
  };

  return (
    <Box>
      <IconButton onClick={handleMenuOpen} disabled={disabled}>
        <MoreVertIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={() => {
          setAnchorEl(null);
          setOpen(false);
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        elevation={3}
      >
        {menuItems.map((item) => {
          return (
            <MenuItem
              key={item.title}
              onClick={() => handleMenuClose(item.onClick)}
              sx={{ color: item.color ?? Colors.Charcoal }}
            >
              {item.title}
            </MenuItem>
          );
        })}
      </Menu>
    </Box>
  );
};

export default DropdownMenu;

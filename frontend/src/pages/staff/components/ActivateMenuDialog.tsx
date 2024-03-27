import BaseDialog from "../../../shared/components/baseDialog";
import { useMenuService } from "../../../shared/hooks/useMenuService";
import toast from "react-hot-toast";

export default function ActivateMenuDialog({
  open,
  handleClose,
  menuId,
}: {
  open: boolean;
  handleClose: () => void;
  menuId: number;
}) {
  const { activateMenu } = useMenuService();

  async function handleSubmit() {
    const menu = await activateMenu(menuId);

    if (menu.id) {
      toast.success("Menú activado.");
    }

    handleClose();
  }

  return (
    <BaseDialog
      open={open}
      handleClose={handleClose}
      handleSubmit={handleSubmit}
      dialogTitle="¿Activar menu?"
      dialogContent={`¿Estás seguro de que deseas activar este menú? Se desactivara el menu actual.`}
      buttonDetails={{
        primary: { text: "Sí", position: "right" },
        secondary: { text: "No" },
      }}
    />
  );
}

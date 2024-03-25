import BaseDialog from "@/shared/components/baseDialog";
import { useMenuService } from "@/modules/staff/menu/hooks/useMenuService";
import toast from "react-hot-toast";

export default function DeleteMenuDialog({
  open,
  handleClose,
  menuId,
}: {
  open: boolean;
  handleClose: () => void;
  menuId: number;
}) {
  const { deleteMenu } = useMenuService();

  async function handleSubmit() {
    const menu = await deleteMenu(menuId);

    if (menu.id) {
      toast.success("Menú borrado.");
    }

    handleClose();
  }

  return (
    <BaseDialog
      open={open}
      handleClose={handleClose}
      handleSubmit={handleSubmit}
      dialogTitle="Borrar menu?"
      dialogContent={`¿Estás seguro de que deseas eliminar este menú? Una vez borrado, no se podrá acceder a él.`}
      buttonDetails={{
        primary: { text: "No", position: "left" },
        secondary: { text: "Sí" },
      }}
    />
  );
}

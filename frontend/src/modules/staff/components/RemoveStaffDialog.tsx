import BaseDialog from "../../../shared/components/baseDialog";
import toast from "react-hot-toast";
import { useUserService } from "@/shared/hooks/useUserService";

export default function RemoveStaffDialog({
  open,
  handleClose,
  userId,
}: {
  open: boolean;
  handleClose: () => void;
  userId: number;
}) {
  const { removeEmployee } = useUserService();

  async function handleSubmit() {
    const user = await removeEmployee(userId);
    if (user.id) {
      toast.success("Empleado suspendido.");
    }

    handleClose();
  }

  return (
    <BaseDialog
      open={open}
      handleClose={handleClose}
      handleSubmit={handleSubmit}
      dialogTitle="¿Suspender empleado?"
      dialogContent={`¿Estás seguro de que deseas suspender el accesso de este usuario como empleado? Este usuario no tendrá acceso al portal de empleados, pero su cuenta como cliente seguirá activa.`}
      buttonDetails={{
        primary: { text: "No", position: "left" },
        secondary: { text: "Si" },
      }}
    />
  );
}

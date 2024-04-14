import BaseDialog from "../../../shared/components/baseDialog";
import toast from "react-hot-toast";
import { useUserService } from "@/shared/hooks/useUserService";
import { useRouter } from "next/router";

export default function CreateStaffDialog({
  open,
  handleClose,
  userId,
  rerouteLink,
}: {
  open: boolean;
  handleClose: () => void;
  userId: number;
  rerouteLink?: string;
}) {
  const { createEmployee } = useUserService();
  const router = useRouter();

  async function handleSubmit() {
    const user = await createEmployee(userId);

    if (user.id && user.isStaff) {
      if (rerouteLink) {
        router.push(rerouteLink);
        toast.success("Empleado creado. ");
      } else {
        toast.success(
          "Empleado creado. Accede la pestaña de Empleados para ver mas detalles.",
          { duration: 4000 }
        );
      }
    }

    handleClose();
  }

  return (
    <BaseDialog
      open={open}
      handleClose={handleClose}
      handleSubmit={handleSubmit}
      dialogTitle="¿Marcar como empleado?"
      dialogContent={`¿Estás seguro de que deseas marcar este usuario como un empleado? Este usuario tendrá accesso al portal de empleados.`}
      buttonDetails={{
        primary: { text: "No", position: "left" },
        secondary: { text: "Sí" },
      }}
    />
  );
}

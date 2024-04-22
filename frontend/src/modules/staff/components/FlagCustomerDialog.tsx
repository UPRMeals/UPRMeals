import BaseDialog from "../../../shared/components/baseDialog";
import toast from "react-hot-toast";
import { useUserService } from "@/shared/hooks/useUserService";

export default function FlagCustomerDialog({
  open,
  handleClose,
  userId,
}: {
  open: boolean;
  handleClose: () => void;
  userId: number;
}) {
  const { flagCustomer } = useUserService();

  async function handleSubmit() {
    const user = await flagCustomer(userId);

    if (user.id && user.isFlagged) {
      toast.success("Cliente suspendido.");
    }

    handleClose();
  }

  return (
    <BaseDialog
      open={open}
      handleClose={handleClose}
      handleSubmit={handleSubmit}
      dialogTitle="¿Suspender cliente?"
      dialogContent={`¿Estás seguro de que desea suspender este usuario?
      Este usuario no podrá realizar pedidos.
      Serán notificados para que visiten la cafetería para poder levantar la suspensión.`}
      buttonDetails={{
        primary: { text: "No", position: "left" },
        secondary: { text: "Sí" },
      }}
    />
  );
}

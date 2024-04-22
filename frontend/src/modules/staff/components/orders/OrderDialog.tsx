import BaseDialog from "../../../../shared/components/baseDialog";

export default function OrderDialog({
  open,
  handleCloseDialog,
  confirmRemoveOrReject,
}: {
  open: boolean;
  handleCloseDialog: () => void;
  confirmRemoveOrReject: () => void;
}) {
  const dialogTitle = "Confirmar eliminación";
  const dialogContent = "Estas seguro de que deseas eliminar este pedido?";

  return (
    <BaseDialog
      open={open}
      handleClose={handleCloseDialog}
      handleSubmit={confirmRemoveOrReject}
      dialogTitle={dialogTitle}
      dialogContent={dialogContent}
      buttonDetails={{
        primary: { text: "No", position: "left" },
        secondary: { text: "Sí" },
      }}
    />
  );
}

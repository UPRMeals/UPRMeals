import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

type ButtonDetails = {
  primary: {
    text: string;
    position: "left" | "right";
  };
  secondary: {
    text: string;
  };
};

export default function BaseDialog({
  open,
  handleSubmit,
  handleClose,
  dialogTitle,
  buttonDetails,
  dialogContent,
}: {
  open: boolean;
  handleSubmit: () => void;
  handleClose: () => void;
  dialogTitle: string;
  buttonDetails: ButtonDetails;
  dialogContent?: string;
}) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  /* 
  By default: 
  Primary Button -  displayed on the right & handles submit (variant = "contained" always)
  Secondary Button -  displayed on left & handles close

  The button displayed on the right always handles submit.
  */

  const primaryOnClick =
    buttonDetails.primary.position === "left" ? handleClose : handleSubmit;

  const primaryButton = (
    <Button autoFocus onClick={primaryOnClick} variant={"contained"}>
      {buttonDetails.primary.text}
    </Button>
  );

  // If the primary button is displayed on the left, the secondary button handles submit
  const secondaryOnClick =
    buttonDetails.primary.position === "left" ? handleSubmit : handleClose;

  const secondaryButton = (
    <Button autoFocus onClick={secondaryOnClick}>
      {buttonDetails.secondary.text}
    </Button>
  );

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">{dialogTitle}</DialogTitle>
      <DialogContent>
        <DialogContentText color={"text.primary"}>
          {dialogContent}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        {buttonDetails.primary.position === "left" ? (
          <>
            {primaryButton}
            {secondaryButton}
          </>
        ) : (
          <>
            {secondaryButton}
            {primaryButton}
          </>
        )}
      </DialogActions>
    </Dialog>
  );
}

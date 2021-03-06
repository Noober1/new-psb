import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import {
  MouseEvent,
  useImperativeHandle,
  useState,
  forwardRef,
  ElementRef,
} from "react";

type ConfirmDialogProps = {
  title?: string;
  text?: string;
  cancelText?: string;
  confirmText?: string;
  onConfirm?: Function;
  onCancel?: Function;
  autoCloseOnConfirm: boolean;
};

type ConfirmDialogHandle = {
  openConfirm: () => void;
  closeConfirm: () => void;
};

const ConfirmDialogComponent: React.ForwardRefRenderFunction<
  ConfirmDialogHandle,
  ConfirmDialogProps
> = (
  {
    title,
    text,
    cancelText,
    confirmText,
    onCancel,
    onConfirm,
    autoCloseOnConfirm = true,
  },
  ref
) => {
  const [open, setOpen] = useState<boolean>(false);
  const handleCancel = (event: MouseEvent<HTMLElement>) => {
    if (typeof onCancel !== "undefined") onCancel(event);
    setOpen(false);
  };

  const handleConfirm = (
    event: MouseEvent<HTMLElement>,
    autoClose: boolean
  ) => {
    if (typeof onConfirm !== "undefined") {
      onConfirm(event);
      if (autoClose) {
        setOpen(false);
      }
    } else {
      setOpen(false);
    }
  };
  useImperativeHandle(ref, () => ({
    openConfirm: () => setOpen(true),
    closeConfirm: () => setOpen(false),
  }));

  return (
    <Dialog open={open} maxWidth="xs" fullWidth className="text-center">
      <DialogTitle>{title ?? "Konfirmasi"}</DialogTitle>
      <DialogContent>
        <DialogContentText>{text ?? "Apakah anda yakin?"}</DialogContentText>
      </DialogContent>
      <DialogActions className="flex justify-center">
        <div className="w-full md:w-3/4 grid grid-cols-2 gap-2">
          <Button onClick={handleCancel} variant="contained" disableElevation>
            {cancelText ?? "Tidak"}
          </Button>
          <Button
            onClick={(event) => handleConfirm(event, autoCloseOnConfirm)}
            variant="contained"
            disableElevation
          >
            {confirmText ?? "Ya"}
          </Button>
        </div>
      </DialogActions>
    </Dialog>
  );
};

const ConfirmDialog = forwardRef(ConfirmDialogComponent);

export default ConfirmDialog;

export type ConfirmDialogRef = ElementRef<typeof ConfirmDialog>;

import * as React from "react";

import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    width: "500px",
    padding: theme.spacing(2),
    backgroundColor: "rgb(0, 30, 60)",
    color: "#5090D3",
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
    backgroundColor: "rgb(0, 30, 60)",
    color: "#5090D3",
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle
      style={{ backgroundColor: "rgb(17 49 86)", color: "#5090D3" }}
      sx={{ m: 0, p: 2 }}
      {...other}
    >
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
            backgroundColor: "rgb(0, 30, 60)",
            color: "#5090D3",
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

export default function BasicModal({
  content,
  open,
  handleClose,
  header = "",
}) {
  const setHeaderTitle = (title) =>
    title
      .split("")
      .map((letter, index) => {
        if (index === 0) {
          return letter.toUpperCase();
        }
        if (letter === letter.toUpperCase()) {
          return " " + letter;
        }
        return letter;
      })
      .join("");

  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          {setHeaderTitle(header)}
        </BootstrapDialogTitle>
        <DialogContent dividers>{content}</DialogContent>
      </BootstrapDialog>
    </div>
  );
}

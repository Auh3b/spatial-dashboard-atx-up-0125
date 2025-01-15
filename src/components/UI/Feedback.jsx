import { Alert, Snackbar } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFeedback, setFeedback } from "../../store/appStore";

export default function Feedback() {
  const { message = "", status = "" } = useSelector((state) =>
    getFeedback(state),
  );
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(setFeedback({ message: "", status: "" }));
  };
  return (
    <Snackbar
      open={Boolean(message)}
      autoHideDuration={3000}
      onClose={handleClose}>
      <Alert
        severity={status}
        variant="filled"
        sx={{ width: "100%" }}
        onClose={handleClose}>
        {message}
      </Alert>
    </Snackbar>
  );
}

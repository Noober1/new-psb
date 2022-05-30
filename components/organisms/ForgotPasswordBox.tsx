import {
  Button,
  IconButton,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import ChangeAuthMenuButton from "../atoms/ChangeAuthMenuButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ToggleLoginBoxButton from "../atoms/ToggleLoginBoxButton";
import { Formik } from "formik";
import { runDevOnly } from "../../lib";
import Logo from "../atoms/Logo";

type ForgotPasswordForm = {
  email: string;
};

const handleValidateForm = ({ email }: ForgotPasswordForm) => {
  const errors: any = {};
  if (!email) {
    errors.email = "Silahkan masukan email anda";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
    errors.email = "Format email salah";
  } else if (email.length > 50) {
    errors.email = "Email tidak boleh lebih dari 50 karakter";
  }
  return errors;
};

const handleSubmitForm = (values: ForgotPasswordForm, action: any) => {
  // TODO: unfinished
  runDevOnly(() => {
    console.log("submit form");
  });
  action.setSubmitting(false);
};

const ForgotPassword = () => {
  return (
    <Paper
      data-testid="forgot-password-box relative"
      className="p-2 pt-10"
      elevation={0}
    >
      <div className="absolute top-0 left-0 p-1 w-full m-0 grid grid-cols-2">
        <div>
          <ChangeAuthMenuButton type="login">
            <IconButton>
              <ArrowBackIcon />
            </IconButton>
          </ChangeAuthMenuButton>
        </div>
        <div className="text-right">
          <ToggleLoginBoxButton buttonType="icon" closeIcon />
        </div>
      </div>
      <div className="h-28 text-center flex-1 flex items-center justify-center login-logo my-2">
        <Logo className="h-20" />
      </div>
      <Typography variant="body1" align="center">
        Silahkan masukan email Anda untuk melanjutkan
      </Typography>
      <Formik
        initialValues={{ email: "" }}
        onSubmit={handleSubmitForm}
        validate={handleValidateForm}
      >
        {({ values, errors, handleChange, handleSubmit, isSubmitting }) => {
          return (
            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 m-3 gap-3"
            >
              <TextField
                name="email"
                placeholder="Email"
                value={values.email}
                onChange={handleChange}
                error={errors.email ? true : false}
                label={errors.email}
              />
              <Button
                variant="contained"
                size="large"
                type="submit"
                disabled={isSubmitting || Object.keys(errors).length > 0}
              >
                Selanjutnya
              </Button>
            </form>
          );
        }}
      </Formik>
    </Paper>
  );
};

export default ForgotPassword;

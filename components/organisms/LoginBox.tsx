import { Button, Paper, TextField, Typography } from "@mui/material";
import LoginIcon from "@mui/icons-material/VpnKey";
import Logo from "../../public/images/favicon.png";
import Image from "next/image";
import { Formik } from "formik";

type LoginFormValues = {
  email?: string;
  password?: string;
};

const loginAuthFormValues: LoginFormValues = {
  email: "",
  password: "",
};

const loginAuthValidateHandler = (values: LoginFormValues) => {
  const errors: any = {};
  if (!values.email) {
    errors.email = "Silahkan masukan email anda";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = "Format email salah";
  } else if (values.email.length > 50) {
    errors.email = "Email tidak boleh lebih dari 50 karakter";
  }

  if (!values.password) {
    errors.password = "Silahkan masukan kata sandi anda";
  } else if (values.password.length > 20 || values.password.length < 8) {
    errors.password = "Kata sandi antara 8 sampai dengan 20 karakter";
  }

  return errors;
};

const loginAuthSubmitHandler = (values: LoginFormValues, actions: any) => {
  setTimeout(() => {
    console.log({ values, actions });
    actions.setSubmitting(false);
  }, 400);
};

const LoginBox = () => {
  return (
    <Paper className="w-full max-w-md p-4 login-box">
      <div className="h-28 text-center flex items-center justify-center login-logo">
        <img src="/images/favicon.png" className="h-full" />
      </div>
      {/* <Typography
        component="h2"
        variant="h3"
        fontWeight="bold"
        align="center"
        gutterBottom
      >
        SMK Bina Taruna
      </Typography> */}
      <Formik
        initialValues={loginAuthFormValues}
        validate={loginAuthValidateHandler}
        onSubmit={loginAuthSubmitHandler}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <form
            onSubmit={handleSubmit}
            data-testid="login-box-form"
            className="grid grid-cols-1 gap-4"
          >
            <TextField
              name="email"
              role="textbox"
              data-testid="email-login-input"
              placeholder="Email"
              error={errors.email ? true : false}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              label={errors.email}
              required
            />
            <TextField
              type="password"
              role="textbox"
              data-testid="password-login-input"
              name="password"
              placeholder="Kata sandi"
              onChange={handleChange}
              error={errors.password ? true : false}
              onBlur={handleBlur}
              value={values.password}
              label={errors.password}
              required
            />
            <Button
              type="submit"
              size="large"
              data-testid="submit-login-input"
              style={{
                fontSize: 18,
              }}
              disabled={isSubmitting}
              color="primary"
              variant="contained"
            >
              {isSubmitting ? "Memuat..." : "Login Akun"}
            </Button>
          </form>
        )}
      </Formik>
    </Paper>
  );
};

export default LoginBox;

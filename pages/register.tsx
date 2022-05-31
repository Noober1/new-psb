import {
  Button,
  Container,
  FormControl,
  FormHelperText,
  InputLabel,
  Link,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { Formik, FormikComputedProps, FormikProps, FormikState } from "formik";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, {
  ReactElement,
  ReactNode,
  SyntheticEvent,
  useCallback,
  useEffect,
  useState,
} from "react";
import * as Yup from "yup";
import LoadingScreen from "../components/atoms/LoadingScreen";
import PaperWithLoadingOverlay from "../components/atoms/PaperWithLoadingOverlay";
import mediaQuery from "../components/hooks/mediaQuery";
import useLoginPopup from "../components/hooks/useLoginPopup";
import useUserData from "../components/hooks/useUserData";
import MainLayout, { MainLayoutType } from "../components/layouts/Main";
import useLoadingScreen from "../components/hooks/useLoadingScreen";
import ServerSideSelect from "../components/organisms/ServerSideSelect";
import DatePicker from "../components/organisms/DatePicker";
import {
  GoogleReCaptcha,
  GoogleReCaptchaProvider,
  useGoogleReCaptcha,
} from "react-google-recaptcha-v3";
import fetchApi from "../lib/fetchApi";

export interface RegisterFormValues {
  firstName: string;
  lastName: string;
  nisn: string;
  phone: string;
  sex: "L" | "P";
  birthPlace: string;
  birthDate: string;
  lastEducation: "SMP" | "MTS";
  lastSchool: string;
  graduateYear: number;
  email: string;
  selectedMajor: string;
  captchaToken: string;
}

const registerFormInitialValues: RegisterFormValues = {
  firstName: "",
  lastName: "",
  nisn: "",
  birthDate: "",
  birthPlace: "",
  email: "",
  graduateYear: new Date().getFullYear(),
  lastEducation: "SMP",
  lastSchool: "",
  phone: "",
  selectedMajor: "",
  sex: "L",
  captchaToken: "",
};

const graduateYearMin = 1990;
const currentYear = new Date().getFullYear();
const graduateYearOptions = currentYear - graduateYearMin + 1;

const formSchema = Yup.object().shape({
  firstName: Yup.string()
    .max(45, "Panjang maksimal 45 karakter")
    .required("Nama depan harus diisi"),
  lastName: Yup.string().max(45, "Panjang maksimal 45 karakter"),
  middleName: Yup.string().max(10, "Panjang maksimal 10 karakter"),
  nisn: Yup.string()
    .min(8, "Panjang digit minimal 8 digit")
    .max(10, "Panjang maksimal 10 karakter")
    .required("NISN wajib diisi"),
  birthDate: Yup.date().required("Tanggal lahir waji diisi"),
  birthPlace: Yup.string()
    .max(15, "Panjang maksimal 15 karakter")
    .required("Tempat lahir wajib diisi"),
  email: Yup.string()
    .email("Format alamat surel(email) tidak valid")
    .max(50, "Panjang maksimal 50 karakter")
    .required("Email wajib diisi"),
  graduateYear: Yup.number()
    .min(graduateYearMin)
    .max(currentYear)
    .required("Tahun lulus wajib diisi"),
  lastEducation: Yup.string().required("Pendidikan terakhir wajib diisi"),
  lastSchool: Yup.string().required("Asal sekolah wajib diisi"),
  phone: Yup.string()
    .matches(/^[0-9]*$/, "Nomor telpon invalid")
    .max(15, "Panjang maksimal 15 digit angka tanpa simbol ataupun huruf")
    .required("Nomor telpon wajib diisi"),
  selectedMajor: Yup.string().required("Jurusan yang dipilih wajib diisi"),
});

const fakeFetch = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("OK");
    }, 5000);
  });

const Form = ({
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  handleSubmit,
  setFieldValue,
  isSubmitting,
}: FormikProps<RegisterFormValues>) => {
  const isError = (field: keyof typeof registerFormInitialValues) => {
    if (errors[field] && touched[field]) return true;
    return false;
  };

  const helperText = (field: keyof typeof registerFormInitialValues) => {
    if (errors[field] && touched[field]) return errors[field];
  };

  return (
    <form className="grid grid-cols-4 gap-3 gap-y-5" onSubmit={handleSubmit}>
      <TextField
        className="col-span-4 sm:col-span-2 capitalize"
        error={isError("firstName")}
        label="Nama depan"
        name="firstName"
        helperText={helperText("firstName")}
        onBlur={handleBlur}
        value={values.firstName}
        onChange={handleChange}
      />
      <TextField
        className="col-span-4 sm:col-span-2 capitalize"
        error={isError("lastName")}
        label="Nama belakang"
        name="lastName"
        helperText={helperText("lastName")}
        onBlur={handleBlur}
        value={values.lastName}
        onChange={handleChange}
      />
      <TextField
        className="col-span-4 sm:col-span-2 capitalize"
        error={isError("phone")}
        label="Nomor Telpon/Handphone"
        name="phone"
        helperText={helperText("phone")}
        onBlur={handleBlur}
        value={values.phone}
        onChange={handleChange}
      />
      <TextField
        className="col-span-4 sm:col-span-2"
        error={isError("email")}
        label="Alamat surel(email)"
        name="email"
        helperText={helperText("email")}
        onBlur={handleBlur}
        value={values.email}
        onChange={handleChange}
      />
      <TextField
        className="col-span-4 sm:col-span-2 capitalize"
        error={isError("birthPlace")}
        label="Tempat lahir"
        name="birthPlace"
        helperText={helperText("birthPlace")}
        onBlur={handleBlur}
        value={values.birthPlace}
        onChange={handleChange}
      />
      <div className="col-span-4 sm:col-span-2">
        <DatePicker
          error={isError("birthDate")}
          helperText={helperText("birthDate")}
          label="Tanggal lahir"
          onChange={(value) => setFieldValue("birthDate", value)}
        />
      </div>
      <FormControl className="col-span-4 md:col-span-2">
        <InputLabel>Jenis kelamin</InputLabel>
        <Select
          label="Jenis kelamin"
          name="sex"
          onBlur={handleBlur}
          value={values.sex}
          onChange={handleChange}
          required
        >
          <MenuItem value="L">Laki-laki</MenuItem>
          <MenuItem value="P">Perempuan</MenuItem>
        </Select>
      </FormControl>
      <TextField
        className="col-span-4 md:col-span-2"
        error={isError("nisn")}
        label="NISN"
        name="nisn"
        helperText={helperText("nisn")}
        onBlur={handleBlur}
        value={values.nisn}
        onChange={handleChange}
      />
      <FormControl className="col-span-4 lg:col-span-2">
        <InputLabel>Pendidikan Terakhir</InputLabel>
        <Select
          label="Pendidikan Terakhir"
          name="lastEducation"
          onBlur={handleBlur}
          value={values.lastEducation}
          onChange={handleChange}
          required
        >
          <MenuItem value="SMP">SMP</MenuItem>
          <MenuItem value="MTS">MTs</MenuItem>
        </Select>
      </FormControl>
      <div className="col-span-4 md:col-span-2">
        <ServerSideSelect
          error={isError("lastSchool")}
          helperText={helperText("lastSchool")}
          onBlur={handleBlur}
          label="Asal sekolah"
          placeholder="Silahkan pilih"
          valueSelector="id"
          labelSelector="text"
          resultDataKey="results"
          url="https://sas.binataruna.sch.id/AJAX/PSB_getsekolah"
          onChange={(event, value) => {
            setFieldValue("lastSchool", value);
          }}
        />
      </div>
      <FormControl className="col-span-4 md:col-span-2">
        <InputLabel>Tahun lulus</InputLabel>
        <Select
          label="Tahun lulus"
          name="graduateYear"
          onBlur={handleBlur}
          value={values.graduateYear}
          MenuProps={{
            style: {
              maxHeight: 300,
            },
          }}
          onChange={handleChange}
          required
        >
          {Array(graduateYearOptions)
            .fill(null)
            .map((item, index) => (
              <MenuItem value={graduateYearMin + index} key={index}>
                {graduateYearMin + index}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
      <div className="col-span-4 md:col-span-2">
        <ServerSideSelect
          error={isError("selectedMajor")}
          helperText={helperText("selectedMajor")}
          onBlur={handleBlur}
          label="Jurusan yang dipilih"
          placeholder="Silahkan pilih"
          valueSelector="id"
          labelSelector="text"
          resultDataKey="results"
          url="https://sas.binataruna.sch.id/AJAX/PSB_getjurusan"
          onChange={(event, value) => {
            setFieldValue("selectedMajor", value);
          }}
        />
      </div>
      <div className="flex items-center justify-center col-span-4 md:col-span-2">
        <Button
          fullWidth
          type="submit"
          variant="contained"
          size="large"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Memproses" : "Registrasi"}
        </Button>
      </div>
    </form>
  );
};

const RegisterPage: MainLayoutType = () => {
  const router = useRouter();
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [, underSmScreen] = mediaQuery("md");
  const [handleOpenLogin] = useLoginPopup();
  const [, userStatus] = useUserData();
  const isAuthenticated = userStatus == "authenticated";
  const [, openLoadingScreen, hideLoadingScreen] = useLoadingScreen();

  const handleSubmitForm = async (values: RegisterFormValues, actions: any) => {
    try {
      openLoadingScreen("Memproses");
      if (!executeRecaptcha) {
        throw new Error("Google reCaptcha not ready yet");
      }
      const token = await executeRecaptcha("register");
      if (!token) {
        throw new Error("Get captcha token invalid");
      }
      values.captchaToken = token;
      const data = await fetchApi({
        method: "POST",
        url: "/ppdb/register",
        data: values,
      });
    } catch (error) {
      console.log(error);
    }
    hideLoadingScreen();
    actions.setSubmitting(false);
  };

  useEffect(() => {
    if (userStatus == "authenticated") {
      router.push("/");
    }
  }, [userStatus]);

  if (isAuthenticated) return <LoadingScreen position="fixed" />;

  return (
    <Container className="my-24">
      <Typography
        variant="h3"
        fontWeight="bold"
        textAlign={underSmScreen ? "center" : "left"}
      >
        Pendaftaran
      </Typography>
      <Paper className="my-5 p-5">
        <Typography className="mb-10">
          Silahkan untuk mengisi form dibawah ini.
          <br />
          Sudah pernah mendaftar?{" "}
          <Link onClick={handleOpenLogin} className="cursor-pointer">
            Login disini
          </Link>
        </Typography>
        <Formik
          children={Form}
          initialValues={registerFormInitialValues}
          onSubmit={handleSubmitForm}
          validationSchema={formSchema}
        />
      </Paper>
    </Container>
  );
};

RegisterPage.getLayout = (page: ReactElement) => (
  <MainLayout>
    <GoogleReCaptchaProvider
      language="id"
      reCaptchaKey={process.env.NEXT_PUBLIC_CAPTCHA_SITE_KEY}
    >
      {page}
    </GoogleReCaptchaProvider>
  </MainLayout>
);

export const getServerSideProps: GetServerSideProps = async (context) => {
  const checkSession = await getSession(context);

  if (checkSession) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session: checkSession,
    },
  };
};

export default RegisterPage;

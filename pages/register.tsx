import {
  Button,
  Container,
  FormControl,
  InputLabel,
  Link,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Formik, FormikProps } from "formik";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { ReactElement, useEffect } from "react";
import LoadingScreen from "../components/atoms/LoadingScreen";
import mediaQuery from "../components/hooks/mediaQuery";
import useLoginPopup from "../components/hooks/useLoginPopup";
import useUserData from "../components/hooks/useUserData";
import MainLayout, { MainLayoutType } from "../components/layouts/Main";
import useLoadingScreen from "../components/hooks/useLoadingScreen";
import ServerSideSelect from "../components/organisms/ServerSideSelect";
import DatePicker from "../components/organisms/DatePicker";
import {
  GoogleReCaptchaProvider,
  useGoogleReCaptcha,
} from "react-google-recaptcha-v3";
import fetchApi from "../lib/fetchApi";
import axios from "axios";
import useSnackbar from "../components/hooks/useSnackbar";
import Head from "next/head";
import { BasicFormValues } from "../components/layouts/forms/BasicForm";
import { registerSchema } from "../lib/formSchema";
import { formError } from "../lib/formUtils";

type RegisterFormValues = BasicFormValues & {
  nisn: string;
  phone: string;
  email: string;
  captchaToken: string;
};

const registerFormInitialValues: RegisterFormValues = {
  firstName: "",
  lastName: "",
  nisn: "",
  birthDate: new Date().toISOString(),
  birthPlace: "",
  email: "",
  graduateYear: new Date().getFullYear(),
  lastEducation: "SMP",
  lastEducationSchool: "",
  phone: "",
  selectedMajor: "",
  sex: "L",
  captchaToken: "",
};

const graduateYearMin = 1990;
const currentYear = new Date().getFullYear();
const graduateYearOptions = currentYear - graduateYearMin + 1;

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
  const { isError, helperText } = formError(
    errors,
    touched,
    registerFormInitialValues
  );

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
          value={values.birthDate}
          error={isError("birthDate")}
          helperText={helperText("birthDate")}
          label="Tanggal lahir"
          onChange={(value) => setFieldValue("birthDate", value.toISOString())}
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
          <MenuItem value="SMP">Sekolah Menengah Pertama(SMP)</MenuItem>
          <MenuItem value="MTS">Madrasah Tsanawiyah(MTs)</MenuItem>
        </Select>
      </FormControl>
      <div className="col-span-4 md:col-span-2">
        <ServerSideSelect
          error={isError("lastEducationSchool")}
          helperText={helperText("lastEducationSchool")}
          onBlur={handleBlur}
          value={values.lastEducationSchool}
          label="Asal sekolah"
          placeholder="Silahkan pilih"
          valueSelector="kode"
          labelSelector="nama_sekolah"
          url={process.env.NEXT_PUBLIC_API_URL + "/ppdb/sekolah"}
          onChange={(event, value) => {
            setFieldValue("lastEducationSchool", value);
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
          value={values.selectedMajor}
          label="Jurusan yang dipilih"
          placeholder="Silahkan pilih"
          valueSelector="name"
          labelSelector="name"
          url={process.env.NEXT_PUBLIC_API_URL + "/ppdb/jurusan"}
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
  const { handleOpenSnackbar: openSnackbar } = useSnackbar();
  const [, underSmScreen] = mediaQuery("md");
  const [handleOpenLogin] = useLoginPopup();
  const [, userStatus] = useUserData();
  const isAuthenticated = userStatus == "authenticated";
  const [, openLoadingScreen, hideLoadingScreen] = useLoadingScreen();

  const handleSubmitForm = async (values: RegisterFormValues, actions: any) => {
    try {
      openLoadingScreen("Memproses");
      if (!executeRecaptcha) {
        throw new Error("Google reCaptcha is not ready yet");
      }
      const token = await executeRecaptcha("register");
      if (!token) {
        throw new Error("Get captcha token invalid");
      }
      values.captchaToken = token;
      const data: any = await fetchApi({
        method: "POST",
        url: "/ppdb/register",
        data: values,
      });

      if (data.success) {
        router.push(
          {
            pathname: "/login",
            query: {
              registerSuccess: true,
              email: values.email,
              phone: values.phone,
            },
          },
          "login"
        );
      }
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        let errorResponse = err.response?.data as {
          message: string;
          code: string;
        };
        openSnackbar({
          message: errorResponse.message || "Terjadi kesalahan",
          severity: "error",
        });
      } else {
        openSnackbar({
          message: "Terjadi kesalahan",
          severity: "error",
        });
      }
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
    <>
      <Head>
        <title>Pendaftaran - SMK Bina Taruna Jalancagak</title>
      </Head>
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
            validationSchema={registerSchema}
          />
        </Paper>
      </Container>
    </>
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

import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Formik, FormikHelpers } from "formik";
import React from "react";
import { runDevOnly } from "../../../lib";
import { basicSchema } from "../../../lib/formSchema";
import { formError } from "../../../lib/formUtils";
import { StudentBio } from "../../../types/bio";
import useLoadingScreen from "../../hooks/useLoadingScreen";
import DatePicker from "../../organisms/DatePicker";
import ServerSideSelect from "../../organisms/ServerSideSelect";

export interface BasicFormValues {
  firstName: string;
  lastName: string;
  email: string;
  birthPlace: string;
  birthDate: string;
  sex: "L" | "P";
  lastEducation: "SMP" | "MTS";
  lastEducationSchool: string;
  graduateYear: number;
  selectedMajor: string;
}

const BasicForm = ({ data: userBio }: { data: StudentBio }) => {
  const initialValues: BasicFormValues = {
    firstName: userBio?.name.firstName || "",
    lastName: userBio?.name.lastName || "",
    email: userBio?.email || "",
    birthPlace: userBio?.birth.place || "",
    birthDate: userBio?.birth.date || new Date().toISOString(),
    sex: userBio?.body.sex || "L",
    lastEducation: userBio?.lastEducation.grade || "SMP",
    lastEducationSchool: userBio?.lastEducation.school || "",
    graduateYear:
      userBio?.lastEducation.graduateYear || new Date().getFullYear(),
    selectedMajor: userBio?.selectedMajor || "",
  };

  const [loadingScreen, openLoadingScreen, closeLoadingScreen] =
    useLoadingScreen();

  const submitForm = (
    values: BasicFormValues,
    action: FormikHelpers<BasicFormValues>
  ) => {
    runDevOnly(() => {
      console.log(values);
    });
    openLoadingScreen("Menyimpan data");
    setTimeout(() => {
      closeLoadingScreen();
      action.setSubmitting(false);
    }, 5000);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={basicSchema}
      onSubmit={submitForm}
    >
      {({
        handleSubmit,
        handleBlur,
        isSubmitting,
        handleChange,
        values,
        setFieldValue,
        errors,
        touched,
      }) => {
        const { isError, helperText } = formError(
          errors,
          touched,
          initialValues
        );
        return (
          <Box
            component="form"
            className="grid grid-cols-4 gap-3 gap-y-5 p-5"
            onSubmit={handleSubmit}
          >
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
              className="col-span-4 sm:col-span-2"
              label="Alamat surel(email)"
              name="email"
              value={values.email}
              disabled
              helperText="Email tidak dapat dirubah"
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
                onChange={(value) =>
                  setFieldValue("birthDate", value.toISOString())
                }
              />
            </div>
            <FormControl className="col-span-4 sm:col-span-2">
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
                value={values.lastEducation}
                onBlur={handleBlur}
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
                {Array(new Date().getFullYear() - 1990)
                  .fill(null)
                  .map((item, index) => (
                    <MenuItem value={1990 + index} key={index}>
                      {1990 + index}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
            <div className="col-span-4 md:col-span-2">
              <ServerSideSelect
                error={isError("selectedMajor")}
                helperText={helperText("selectedMajor")}
                value={values.selectedMajor}
                onBlur={handleBlur}
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
                {isSubmitting ? "Memproses" : "Simpan"}
              </Button>
            </div>
          </Box>
        );
      }}
    </Formik>
  );
};

export default BasicForm;

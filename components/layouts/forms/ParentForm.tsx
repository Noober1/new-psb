import {
  Box,
  Button,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import axios from "axios";
import { Formik, FormikHelpers } from "formik";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";
import { useMutation } from "react-query";
import { runDevOnly } from "../../../lib";
import { numberSchema, parentSchema } from "../../../lib/formSchema";
import { formError } from "../../../lib/formUtils";
import { StudentBio } from "../../../types/bio";
import useLoadingScreen from "../../hooks/useLoadingScreen";
import useSnackbar from "../../hooks/useSnackbar";

export interface ParentFormValues {
  fatherFullname?: StudentBio["father"]["fullName"];
  fatherBirthDate?: StudentBio["father"]["birthDate"];
  fatherNationality?: StudentBio["father"]["nationality"];
  fatherEducation?: StudentBio["father"]["education"];
  fatherOccupation?: StudentBio["father"]["occupation"];
  fatherIncome?: StudentBio["father"]["income"];
  fatherAddress?: StudentBio["father"]["address"];
  motherFullname?: StudentBio["mother"]["fullName"];
  motherBirthDate?: StudentBio["mother"]["birthDate"];
  motherNationality?: StudentBio["mother"]["nationality"];
  motherEducation?: StudentBio["mother"]["education"];
  motherOccupation?: StudentBio["mother"]["occupation"];
  motherIncome?: StudentBio["mother"]["income"];
  motherAddress?: StudentBio["mother"]["address"];
}

const parentEducation = [
  "PAUD",
  "TK",
  "SD",
  "MI",
  "SMP",
  "MTS",
  "SMK",
  "SMA",
  "MA",
  "D1",
  "D2",
  "D3",
  "S1",
  "S2",
  "S3",
];

const ParentForm = ({ data: userBio }: { data: StudentBio }) => {
  const router = useRouter();
  const { handleOpenSnackbar } = useSnackbar();

  const initialValues: ParentFormValues = {
    fatherFullname: userBio?.father.fullName || "",
    fatherBirthDate: userBio?.father.birthDate || "",
    fatherNationality: userBio?.father.nationality || "",
    fatherEducation: userBio?.father.education || "",
    fatherOccupation: userBio?.father.occupation || "",
    fatherIncome: userBio?.father.income || 0,
    fatherAddress: userBio?.father.address || "",
    motherFullname: userBio?.mother.fullName || "",
    motherBirthDate: userBio?.mother.birthDate || "",
    motherNationality: userBio?.mother.nationality || "",
    motherEducation: userBio?.mother.education || "",
    motherOccupation: userBio?.mother.occupation || "",
    motherIncome: userBio?.mother.income || 0,
    motherAddress: userBio?.mother.address || "",
  };

  const [loadingScreen, openLoadingScreen, closeLoadingScreen] =
    useLoadingScreen();

  // updating functions
  const { data: session } = useSession();
  const updateBio = async (data: ParentFormValues) => {
    if (!session?.accessToken) {
      throw new Error("access token not found");
    }
    const url = process.env.NEXT_PUBLIC_API_URL + "/ppdb/bio/parent";
    const response = await axios
      .put(url, data, {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      })
      .then((result) => result.data);

    if (!response) {
      throw new Error("Error updating bio");
    }

    return response;
  };
  const mutation = useMutation(updateBio);

  const submitForm = (
    values: ParentFormValues,
    action: FormikHelpers<ParentFormValues>
  ) => {
    runDevOnly(() => {
      console.log(values);
    });
    openLoadingScreen("Menyimpan data");
    mutation.mutate(values, {
      onSuccess: () => {
        router.push("/profile");
        handleOpenSnackbar({
          message: "Data berhasil disimpan",
        });
        closeLoadingScreen();
      },
      onError: () => {
        handleOpenSnackbar({
          message: "Data gagal disimpan",
        });
        action.setSubmitting(false);
        closeLoadingScreen();
      },
    });
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={parentSchema}
      onSubmit={submitForm}
    >
      {({
        handleSubmit,
        handleBlur,
        isSubmitting,
        handleChange,
        values,
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
            <Box className="col-span-4 my-3">
              <Divider>Informasi Ayah</Divider>
            </Box>
            <TextField
              className="col-span-4 sm:col-span-2"
              error={isError("fatherFullname")}
              label="Nama lengkap"
              name="fatherFullname"
              helperText={helperText("fatherFullname")}
              onBlur={handleBlur}
              value={values.fatherFullname}
              onChange={handleChange}
            />
            <TextField
              className="col-span-4 sm:col-span-2"
              error={isError("fatherBirthDate")}
              label="Tempat, tanggal lahir"
              name="fatherBirthDate"
              helperText={helperText("fatherBirthDate")}
              onBlur={handleBlur}
              value={values.fatherBirthDate}
              onChange={handleChange}
            />
            <TextField
              className="col-span-4 sm:col-span-2"
              error={isError("fatherNationality")}
              label="Kewarganegaraan"
              name="fatherNationality"
              helperText={helperText("fatherNationality")}
              onBlur={handleBlur}
              value={values.fatherNationality}
              onChange={handleChange}
            />
            <TextField
              className="col-span-4 sm:col-span-2"
              error={isError("fatherOccupation")}
              label="Pekerjaan"
              name="fatherOccupation"
              helperText={helperText("fatherOccupation")}
              onBlur={handleBlur}
              value={values.fatherOccupation}
              onChange={handleChange}
            />
            <FormControl className="col-span-4 lg:col-span-2">
              <InputLabel>Pendidikan Terakhir</InputLabel>
              <Select
                label="Pendidikan Terakhir"
                name="fatherEducation"
                onBlur={handleBlur}
                value={values.fatherEducation}
                onChange={handleChange}
              >
                {parentEducation.map((item) => (
                  <MenuItem key={item} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              className="col-span-4 sm:col-span-2"
              error={isError("fatherIncome")}
              label="Penghasilan perbulan"
              name="fatherIncome"
              helperText={helperText("fatherIncome")}
              onBlur={handleBlur}
              value={values.fatherIncome}
              onChange={handleChange}
            />
            <TextField
              className="col-span-4 sm:col-span-2"
              error={isError("fatherAddress")}
              label="Alamat lengkap"
              name="fatherAddress"
              helperText={helperText("fatherAddress")}
              onBlur={handleBlur}
              value={values.fatherAddress}
              onChange={handleChange}
            />
            <Box className="col-span-4 my-3">
              <Divider>Informasi Ibu</Divider>
            </Box>
            <TextField
              className="col-span-4 sm:col-span-2"
              error={isError("motherFullname")}
              label="Nama lengkap"
              name="motherFullname"
              helperText={helperText("motherFullname")}
              onBlur={handleBlur}
              value={values.motherFullname}
              onChange={handleChange}
            />
            <TextField
              className="col-span-4 sm:col-span-2"
              error={isError("motherBirthDate")}
              label="Tempat, tanggal lahir"
              name="motherBirthDate"
              helperText={helperText("motherBirthDate")}
              onBlur={handleBlur}
              value={values.motherBirthDate}
              onChange={handleChange}
            />
            <TextField
              className="col-span-4 sm:col-span-2"
              error={isError("motherNationality")}
              label="Kewarganegaraan"
              name="motherNationality"
              helperText={helperText("motherNationality")}
              onBlur={handleBlur}
              value={values.motherNationality}
              onChange={handleChange}
            />
            <TextField
              className="col-span-4 sm:col-span-2"
              error={isError("motherOccupation")}
              label="Pekerjaan"
              name="motherOccupation"
              helperText={helperText("motherOccupation")}
              onBlur={handleBlur}
              value={values.motherOccupation}
              onChange={handleChange}
            />
            <FormControl className="col-span-4 lg:col-span-2">
              <InputLabel>Pendidikan Terakhir</InputLabel>
              <Select
                label="Pendidikan Terakhir"
                name="motherEducation"
                onBlur={handleBlur}
                value={values.motherEducation}
                onChange={handleChange}
              >
                {parentEducation.map((item) => (
                  <MenuItem key={item} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              className="col-span-4 sm:col-span-2"
              error={isError("motherIncome")}
              label="Penghasilan perbulan"
              name="motherIncome"
              helperText={helperText("motherIncome")}
              onBlur={handleBlur}
              value={values.motherIncome}
              onChange={handleChange}
            />
            <TextField
              className="col-span-4 sm:col-span-2"
              error={isError("motherAddress")}
              label="Alamat lengkap"
              name="motherAddress"
              helperText={helperText("motherAddress")}
              onBlur={handleBlur}
              value={values.motherAddress}
              onChange={handleChange}
            />
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

export default ParentForm;

import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Formik, FormikHelpers } from "formik";
import React, { useState } from "react";
import { runDevOnly } from "../../../lib";
import { additionalSchema, addressSchema } from "../../../lib/formSchema";
import { formError } from "../../../lib/formUtils";
import { StudentBio } from "../../../types/bio";
import useLoadingScreen from "../../hooks/useLoadingScreen";
import ServerSideSelect from "../../organisms/ServerSideSelect";

export interface AdditionalFormValues {
  livingWith?: StudentBio["livingWith"];
  weight?: StudentBio["body"]["weight"];
  height?: StudentBio["body"]["height"];
  homeToSchoolDistance?: StudentBio["homeToSchoolDistance"];
  bloodType?: StudentBio["body"]["bloodType"];
  relapsingDisease?: StudentBio["disease"]["relapsingDisease"];
  seriousDisease?: StudentBio["disease"]["seriousDisease"];
}

const AdditionalForm = ({ data: userBio }: { data: StudentBio }) => {
  const initialValues: AdditionalFormValues = {
    bloodType: userBio?.body?.bloodType || null,
    weight: userBio?.body?.weight || 0,
    height: userBio?.body?.height || 0,
    homeToSchoolDistance: userBio?.homeToSchoolDistance || 0,
    livingWith: userBio?.livingWith || "",
    relapsingDisease: userBio?.disease?.relapsingDisease || "-",
    seriousDisease: userBio?.disease?.seriousDisease || "-",
  };

  const [loadingScreen, openLoadingScreen, closeLoadingScreen] =
    useLoadingScreen();

  const submitForm = (
    values: AdditionalFormValues,
    action: FormikHelpers<AdditionalFormValues>
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
      validationSchema={additionalSchema}
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
            <TextField
              className="col-span-4 sm:col-span-2"
              error={isError("livingWith")}
              label="Tinggal bersama?"
              name="livingWith"
              helperText={helperText("livingWith")}
              placeholder="Contoh:Orang tua, sendiri, atau lainnya"
              onBlur={handleBlur}
              value={values.livingWith}
              onChange={handleChange}
            />
            <TextField
              className="col-span-4 sm:col-span-2"
              error={isError("height")}
              label="Tinggi badan(CM)"
              name="height"
              helperText={helperText("height")}
              onBlur={handleBlur}
              value={values.height}
              onChange={handleChange}
            />
            <TextField
              className="col-span-4 sm:col-span-2"
              error={isError("weight")}
              label="Berat badan(KG)"
              name="weight"
              helperText={helperText("weight")}
              onBlur={handleBlur}
              value={values.weight}
              onChange={handleChange}
            />
            <TextField
              className="col-span-4 sm:col-span-2"
              error={isError("homeToSchoolDistance")}
              label="Jarak dari tempat tinggal ke sekolah(KM)"
              name="homeToSchoolDistance"
              helperText={helperText("homeToSchoolDistance")}
              onBlur={handleBlur}
              value={values.homeToSchoolDistance}
              onChange={handleChange}
            />
            <FormControl className="col-span-4 lg:col-span-2">
              <InputLabel>Golongan darah</InputLabel>
              <Select
                label="Golongan darah"
                name="bloodType"
                onBlur={handleBlur}
                value={values.bloodType}
                onChange={handleChange}
                required
              >
                {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map(
                  (item) => (
                    <MenuItem key={item} value={item}>
                      {item}
                    </MenuItem>
                  )
                )}
              </Select>
            </FormControl>
            <TextField
              className="col-span-4 sm:col-span-2"
              error={isError("seriousDisease")}
              label="Tinggal bersama?"
              name="seriousDisease"
              helperText={helperText("seriousDisease")}
              placeholder="Isi dengan simbol strip(-) jika tidak ada"
              onBlur={handleBlur}
              value={values.seriousDisease}
              onChange={handleChange}
            />
            <TextField
              className="col-span-4 sm:col-span-2"
              error={isError("relapsingDisease")}
              label="Penyakit kambuhan"
              name="relapsingDisease"
              helperText={helperText("relapsingDisease")}
              placeholder="Isi dengan simbol strip(-) jika tidak ada"
              onBlur={handleBlur}
              value={values.relapsingDisease}
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

export default AdditionalForm;

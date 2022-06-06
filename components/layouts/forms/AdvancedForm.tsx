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
import {
  advancedSchema,
  basicSchema,
  numberSchema,
} from "../../../lib/formSchema";
import { formError } from "../../../lib/formUtils";
import { StudentBio } from "../../../types/bio";
import useLoadingScreen from "../../hooks/useLoadingScreen";

export interface AdvancedFormValues {
  nickname?: StudentBio["name"]["nickname"];
  religion?: StudentBio["religion"];
  nationality?: StudentBio["nationality"];
  childPosition?: StudentBio["family"]["childPosition"];
  siblingCount?: StudentBio["family"]["siblingCount"];
  stepSiblingCount?: StudentBio["family"]["stepSiblingCount"];
  adoptedSiblingCount?: StudentBio["family"]["adoptedSiblingCount"];
  familyStatus?: StudentBio["family"]["familyStatus"];
  motherLanguage?: StudentBio["motherLanguage"];
}

const AdvancedForm = ({ data: userBio }: { data: StudentBio }) => {
  const initialValues: AdvancedFormValues = {
    nickname: userBio?.numbers.NISN || "",
    religion: userBio?.religion || "islam",
    nationality: userBio?.nationality || "",
    childPosition: userBio?.family.childPosition || 0,
    siblingCount: userBio?.family.siblingCount || 0,
    stepSiblingCount: userBio?.family.stepSiblingCount || 0,
    adoptedSiblingCount: userBio?.family.adoptedSiblingCount || 0,
    familyStatus: userBio?.family.familyStatus || "kandung",
    motherLanguage: userBio?.motherLanguage || "",
  };

  const [loadingScreen, openLoadingScreen, closeLoadingScreen] =
    useLoadingScreen();

  const submitForm = (
    values: AdvancedFormValues,
    action: FormikHelpers<AdvancedFormValues>
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
      validationSchema={advancedSchema}
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
              error={isError("nickname")}
              label="Nama panggilan"
              name="nickname"
              helperText={helperText("nickname")}
              onBlur={handleBlur}
              value={values.nickname}
              onChange={handleChange}
            />
            <FormControl className="col-span-4 sm:col-span-2">
              <InputLabel>Agama</InputLabel>
              <Select
                label="Agama"
                name="religion"
                onBlur={handleBlur}
                value={values.religion}
                onChange={handleChange}
                required
              >
                {[
                  "islam",
                  "kristen",
                  "hindu",
                  "budha",
                  "katolik",
                  "konghucu",
                  "lainnya",
                ].map((item) => (
                  <MenuItem key={item} value={item}>
                    <span className="capitalize">{item}</span>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              className="col-span-4 sm:col-span-2"
              error={isError("nationality")}
              label="Kewarganegaraan"
              name="nationality"
              helperText={helperText("nationality")}
              onBlur={handleBlur}
              value={values.nationality}
              onChange={handleChange}
            />
            <TextField
              className="col-span-4 sm:col-span-2"
              error={isError("childPosition")}
              label="Urutan kelahiran dalam keluarga"
              placeholder="Contoh: Jika anak pertama, isi dengan 1"
              name="childPosition"
              helperText={helperText("childPosition")}
              onBlur={handleBlur}
              value={values.childPosition}
              onChange={handleChange}
            />
            <TextField
              className="col-span-4 sm:col-span-2"
              error={isError("siblingCount")}
              label="Jumlah anak kandung dalam keluarga"
              name="siblingCount"
              helperText={helperText("siblingCount")}
              onBlur={handleBlur}
              value={values.siblingCount}
              onChange={handleChange}
            />
            <TextField
              className="col-span-4 sm:col-span-2"
              error={isError("stepSiblingCount")}
              label="Jumlah saudara tiri"
              name="stepSiblingCount"
              helperText={helperText("stepSiblingCount")}
              onBlur={handleBlur}
              value={values.stepSiblingCount}
              onChange={handleChange}
            />
            <TextField
              className="col-span-4 sm:col-span-2"
              error={isError("adoptedSiblingCount")}
              label="Jumlah saudara angkat"
              name="adoptedSiblingCount"
              helperText={helperText("adoptedSiblingCount")}
              onBlur={handleBlur}
              value={values.adoptedSiblingCount}
              onChange={handleChange}
            />
            <FormControl className="col-span-4 sm:col-span-2">
              <InputLabel>Status dalam keluarga</InputLabel>
              <Select
                label="Status dalam keluarga"
                name="familyStatus"
                onBlur={handleBlur}
                value={values.familyStatus}
                onChange={handleChange}
                required
              >
                {["kandung", "angkat", "adopsi", "lainnya"].map((item) => (
                  <MenuItem key={item} value={item}>
                    <span className="capitalize">{item}</span>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              className="col-span-4 sm:col-span-2"
              error={isError("motherLanguage")}
              label="Bahasa yang digunakan di rumah"
              name="motherLanguage"
              helperText={helperText("motherLanguage")}
              onBlur={handleBlur}
              value={values.motherLanguage}
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

export default AdvancedForm;

import { Box, Button, TextField } from "@mui/material";
import axios from "axios";
import { Formik, FormikHelpers, useFormik } from "formik";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";
import { runDevOnly } from "../../../lib";
import { numberSchema } from "../../../lib/formSchema";
import { formError } from "../../../lib/formUtils";
import { StudentBio } from "../../../types/bio";
import useLoadingScreen from "../../hooks/useLoadingScreen";
import useSnackbar from "../../hooks/useSnackbar";
import { useMutation } from "../../../lib/mutation";

export interface NumberFormValues {
  NISNNumber: StudentBio["numbers"]["NISN"];
  phoneNumber: StudentBio["phone"];
  KIPKPSNumber?: StudentBio["numbers"]["KIPKPS"];
  examNumber?: StudentBio["numbers"]["examNumber"];
  ijazahNumber?: StudentBio["numbers"]["certificateNumber"];
  SKHUNNumber?: StudentBio["numbers"]["SKHUNNumber"];
}

const NumberForm = ({ data: userBio }: { data: StudentBio }) => {
  const router = useRouter();
  const { handleOpenSnackbar } = useSnackbar();

  const initialValues: NumberFormValues = {
    NISNNumber: userBio?.numbers.NISN || "",
    phoneNumber: userBio?.phone || "",
    KIPKPSNumber: userBio?.numbers.KIPKPS || "",
    examNumber: userBio?.numbers.examNumber || "",
    ijazahNumber: userBio?.numbers.certificateNumber || "",
    SKHUNNumber: userBio?.numbers.SKHUNNumber || "",
  };

  const [loadingScreen, openLoadingScreen, closeLoadingScreen] =
    useLoadingScreen();

  // updating functions
  const { data: session } = useSession();
  const mutation = useMutation(`/api/student/${session?.id}/number`, "edit");

  const {
    handleSubmit,
    handleBlur,
    isSubmitting,
    handleChange,
    values,
    errors,
    touched,
  } = useFormik({
    initialValues,
    validationSchema: numberSchema,
    onSubmit: (values, actions) => {
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
          actions.setSubmitting(false);
          closeLoadingScreen();
        },
      });
    },
  });

  const { isError, helperText } = formError(errors, touched, initialValues);

  return (
    <Box
      component="form"
      className="grid grid-cols-4 gap-3 gap-y-5 p-5"
      onSubmit={handleSubmit}
    >
      <TextField
        className="col-span-4 sm:col-span-2"
        error={isError("NISNNumber")}
        label="No. Induk Siswa Nasional(NISN)"
        name="NISNNumber"
        helperText={helperText("NISNNumber")}
        onBlur={handleBlur}
        value={values.NISNNumber}
        onChange={handleChange}
      />
      <TextField
        className="col-span-4 sm:col-span-2"
        error={isError("phoneNumber")}
        label="No. Telpon/HandPhone"
        name="phoneNumber"
        helperText={helperText("phoneNumber")}
        onBlur={handleBlur}
        value={values.phoneNumber}
        onChange={handleChange}
      />
      <TextField
        className="col-span-4 sm:col-span-2"
        error={isError("KIPKPSNumber")}
        label="No. KIP/KPS"
        name="KIPKPSNumber"
        helperText={helperText("KIPKPSNumber")}
        onBlur={handleBlur}
        value={values.KIPKPSNumber}
        onChange={handleChange}
      />
      <TextField
        className="col-span-4 sm:col-span-2"
        error={isError("examNumber")}
        label="No. Ujian nasional"
        name="examNumber"
        helperText={helperText("examNumber")}
        onBlur={handleBlur}
        value={values.examNumber}
        onChange={handleChange}
      />
      <TextField
        className="col-span-4 sm:col-span-2"
        error={isError("ijazahNumber")}
        label="No. Ijazah"
        name="ijazahNumber"
        helperText={helperText("ijazahNumber")}
        onBlur={handleBlur}
        value={values.ijazahNumber}
        onChange={handleChange}
      />
      <TextField
        className="col-span-4 sm:col-span-2"
        error={isError("SKHUNNumber")}
        label="No. Surat Keterangan Hasil Ujian Nasional(SKHUN)"
        name="SKHUNNumber"
        helperText={helperText("SKHUNNumber")}
        onBlur={handleBlur}
        value={values.SKHUNNumber}
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
};

export default NumberForm;

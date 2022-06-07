import { Box, Button, TextField } from "@mui/material";
import axios from "axios";
import { Formik, FormikHelpers } from "formik";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";
import { useMutation } from "react-query";
import { runDevOnly } from "../../../lib";
import { numberSchema } from "../../../lib/formSchema";
import { formError } from "../../../lib/formUtils";
import { StudentBio } from "../../../types/bio";
import useLoadingScreen from "../../hooks/useLoadingScreen";
import useSnackbar from "../../hooks/useSnackbar";

export interface NumberFormValues {
  nisn: StudentBio["numbers"]["NISN"];
  phone: StudentBio["phone"];
  kipkps?: StudentBio["numbers"]["KIPKPS"];
  examNumber?: StudentBio["numbers"]["examNumber"];
  certificateNumber?: StudentBio["numbers"]["certificateNumber"];
  SKHUNNumber?: StudentBio["numbers"]["SKHUNNumber"];
}

const NumberForm = ({ data: userBio }: { data: StudentBio }) => {
  const router = useRouter();
  const { handleOpenSnackbar } = useSnackbar();

  const initialValues: NumberFormValues = {
    nisn: userBio?.numbers.NISN || "",
    phone: userBio?.phone || "",
    kipkps: userBio?.numbers.KIPKPS || "",
    examNumber: userBio?.numbers.examNumber || "",
    certificateNumber: userBio?.numbers.certificateNumber || "",
    SKHUNNumber: userBio?.numbers.SKHUNNumber || "",
  };

  const [loadingScreen, openLoadingScreen, closeLoadingScreen] =
    useLoadingScreen();

  // updating functions
  const { data: session } = useSession();
  const updateBio = async (data: NumberFormValues) => {
    if (!session?.accessToken) {
      throw new Error("access token not found");
    }
    const url = process.env.NEXT_PUBLIC_API_URL + "/ppdb/bio/number";
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
    values: NumberFormValues,
    action: FormikHelpers<NumberFormValues>
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
      validationSchema={numberSchema}
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
              error={isError("nisn")}
              label="No. Induk Siswa Nasional(NISN)"
              name="nisn"
              helperText={helperText("nisn")}
              onBlur={handleBlur}
              value={values.nisn}
              onChange={handleChange}
            />
            <TextField
              className="col-span-4 sm:col-span-2"
              error={isError("phone")}
              label="No. Telpon/HandPhone"
              name="phone"
              helperText={helperText("phone")}
              onBlur={handleBlur}
              value={values.phone}
              onChange={handleChange}
            />
            <TextField
              className="col-span-4 sm:col-span-2"
              error={isError("kipkps")}
              label="No. KIP/KPS"
              name="kipkps"
              helperText={helperText("kipkps")}
              onBlur={handleBlur}
              value={values.kipkps}
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
              error={isError("certificateNumber")}
              label="No. Ijazah"
              name="certificateNumber"
              helperText={helperText("certificateNumber")}
              onBlur={handleBlur}
              value={values.certificateNumber}
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
      }}
    </Formik>
  );
};

export default NumberForm;

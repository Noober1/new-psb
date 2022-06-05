import * as Yup from "yup";

const graduateYearMin = 1990;
const currentYear = new Date().getFullYear();

// template basic schema
const _basicSchema = {
  firstName: Yup.string()
    .max(45, "Panjang maksimal 45 karakter")
    .required("Nama depan harus diisi"),
  lastName: Yup.string().max(45, "Panjang maksimal 45 karakter"),
  email: Yup.string()
    .email("Format alamat surel(email) tidak valid")
    .max(50, "Panjang maksimal 50 karakter")
    .required("Email wajib diisi"),
  birthPlace: Yup.string()
    .max(15, "Panjang maksimal 15 karakter")
    .required("Tempat lahir wajib diisi"),
  birthDate: Yup.date().required("Tanggal lahir wajib diisi"),
  graduateYear: Yup.number()
    .min(graduateYearMin)
    .max(currentYear)
    .required("Tahun lulus wajib diisi"),
  lastEducation: Yup.string().required("Pendidikan terakhir wajib diisi"),
  lastEducationSchool: Yup.string().required("Asal sekolah wajib diisi"),
  selectedMajor: Yup.string().required("Jurusan yang dipilih wajib diisi"),
};

// basic profile schema
export const basicSchema = Yup.object().shape(_basicSchema);

// registration form schema
export const registerSchema = Yup.object().shape({
  ..._basicSchema,
  nisn: Yup.string()
    .min(8, "Panjang digit minimal 8 digit")
    .max(10, "Panjang maksimal 10 karakter")
    .required("NISN wajib diisi"),
  phone: Yup.string()
    .matches(/^[0-9]*$/, "Nomor telpon invalid")
    .max(15, "Panjang maksimal 15 digit angka tanpa simbol ataupun huruf")
    .required("Nomor telpon wajib diisi"),
});

// number form schema
export const numberSchema = Yup.object().shape({
  nisn: Yup.string()
    .min(8, "Panjang digit minimal 8 digit")
    .max(10, "Panjang maksimal 10 karakter")
    .required("NISN wajib diisi"),
  phone: Yup.string()
    .matches(/^[0-9]*$/, "Nomor telpon invalid")
    .max(15, "Panjang maksimal 15 digit angka tanpa simbol ataupun huruf")
    .required("Nomor telpon wajib diisi"),
  kipkps: Yup.string().max(14, "Panjang maksimal 14 karakter"),
  examNumber: Yup.string().max(25, "Panjang maksimal 25 karakter"),
  certificateNumber: Yup.string().max(20, "Panjang maksimal 20 karakter"),
  SKHUNNumber: Yup.string().max(20, "Panjang maksimal 20 karakter"),
});

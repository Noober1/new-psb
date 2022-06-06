import * as Yup from "yup";
import { AdvancedFormValues } from "../components/layouts/forms/AdvancedForm";

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

// andvance form schema
export const advancedSchema = Yup.object().shape({
  nickname: Yup.string().max(10, "Panjang maksimal 10 karakter"),
  religion: Yup.string().oneOf([
    "islam",
    "kristen",
    "hindu",
    "budha",
    "katolik",
    "konghucu",
    "lainnya",
  ]),
  nationality: Yup.string().max(30, "Panjang maksimal 30 karakter"),
  adoptedSiblingCount: Yup.number()
    .min(0, "Data tidak boleh negatif")
    .typeError("Data harus berupa angka"),
  childPosition: Yup.number()
    .min(0, "Data tidak boleh negatif")
    .typeError("Data harus berupa angka"),
  familyStatus: Yup.string().oneOf([
    "kandung",
    "angkat",
    "adopsi",
    "lainnya",
    "yatim",
    "piatu",
    "yatim piatu",
  ]),
  motherLanguage: Yup.string().max(20, "Panjang maksimal 20 karakter"),
  siblingCount: Yup.number()
    .typeError("Data harus berupa angka")
    .min(0, "Data tidak boleh negatif"),
  stepSiblingCount: Yup.number()
    .typeError("Data harus berupa angka")
    .min(0, "Data tidak boleh negatif"),
});

// address form schema
export const addressSchema = Yup.object().shape({
  street: Yup.string().max(30, "Panjang maksimal 30 karakter"),
  village: Yup.string().max(30, "Panjang maksimal 30 karakter"),
  district: Yup.string().max(30, "Panjang maksimal 30 karakter"),
  city: Yup.string().max(30, "Panjang maksimal 30 karakter"),
  province: Yup.string().max(30, "Panjang maksimal 30 karakter"),
});

// additional schema
export const additionalSchema = Yup.object().shape({
  livingWith: Yup.string().max(20, "Panjang maksimal 20 karakter"),
  weight: Yup.number()
    .typeError("Data harus berupa angka")
    .min(0, "Data tidak boleh negatif"),
  height: Yup.number()
    .typeError("Data harus berupa angka")
    .min(0, "Data tidak boleh negatif"),
  homeToSchoolDistance: Yup.number().min(0, "Data tidak boleh negatif"),
  bloodType: Yup.string()
    .oneOf(
      ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"],
      "Data tidak valid"
    )
    .required("Data wajib diisi"),
  seriousDisease: Yup.string()
    .typeError("Data harus berupa angka")
    .max(50, "Panjang maksimal 50 karakter"),
  relapseDisease: Yup.string()
    .typeError("Data harus berupa angka")
    .max(50, "Panjang maksimal 50 karakter"),
});

// fatherFullname: userBio?.father.fullName || "",
//   fatherBirthDate: userBio?.father.birthDate || "",
//   fatherNationality: userBio?.father.nationality || "",
//   fatherEducation: userBio?.father.education || null,
//   fatherOccupation: userBio?.father.occupation || "",
//   fatherIncome: userBio?.father.income || 0,
//   fatherAddress: userBio?.father.address || "",

const parentEducationList = [
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

const _parentSchema = {
  fullname: Yup.string().max(50, "Panjang maksimal 50 karakter"),
  birthDate: Yup.string().max(30, "Panjang maksimal 30 karakter"),
  nationality: Yup.string().max(30, "Panjang maksimal 30 karakter"),
  education: Yup.string().oneOf(parentEducationList, "Data invalid"),
  occupation: Yup.string().max(20, "Panjang maksimal 20 karakter"),
  income: Yup.number()
    .max(9999999999, "Data tidak boleh lebih dari 999,999,999,999")
    .min(0, "Data tidak boleh negatif"),
  address: Yup.string().max(75, "Panjang maksimal 75 karakter"),
};

export const parentSchema = Yup.object().shape({
  fatherFullname: _parentSchema.fullname,
  fatherBirthDate: _parentSchema.birthDate,
  fatherNationality: _parentSchema.nationality,
  fatherEducation: _parentSchema.education,
  fatherOccupation: _parentSchema.occupation,
  fatherIncome: _parentSchema.income,
  fatherAddress: _parentSchema.address,
  motherFullname: _parentSchema.fullname,
  motherBirthDate: _parentSchema.birthDate,
  motherNationality: _parentSchema.nationality,
  motherEducation: _parentSchema.education,
  motherOccupation: _parentSchema.occupation,
  motherIncome: _parentSchema.income,
  motherAddress: _parentSchema.address,
});

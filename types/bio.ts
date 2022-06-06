export interface StudentBio {
  id: number;
  PPDBYear: number;
  registerNumber: string;
  registerDate: string;
  email: string;
  phone: string;
  name: {
    firstName: string;
    lastName: string | null;
    fullName: string;
    nickname: string | null;
    initial: string;
  };
  selectedMajor: string;
  disease: {
    relapsingDisease: string | null;
    seriousDisease: string | null;
  };
  numbers: {
    NISN: string;
    KIPKPS: string;
    examNumber: string;
    certificateNumber: string;
    SKHUNNumber: string;
  };
  parentPhone: string | null;
  birth: {
    place: string;
    date: string;
  };
  religion:
    | "islam"
    | "kristen"
    | "katolik"
    | "hindu"
    | "budha"
    | "konghucu"
    | "lainnya";
  nationality: string;
  family: {
    childPosition: number | null;
    siblingCount: number | null;
    stepSiblingCount: number | null;
    adoptedSiblingCount: number | null;
    familyStatus:
      | "kandung"
      | "angkat"
      | "adopsi"
      | "lainnya"
      | "yatim"
      | "piatu"
      | "yatim piatu";
  };
  motherLanguage: string | null;
  livingWith: string | null;
  homeToSchoolDistance: number | null;
  address: {
    street: string | null;
    village: string | null;
    district: string | null;
    city: string | null;
    province: string | null;
    postalCode: number | null;
  };
  body: {
    sex: "L" | "P";
    weight: number | null;
    height: number | null;
    bloodType: "A+" | "A-" | "B+" | "B-" | "O+" | "O-" | "AB+" | "AB-";
  };
  lastEducation: {
    grade: "SMP" | "MTS";
    school: string;
    graduateYear: number;
  };
  father: {
    fullName: string | null;
    birthDate: string | null;
    nationality: string | null;
    education: string | null;
    occupation: string | null;
    income: number | null;
    address: string | null;
  };
  mother: {
    fullName: string | null;
    birthDate: string | null;
    nationality: string | null;
    education: string | null;
    occupation: string | null;
    income: number | null;
    address: string | null;
  };
}

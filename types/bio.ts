type ParentEducation =
  | "PAUD"
  | "TK"
  | "SD"
  | "MI"
  | "SMP"
  | "MTS"
  | "SMK"
  | "SMA"
  | "MA"
  | "D1"
  | "D2"
  | "D3"
  | "S1"
  | "S2"
  | "S3";

interface ParentType {
  fullName?: string | null;
  birthDate?: string | null;
  nationality?: string | null;
  lastEducation?: ParentEducation | null | "";
  job?: string | null | "";
  income?: number | null;
  address?: string | null;
}

interface Address {
  code: string | null;
  name: string | null;
}

export interface BioEditProgress {
  basic: boolean;
  number: boolean;
  parent: boolean;
  address: boolean;
  advanced: boolean;
  additional: boolean;
}

export interface StudentBio {
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
  selectedMajor: {
    id: number;
    name: string;
  };
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
    | "ISLAM"
    | "KRISTEN"
    | "HINDU"
    | "BUDHA"
    | "KATHOLIK"
    | "KONGHUCHU"
    | "LAINNYA";
  nationality: string;
  family: {
    childPosition: number | null;
    siblingCount: number | null;
    stepSiblingCount: number | null;
    adoptedSiblingCount: number | null;
    familyStatus:
      | "ADOPSI"
      | "ANGKAT"
      | "KANDUNG"
      | "PIATU"
      | "YATIM"
      | "YATIM_PIATU"
      | "LAINNYA";
  };
  motherLanguage: string | null;
  livingWith: string | null;
  schoolDistance: number | null;
  address: {
    street: string | null;
    village: Address;
    district: Address;
    city: Address;
    province: Address;
    postalCode: number | null;
  };
  body: {
    sex: "MALE" | "FEMALE";
    weight: number | null;
    height: number | null;
    bloodType: "A" | "B" | "O" | "AB" | null | "";
    bloodRhesus: "PLUS" | "MINUS" | "UNKNOWN";
  };
  lastEducation: {
    id: number;
    grade: "SMP" | "MTS";
    school: string | null;
    graduateYear: number;
  };
  father: ParentType;
  mother: ParentType;
  bioEditProgress: BioEditProgress;
}

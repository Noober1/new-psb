import {
  Box,
  Container,
  Paper,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemText,
  Tab,
  Skeleton,
  Button,
  IconButton,
  Alert,
  AlertTitle,
} from "@mui/material";
import { GetServerSideProps } from "next";
import { getSession, useSession } from "next-auth/react";
import React, {
  ReactElement,
  SyntheticEvent,
  useCallback,
  useEffect,
  useState,
} from "react";
import MainLayout, { MainLayoutType } from "../../components/layouts/Main";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import SchoolIcon from "@mui/icons-material/School";
import DateIcon from "@mui/icons-material/CalendarMonth";
import EditIcon from "@mui/icons-material/Edit";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { QueryFunctionContext, useQuery } from "react-query";
import axios, { AxiosResponse } from "axios";
import { StudentBio } from "../../types/bio";
import { Session } from "next-auth";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "../../components/atoms/Link";
import mediaQuery from "../../components/hooks/mediaQuery";
import CheckIcon from "@mui/icons-material/CheckCircleOutlined";
import LoadingScreen from "../../components/atoms/LoadingScreen";

const ProfilePage: MainLayoutType<{ session: Session }> = ({ session }) => {
  const { status } = useSession();
  const router = useRouter();
  const [upMd, downMd, onlyMd] = mediaQuery("sm");

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push({
        pathname: "/login",
        query: {
          redirectTo: "/profile",
        },
      });
    }
  }, [status]);

  type TabsList = {
    name: string;
    label: string;
  };
  const tabs: TabsList[] = [
    { label: "Dasar", name: "basic" },
    { label: "Nomor", name: "number" },
    { label: "Lanjutan", name: "advanced" },
    { label: "Alamat", name: "address" },
    { label: "Tambahan", name: "additional" },
    { label: "Orang tua", name: "parent" },
  ];
  const [tabValue, setTabValue] = useState<string>("basic");
  const [tabName, setTabName] = useState<string>("Dasar");
  const handleTabChange = (event: SyntheticEvent, newValue: string) => {
    let getTabData = tabs.find((tab) => tab.name === newValue);
    setTabName(getTabData?.label ?? "Dasar");
    setTabValue(newValue);
  };

  const fetchBio = ({ signal }: QueryFunctionContext) =>
    axios
      .get(process.env.NEXT_PUBLIC_API_URL + "/ppdb/bio", {
        headers: { Authorization: `Bearer ${session?.accessToken}` },
        signal,
      })
      .then((response) => response.data);

  const {
    isLoading: fetchLoading,
    data,
    isError,
  } = useQuery<AxiosResponse<StudentBio, any>["data"]>("user-bio", fetchBio);
  const isLoading = fetchLoading && !isError;

  const localizeDate = (date?: string) => {
    try {
      if (!date) return "-";
      const dateObj = new Date(date);
      return new Intl.DateTimeFormat("id-ID", {
        dateStyle: "full",
      }).format(dateObj);
    } catch (error) {
      return "-";
    }
  };

  const localizeCurrency = (value?: number | null) => {
    try {
      if (!value) return "-";
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
      }).format(value);
    } catch (error) {
      return "-";
    }
  };

  return (
    <>
      <Container maxWidth="xl" className="my-24 grid grid-cols-1 gap-4">
        <Paper className="p-2 md:flex text-center justify-between items-center">
          <Box className="flex gap-2 justify-center">
            {isLoading ? (
              <Skeleton width="50%" height={30} />
            ) : (
              <Typography variant="subtitle1" noWrap>
                No. Pendaftaran: <strong>{data?.registerNumber}</strong>
              </Typography>
            )}
          </Box>
          <Box className="flex gap-2 justify-center">
            <Button variant="contained">
              {downMd ? "Cetak" : "Cetak info pendaftaran"}
            </Button>
          </Box>
        </Paper>
        <Paper className="mb-5">
          <Box className="md:flex p-5 gap-5 text-center md:text-left">
            {isLoading ? (
              <Skeleton variant="circular" className="h-28 aspect-square" />
            ) : (
              <Box
                className="h-32 aspect-square rounded-full flex items-center justify-center mx-auto mb-5 md:mb-0"
                sx={{
                  backgroundColor: (theme) => theme.palette.primary.main,
                  color: (theme) => theme.palette.primary.contrastText,
                }}
              >
                <Typography className="text-5xl uppercase">
                  {data?.name.initial || null}
                </Typography>
              </Box>
            )}
            <Box className="overflow-hidden flex-1">
              {isLoading ? (
                <Skeleton height={40} width="75%" />
              ) : (
                <Typography variant="h4" fontWeight="bold" noWrap>
                  {data?.name.fullName}
                </Typography>
              )}
              <Box className="flex items-center justify-center md:justify-start gap-2 w-full">
                {isLoading ? (
                  <Skeleton width="50%" height={30} />
                ) : (
                  <>
                    <CreditCardIcon color="primary" />
                    <Typography variant="subtitle1" fontWeight="bold" noWrap>
                      <Typography color="primary" className="hidden md:inline">
                        No. Pendaftaran:{" "}
                      </Typography>
                      {data?.registerNumber}
                    </Typography>
                  </>
                )}
              </Box>
              <Box className="flex items-center justify-center md:justify-start gap-2 w-full">
                {isLoading ? (
                  <Skeleton width="50%" height={30} />
                ) : (
                  <>
                    <SchoolIcon color="primary" />
                    <Typography variant="subtitle1" fontWeight="bold" noWrap>
                      <Typography color="primary" className="hidden md:inline">
                        Jurusan:{" "}
                      </Typography>
                      {data?.selectedMajor}
                    </Typography>
                  </>
                )}
              </Box>
              <Box className="flex items-center justify-center md:justify-start gap-2 w-full">
                {isLoading ? (
                  <Skeleton width="50%" height={30} />
                ) : (
                  <>
                    <DateIcon color="primary" />
                    <Typography variant="subtitle1" fontWeight="bold" noWrap>
                      <Typography color="primary" className="hidden md:inline">
                        Tgl. Pendaftaran:{" "}
                      </Typography>
                      {localizeDate(data?.registerDate)}
                    </Typography>
                  </>
                )}
              </Box>
            </Box>
          </Box>
        </Paper>
        {isLoading ? (
          <Skeleton height={40} width="25%" />
        ) : (
          <Typography variant="h5" fontWeight="bold">
            Biodata siswa
          </Typography>
        )}
        <Alert>
          <AlertTitle>Informasi</AlertTitle>
          <Typography>
            Silahkan untuk melengkapi data-data yang diperlukan berdasarkan
            kategori dibawah ini. Kategori data yang sudah disunting akan
            ditandai dengan simbol{" "}
            <div className="inline w-0 h-0 relative">
              <CheckIcon className="absolute -top-0.5 left-1" />
            </div>
          </Typography>
        </Alert>
        <Paper>
          {isLoading && (
            <>
              <Box
                className="flex gap-3 px-5 py-2 overflow-hidden"
                sx={{ borderBottom: 1, borderColor: "divider" }}
              >
                <Skeleton component={Tab} />
                <Skeleton component={Tab} />
                <Skeleton component={Tab} />
                <Skeleton component={Tab} />
                <Skeleton component={Tab} />
                <Skeleton component={Tab} />
              </Box>
              <Box className="px-5 py-2">
                <Box className="grid grid-cols-1 md:grid-cols-2">
                  <Box className="mb-5">
                    <Skeleton component={ListItem} width="50%" />
                    <Skeleton component={ListItemText} width="75%" />
                  </Box>
                  <Box className="mb-5">
                    <Skeleton component={ListItem} width="50%" />
                    <Skeleton component={ListItemText} width="75%" />
                  </Box>
                  <Box className="mb-5">
                    <Skeleton component={ListItem} width="50%" />
                    <Skeleton component={ListItemText} width="75%" />
                  </Box>
                  <Box className="mb-5">
                    <Skeleton component={ListItem} width="50%" />
                    <Skeleton component={ListItemText} width="75%" />
                  </Box>
                  <Box className="mb-5">
                    <Skeleton component={ListItem} width="50%" />
                    <Skeleton component={ListItemText} width="75%" />
                  </Box>
                  <Box className="mb-5">
                    <Skeleton component={ListItem} width="50%" />
                    <Skeleton component={ListItemText} width="75%" />
                  </Box>
                </Box>
              </Box>
            </>
          )}
          {!isLoading && (
            <TabContext value={tabValue}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList
                  value={0}
                  variant="scrollable"
                  allowScrollButtonsMobile
                  onChange={handleTabChange}
                >
                  <Tab
                    label="Dasar"
                    value="basic"
                    iconPosition="start"
                    icon={
                      data?.bioEditProgress.basic ? <CheckIcon /> : undefined
                    }
                  />
                  <Tab
                    label="Nomor"
                    value="number"
                    iconPosition="start"
                    icon={
                      data?.bioEditProgress.number ? <CheckIcon /> : undefined
                    }
                  />
                  <Tab
                    label="Lanjutan"
                    value="advanced"
                    iconPosition="start"
                    icon={
                      data?.bioEditProgress.advanced ? <CheckIcon /> : undefined
                    }
                  />
                  <Tab
                    label="Alamat"
                    value="address"
                    iconPosition="start"
                    icon={
                      data?.bioEditProgress.address ? <CheckIcon /> : undefined
                    }
                  />
                  <Tab
                    label="Tambahan"
                    value="additional"
                    iconPosition="start"
                    icon={
                      data?.bioEditProgress.additional ? (
                        <CheckIcon />
                      ) : undefined
                    }
                  />
                  <Tab
                    label="Orang tua"
                    value="parent"
                    iconPosition="start"
                    icon={
                      data?.bioEditProgress.parent ? <CheckIcon /> : undefined
                    }
                  />
                </TabList>
              </Box>
              <Box className="p-3 px-5 flex justify-between items-center flex-col sm:flex-row">
                <Typography variant="h5" className="mb-3 md:mb-0">
                  Informasi {tabName}
                </Typography>
                <Button
                  variant="contained"
                  startIcon={<EditIcon />}
                  LinkComponent={Link}
                  href={`/profile/edit/${tabValue}`}
                >
                  {downMd ? "Edit" : <>Edit informasi {tabName}</>}
                </Button>
              </Box>
              <Divider />
              <TabPanel className="p-0" value="basic">
                <Box className="p-2" data-section="box-section">
                  <List className="grid grid-cols-1 md:grid-cols-2">
                    <ListItem>
                      <ListItemText
                        primary="Nama depan"
                        secondary={data?.name.firstName}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Nama belakang"
                        secondary={data?.name.lastName || "-"}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Alamat surel/email"
                        secondary={data?.email}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Tempat lahir"
                        secondary={data?.birth.place}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Tanggal lahir"
                        secondary={localizeDate(data?.birth.date)}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Jenis kelamin"
                        secondary={
                          data?.body.sex == "L"
                            ? "Laki-laki"
                            : data?.body.sex == "P"
                            ? "Perempuan"
                            : "-"
                        }
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Pendidikan terakhir"
                        secondary={data?.lastEducation.grade}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Asal sekolah"
                        secondary={data?.lastEducation.school.name}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Tahun lulus"
                        secondary={data?.lastEducation.graduateYear}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Jurusan yang dipilih"
                        secondary={data?.selectedMajor}
                      />
                    </ListItem>
                  </List>
                </Box>
              </TabPanel>
              <TabPanel className="p-0" value="number">
                <Box className="p-2" data-section="box-section">
                  <List className="grid grid-cols-1 md:grid-cols-2">
                    <ListItem>
                      <ListItemText
                        primary="No. Induk Siswa Nasional(NISN)"
                        secondary={data?.numbers.NISN}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="No. Telpon/Handphone"
                        secondary={data?.phone}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="No. KIP/KPS"
                        secondary={data?.numbers.KIPKPS || "-"}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="No. Ujian Nasional"
                        secondary={data?.numbers.examNumber || "-"}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="No. Ijazah"
                        secondary={data?.numbers.certificateNumber || "-"}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="No. Surat Keterangan Hasil Ujian Nasional"
                        secondary={data?.numbers.SKHUNNumber || "-"}
                      />
                    </ListItem>
                  </List>
                </Box>
              </TabPanel>
              <TabPanel className="p-0" value="advanced">
                <Box className="p-2" data-section="box-section">
                  <List className="grid grid-cols-1 md:grid-cols-2">
                    <ListItem>
                      <ListItemText
                        primary="Nama panggilan"
                        secondary={data?.name.nickname || "-"}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Agama"
                        className="capitalize"
                        secondary={data?.religion || "-"}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Kewarganegaraan"
                        secondary={data?.nationality || "-"}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Urutan kelahiran"
                        secondary={`Anak ke ${
                          data?.family.childPosition || "-"
                        } dari ${data?.family.siblingCount || "-"} bersaudara`}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Jumlah saudara kandung"
                        secondary={data?.family.siblingCount || "-"}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Jumlah saudara tiri"
                        secondary={data?.family.stepSiblingCount || "-"}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Jumlah saudara angkat"
                        secondary={data?.family.adoptedSiblingCount || "-"}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Status di keluarga"
                        secondary={data?.family.familyStatus || "-"}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Bahasa yang digunakan dirumah"
                        secondary={data?.motherLanguage || "-"}
                      />
                    </ListItem>
                  </List>
                </Box>
              </TabPanel>
              <TabPanel className="p-0" value="address">
                <Box className="p-2" data-section="box-section">
                  <List className="grid grid-cols-1 md:grid-cols-2">
                    <ListItem>
                      <ListItemText
                        primary="Jalan/kampung/dusun"
                        secondary={data?.address.street || "-"}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Provinsi"
                        secondary={data?.address.province.name || "-"}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Kabupaten"
                        secondary={data?.address.city.name || "-"}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Desa/kecamatan"
                        secondary={data?.address.district.name || "-"}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Kampung/desa"
                        secondary={data?.address.village.name || "-"}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Kode POS"
                        secondary={data?.address.postalCode || "-"}
                      />
                    </ListItem>
                  </List>
                </Box>
              </TabPanel>
              <TabPanel className="p-0" value="additional">
                <Box className="p-2" data-section="box-section">
                  <List className="grid grid-cols-1 md:grid-cols-2">
                    <ListItem>
                      <ListItemText
                        primary="Tinggal bersama"
                        secondary={data?.livingWith || "-"}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Tinggi badan"
                        secondary={`${data?.body.height || "-"} CM`}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Berat badan"
                        secondary={`${data?.body.weight || "-"} Kg`}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Jarak dari tempat tinggal ke sekolah"
                        secondary={`${data?.homeToSchoolDistance || "-"} KM`}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Golongan darah"
                        secondary={data?.body.bloodType || "-"}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Penyakit berat yang pernah diderita"
                        secondary={data?.disease.seriousDisease || "-"}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Penyakit kambuhan"
                        secondary={data?.disease.relapsingDisease || "-"}
                      />
                    </ListItem>
                  </List>
                </Box>
              </TabPanel>
              <TabPanel className="p-0 pt-10" value="parent">
                <Divider>
                  <Typography variant="h5" fontWeight="bold">
                    Informasi ayah
                  </Typography>
                </Divider>
                <Box className="p-2" data-section="box-section">
                  <List className="grid grid-cols-1 md:grid-cols-2">
                    <ListItem>
                      <ListItemText
                        primary="Nama lengkap"
                        secondary={data?.father.fullName || "-"}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Tempat, tanggal lahir"
                        secondary={data?.father.birthDate || "-"}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Kewarganegaraan"
                        secondary={data?.father.nationality || "-"}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Pendidikan terakhir"
                        secondary={data?.father.education || "-"}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Pekerjaan"
                        secondary={data?.father.occupation || "-"}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Penghasilan perbulan"
                        secondary={localizeCurrency(data?.father.income) || "-"}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Alamat lengkap"
                        secondary={data?.father.address || "-"}
                      />
                    </ListItem>
                  </List>
                </Box>
                <Divider>
                  <Typography variant="h5" fontWeight="bold">
                    Informasi ibu
                  </Typography>
                </Divider>
                <Box className="p-2" data-section="box-section">
                  <List className="grid grid-cols-1 md:grid-cols-2">
                    <ListItem>
                      <ListItemText
                        primary="Nama lengkap"
                        secondary={data?.mother.fullName || "-"}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Tempat, tanggal lahir"
                        secondary={data?.mother.birthDate || "-"}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Kewarganegaraan"
                        secondary={data?.mother.nationality || "-"}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Pendidikan terakhir"
                        secondary={data?.mother.education || "-"}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Pekerjaan"
                        secondary={data?.mother.occupation || "-"}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Penghasilan perbulan"
                        secondary={localizeCurrency(data?.mother.income) || "-"}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Alamat lengkap"
                        secondary={data?.mother.address || "-"}
                      />
                    </ListItem>
                  </List>
                </Box>
              </TabPanel>
            </TabContext>
          )}
        </Paper>
      </Container>
      {status === "unauthenticated" && <LoadingScreen position="fixed" />}
    </>
  );
};

ProfilePage.getLayout = (page: ReactElement) => (
  <>
    <Head>
      <title>Profile - SMK Bina Taruna Jalancagak</title>
    </Head>
    <MainLayout>{page}</MainLayout>
  </>
);

export const getServerSideProps: GetServerSideProps = async (context) => {
  const hasSession = await getSession(context);

  if (!hasSession) {
    return {
      redirect: {
        destination: "/login?redirectTo=" + encodeURI(context.resolvedUrl),
        permanent: false,
      },
    };
  }

  return {
    props: {
      session: hasSession,
    },
  };
};

export default ProfilePage;

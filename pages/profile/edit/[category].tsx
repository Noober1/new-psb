import {
  Box,
  Button,
  Container,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import axios from "axios";
import { GetServerSideProps } from "next";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { ReactElement, useEffect } from "react";
import LoadingScreen from "../../../components/atoms/LoadingScreen";
import BackIcon from "@mui/icons-material/ArrowBack";
import BasicForm from "../../../components/layouts/forms/BasicForm";
import NumberForm from "../../../components/layouts/forms/NumberForm";
import MainLayout, { MainLayoutType } from "../../../components/layouts/Main";
import { StudentBio } from "../../../types/bio";
import Link from "../../../components/atoms/Link";
import AdvancedForm from "../../../components/layouts/forms/AdvancedForm";
import AddressForm from "../../../components/layouts/forms/AddressForm";
import ParentForm from "../../../components/layouts/forms/ParentForm";
import Head from "next/head";
import AdditionalForm from "../../../components/layouts/forms/AdditionalForm";

const categoryList = [
  "basic",
  "number",
  "advanced",
  "address",
  "additional",
  "parent",
];

interface ProfileEditProps {
  category: string;
  biodata: StudentBio;
}

const EditProfile: MainLayoutType<ProfileEditProps> = ({
  category,
  biodata,
}: ProfileEditProps) => {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status]);

  if (status === "unauthenticated") return <LoadingScreen position="fixed" />;

  return (
    <Container maxWidth="xl" className="mt-24 mb-5 flex flex-col gap-2">
      <Box className="text-center md:text-left">
        <Button
          startIcon={<BackIcon />}
          LinkComponent={Link}
          color="inherit"
          href="/profile"
          size="large"
        >
          Batalkan
        </Button>
      </Box>
      <Paper>
        <Box className="p-5">
          <Typography variant="h4" fontWeight="bold">
            Edit Profile
          </Typography>
          <Typography>Silahkan untuk mengisi data dibawah ini</Typography>
        </Box>
        {category === "basic" ? (
          <BasicForm data={biodata} />
        ) : category === "number" ? (
          <NumberForm data={biodata} />
        ) : category === "advanced" ? (
          <AdvancedForm data={biodata} />
        ) : category === "address" ? (
          <AddressForm data={biodata} />
        ) : category === "additional" ? (
          <AdditionalForm data={biodata} />
        ) : (
          <ParentForm data={biodata} />
        )}
      </Paper>
    </Container>
  );
};

EditProfile.getLayout = (page: ReactElement) => (
  <>
    <Head>
      <title>Edit Profile</title>
    </Head>
    <MainLayout>{page}</MainLayout>
  </>
);

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const category = context.params?.category as string;
    const session = await getSession(context);
    console.log(session);
    //if category is not in categoryList OR session data is not found, redirect to homepage
    if (!categoryList.includes(category) || !session) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }

    const getProfile = await axios
      .get(process.env.NEXT_PUBLIC_API_URL + "/ppdb/bio", {
        headers: { Authorization: `Bearer ${session?.accessToken}` },
      })
      .then((response) => response.data);

    return {
      props: {
        category,
        biodata: getProfile,
      },
    };
  } catch (error) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
};

export default EditProfile;

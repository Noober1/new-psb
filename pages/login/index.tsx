import { Button, Typography } from "@mui/material";
import { GetServerSideProps } from "next";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import HomeIcon from "@mui/icons-material/Home";
import Link from "../../components/atoms/Link";
import LoadingScreen from "../../components/atoms/LoadingScreen";
import ToggleDarkModeButton from "../../components/atoms/ToggleDarkModeButton";
import LoginBox from "../../components/organisms/LoginBox";
import { NextSeo } from "next-seo";

const LoginPage = () => {
  const { status } = useSession();
  const isAuthenticated = status === "authenticated";
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
  }, [status]);

  if (isAuthenticated) return <LoadingScreen />;

  return (
    <>
      <NextSeo title="Login" />
      <div
        className="w-screen h-screen flex items-center justify-center"
        data-testid="login-page"
      >
        <div className="w-full max-w-md">
          <Typography
            variant="h4"
            fontWeight="bold"
            textAlign="center"
            gutterBottom
          >
            Pendaftaran Siswa Baru
          </Typography>
          <LoginBox elevation={1} />
          <div className="text-center w-full my-5 flex gap-2 justify-center">
            <ToggleDarkModeButton buttonType="button" />
            <Button
              variant="contained"
              startIcon={<HomeIcon />}
              LinkComponent={Link}
              href="/"
            >
              Ke beranda
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const checkSession = await getSession(context);

  if (checkSession) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session: checkSession,
    },
  };
};

export default LoginPage;

import { Button, Typography } from "@mui/material";
import { alpha, Box } from "@mui/system";
import { useSession } from "next-auth/react";
import Link from "../atoms/Link";
import useToggleOpenLoginBox from "../hooks/useToggleLoginPopup";

const Hero = () => {
  const { data: session } = useSession();
  const openLoginBox = useToggleOpenLoginBox();

  return (
    <div className="w-full hero bg-cover bg-no-repeat bg-center">
      <Box
        className="grid grid-cols-2 h-screen"
        sx={(theme) => ({
          minHeight: 400,
          backgroundColor: alpha(theme.palette.background.paper, 0.8),
        })}
      >
        <div></div>
        <div className="flex h-full flex-col justify-center pr-10">
          <div>
            <Typography variant="h3" component="h2" fontWeight="bold">
              {session?.isLoggedIn
                ? `Hallo, ${session?.user?.name}`
                : "Pendaftaran Siswa Baru"}
            </Typography>
            {!session?.isLoggedIn && (
              <Typography variant="h5" component="h1">
                SMK Bina Taruna Jalancagak
              </Typography>
            )}
            {session?.isLoggedIn && (
              <Typography variant="h6">
                Anda telah terdaftar sebagai calon siswa
                {" " + process.env.NEXT_PUBLIC_COMPANY_NAME}.<br />
                Silahkan kunjungi halaman 'Panduan' untuk informasi lebih
                lanjut.
              </Typography>
            )}
          </div>
          <div className="flex gap-2 my-5 opacity-90">
            <Button LinkComponent={Link} href="/guide" variant="contained">
              Panduan
            </Button>
            {!session?.isLoggedIn ? (
              <>
                <Button
                  onClick={openLoginBox}
                  variant="contained"
                  data-testid="login-box-button-from-hero"
                >
                  Login
                </Button>
                <Button
                  LinkComponent={Link}
                  href="/register"
                  variant="contained"
                >
                  Daftar sekarang
                </Button>
              </>
            ) : (
              <Button LinkComponent={Link} href="/profile" variant="contained">
                Profile
              </Button>
            )}
          </div>
        </div>
      </Box>
    </div>
  );
};

export default Hero;

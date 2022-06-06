import { Button, Typography, Link as MuiLink } from "@mui/material";
import { alpha, Box } from "@mui/system";
import { FunctionComponent } from "react";
import Link from "../atoms/Link";
import useLoginPopup from "../hooks/useLoginPopup";
import useUserData from "../hooks/useUserData";

const Hero: FunctionComponent = () => {
  const [toggleLoginBox] = useLoginPopup();
  const [userData, userStatus] = useUserData();
  const isAuthenticated = userStatus === "authenticated";

  return (
    <Box
      className="hero hero-image"
      sx={{
        "&::after": {
          content: "''",
          backgroundColor: (theme) =>
            alpha(theme.palette.background.default, 0.4),
        },
      }}
    >
      <Box
        className="grid grid-cols-2 h-screen"
        sx={() => ({
          minHeight: 400,
        })}
      >
        <div className="col-span-2 lg:col-span-1 hidden lg:flex"></div>
        <div className="col-span-2 text-center lg:text-left lg:col-span-1 flex h-full flex-col justify-center lg:pr-10 z-10">
          {(!isAuthenticated || !userData) && (
            <>
              <Typography variant="h2" component="h1" fontWeight="bold">
                Selamat datang di
              </Typography>
              <Typography variant="h4" fontWeight="bold">
                Pendaftaran Siswa Baru
              </Typography>
              <Typography fontWeight={500}>
                Kunjungi halaman{" "}
                <Link
                  underline="always"
                  href="/guide"
                  color="inherit"
                  fontWeight="bold"
                >
                  Panduan
                </Link>{" "}
                untuk melihat panduan lengkap.
              </Typography>
            </>
          )}
          {isAuthenticated && userData && (
            <>
              <Typography variant="h5" fontWeight="bold">
                Selamat datang,
              </Typography>
              <Typography
                variant="h3"
                fontWeight="bold"
                textTransform="uppercase"
                noWrap
              >
                {userData?.fullName}
              </Typography>
              <Typography fontWeight={500}>
                Silahkan untuk mengunjungi halaman{" "}
                <Link
                  underline="always"
                  href="/profile"
                  color="inherit"
                  fontWeight="bold"
                >
                  Profile
                </Link>{" "}
                untuk melihat informasi pendaftaran anda.
              </Typography>
            </>
          )}
          <div className="justify-center lg:justify-start flex gap-2 my-5 opacity-95">
            <Button LinkComponent={Link} href="/guide" variant="contained">
              Panduan
            </Button>
            {!isAuthenticated ? (
              <>
                <Button
                  onClick={() => toggleLoginBox()}
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
                  Daftar
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
    </Box>
  );
};

Hero.defaultProps = {
  userData: {},
};

export default Hero;

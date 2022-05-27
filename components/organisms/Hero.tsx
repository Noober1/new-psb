import { Button, Typography } from "@mui/material";
import { alpha, Box } from "@mui/system";
import Link from "../atoms/Link";
import useToggleOpenLoginBox from "../hooks/useToggleLoginPopup";

type UserData = {
  name: string;
};

type HeroProps = {
  userData: UserData;
};

const Hero = ({ userData }: HeroProps) => {
  const openLoginBox = useToggleOpenLoginBox();
  const hasUserData = Object.keys(userData).length > 0;

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
        sx={(theme) => ({
          minHeight: 400,
        })}
      >
        <div></div>
        <div className="flex h-full flex-col justify-center pr-10 z-10">
          <div>
            <Typography variant="h1" className="text-white">
              disini entahlah
            </Typography>
          </div>
          <div className="flex gap-2 my-5 opacity-90">
            <Button LinkComponent={Link} href="/guide" variant="contained">
              Panduan
            </Button>
            <Button>BUtton list</Button>
            {/* {!session?.isLoggedIn ? (
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
            )} */}
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

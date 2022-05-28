import { Box, Paper, Typography } from "@mui/material";
import Link from "../components/atoms/Link";

const NotFoundPage = () => {
  return (
    <Box className="w-screen h-screen overflow-hidden flex items-center justify-center">
      <div className="w-full max-w-md flex items-center">
        <Typography
          variant="h1"
          fontWeight="bold"
          sx={{
            backgroundColor: (theme) => theme.palette.text.primary,
            color: (theme) => theme.palette.background.paper,
          }}
        >
          404
        </Typography>
        <div className="my-4 ml-2">
          <Typography variant="subtitle1" gutterBottom>
            Oops, halaman yang anda cari tidak ditemukan.
          </Typography>
          <Link href="/" fontWeight="bold" color="inherit">
            Ke halaman utama.
          </Link>
        </div>
      </div>
    </Box>
  );
};

export default NotFoundPage;

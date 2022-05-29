import { Box, Paper, Typography } from "@mui/material";
import Link from "../components/atoms/Link";

const NotFoundPage = () => {
  return (
    <Box className="w-screen h-screen overflow-hidden flex items-center justify-center">
      <Box
        className="w-full max-w-md grid-cols-1 md:flex items-center p-2"
        bgcolor={(theme) => theme.palette.secondary.main}
      >
        <Typography
          variant="h1"
          fontWeight="bold"
          sx={{
            backgroundColor: (theme) => theme.palette.primary.main,
            color: (theme) => theme.palette.background.paper,
          }}
          className="px-2 text-center "
        >
          404
        </Typography>
        <div className="my-4 ml-2">
          <Typography variant="subtitle1" gutterBottom className="text-black">
            Oops, halaman yang anda cari tidak ditemukan.
          </Typography>
          <Link href="/" fontWeight="bold">
            Ke halaman utama.
          </Link>
        </div>
      </Box>
    </Box>
  );
};

export default NotFoundPage;

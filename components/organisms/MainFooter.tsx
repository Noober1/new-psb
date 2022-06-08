import {
  Box,
  Container,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import EmailIcon from "@mui/icons-material/Email";
import HomeIcon from "@mui/icons-material/Home";
import { ReactElement } from "react";
import Logo from "../atoms/Logo";

const MainFooter = () => {
  const ListIcon = ({ children }: { children: ReactElement }) => (
    <ListItemIcon className="min-w-0 w-10">{children}</ListItemIcon>
  );

  return (
    <Paper elevation={0} className="rounded-none py-5" component="footer">
      <Container maxWidth="xl">
        <Box className="grid grid-cols-1 md:grid-cols-2">
          <Box>
            <Typography
              variant="h5"
              className="ml-5"
              color="textPrimary"
              fontWeight="bold"
            >
              Hubungi Kami
            </Typography>
            <List dense>
              <ListItem>
                <ListIcon>
                  <LocationOnIcon color="error" />
                </ListIcon>
                <ListItemText>
                  Jl. Bunihayu No. 76 RT. 18 RW. 02
                  <br />
                  Desa. Jalancagak, Kecamatan. Jalancagak
                  <br />
                  Kabupaten Subang - Jawa Barat
                </ListItemText>
              </ListItem>
              <ListItem>
                <ListIcon>
                  <LocalPhoneIcon color="info" />
                </ListIcon>
                <ListItemText>(0260) 472710</ListItemText>
              </ListItem>
              <ListItem>
                <ListIcon>
                  <WhatsAppIcon color="success" />
                </ListIcon>
                <ListItemText>0823 1526 4548</ListItemText>
              </ListItem>
              <ListItem>
                <ListIcon>
                  <AlternateEmailIcon />
                </ListIcon>
                <ListItemText>smks.binataruna.jlcgk@gmail.com</ListItemText>
              </ListItem>
            </List>
          </Box>
          <Box className="flex justify-between flex-col">
            <Box className="flex justify-center md:justify-end">
              <Logo className="h-28 hidden md:inline" />
            </Box>
            <Box className="flex items-center mt-5 md:mt-0 md:items-end justify-end flex-col">
              <Typography fontWeight="bold" variant="h6" className="mr-3">
                Tautan dan Sosial Media
              </Typography>
              <Box>
                <IconButton href="https://smk.binataruna.sch.id">
                  <HomeIcon fontSize="large" />
                </IconButton>
                <IconButton href="https://fb.me/binatarunasubang">
                  <FacebookIcon fontSize="large" />
                </IconButton>
                <IconButton href="https://www.instagram.com/smkbinatarunajalancagak">
                  <InstagramIcon fontSize="large" />
                </IconButton>
                <IconButton href="mailto:smks.binataruna.jlcgk@gmail.com">
                  <EmailIcon fontSize="large" />
                </IconButton>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
      <Box textAlign="center" className="mt-4">
        <Typography>
          &copy;2022 <strong>Yayasan Bina taruna Jalancagak</strong>. This site
          was developed by{" "}
          <Link
            href="https://fb.me/ruhiyatna.cucu"
            target="blank"
            fontWeight="bold"
          >
            Cucu Ruhiyatna
          </Link>
        </Typography>
      </Box>
    </Paper>
  );
};

export default MainFooter;

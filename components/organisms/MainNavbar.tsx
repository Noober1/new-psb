import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
  MenuList,
  Paper,
  ClickAwayListener,
} from "@mui/material";
import { useState, MouseEvent, useRef } from "react";
import Logo from "../atoms/Logo";
import LoginIcon from "@mui/icons-material/Login";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import RegistrationIcon from "@mui/icons-material/AppRegistration";
import useToggleDarkMode from "../hooks/useToggleDarkMode";
import useToggleOpenLoginBox from "../hooks/useToggleLoginPopup";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import Link from "../atoms/Link";
import MuiLink from "@mui/material/Link";
import { useRouter } from "next/router";
import { signOut } from "next-auth/react";
import ConfirmDialog, { ConfirmDialogRef } from "../molecules/ConfirmDialog";
import useUserData from "../hooks/useUserData";
import { useDispatch } from "react-redux";
import { openSnackbar } from "../../lib/redux/slices/noPersistConfig";

const MainNavbar = () => {
  const confirmLogoutDialogRef = useRef<ConfirmDialogRef>(null);
  const [openProfileMenu, setopenProfileMenu] = useState(false);
  const dispatch = useDispatch();

  const [userData, userStatus] = useUserData();
  const isAuthenticated = userStatus === "authenticated";
  const router = useRouter();
  const handleOpenProfileMenu = () => {
    setopenProfileMenu(true);
  };

  const handleCloseProfileMenu = () => {
    if (openProfileMenu) {
      setopenProfileMenu(false);
    }
  };

  const [theme, toggleDarkMode] = useToggleDarkMode();
  const toggleLoginBox = useToggleOpenLoginBox();

  const handleToggleLoginBox = (event: MouseEvent<HTMLElement>) => {
    handleCloseProfileMenu();
    toggleLoginBox();
  };

  const handleClickLogout = () => {
    if (confirmLogoutDialogRef.current?.openConfirm)
      confirmLogoutDialogRef.current?.openConfirm();
  };

  const handleConfirmLogout = async () => {
    try {
      const executeSignOut = await signOut({
        redirect: false,
      });

      if (executeSignOut) {
        handleCloseProfileMenu();
        dispatch(
          openSnackbar({
            message: "Berhasil keluar",
            severity: "success",
          })
        );
      }
    } catch (error) {
      dispatch(
        openSnackbar({
          message: "Gagal keluar",
          severity: "error",
        })
      );
    }
  };

  return (
    <AppBar position="fixed" color="primary" elevation={0}>
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <div className="my-2 mr-3 relative">
            <Logo className="h-16" />
          </div>
          <Typography variant="h6" className="mr-3">
            {process.env.NEXT_PUBLIC_COMPANY_NAME}
          </Typography>
          <div className="flex-1 sm:flex md:hidden">Icon Button</div>
          <div className="flex-1 flex items-center justify-end mx-10 gap-6">
            <MuiLink
              component={Link}
              color="inherit"
              href="/"
              variant="subtitle1"
              fontWeight="bold"
            >
              Home
            </MuiLink>
            <MuiLink
              component={Link}
              href="/about"
              color="inherit"
              variant="subtitle1"
              fontWeight="bold"
            >
              Tentang
            </MuiLink>
            <MuiLink
              component={Link}
              color="inherit"
              href="/test"
              variant="subtitle1"
              fontWeight="bold"
            >
              Test
            </MuiLink>
          </div>
          <div className="text-right">
            <ClickAwayListener onClickAway={handleCloseProfileMenu}>
              <div>
                <IconButton onClick={handleOpenProfileMenu}>
                  <Avatar
                    sx={{
                      backgroundColor: (theme) => theme.palette.secondary.main,
                      color: (theme) => theme.palette.primary.main,
                    }}
                    className="font-bold"
                  >
                    {isAuthenticated
                      ? userData?.firstName?.charAt(0) +
                        userData?.lastName?.charAt(0)
                      : null}
                  </Avatar>
                </IconButton>
                {openProfileMenu && (
                  <Paper
                    className="absolute w-72 top-20 text-left right-0 rounded-t-none"
                    elevation={10}
                  >
                    <MenuList>
                      <MenuItem disabled>
                        <Typography gutterBottom>Pengaturan</Typography>
                      </MenuItem>
                      <MenuItem onClick={toggleDarkMode}>
                        <ListItemIcon>
                          {theme == "light" ? (
                            <DarkModeIcon />
                          ) : (
                            <LightModeIcon />
                          )}
                        </ListItemIcon>
                        <ListItemText>Mode gelap</ListItemText>
                        <Typography>
                          {theme == "light" ? "OFF" : "ON"}
                        </Typography>
                      </MenuItem>
                      <Divider />
                      {isAuthenticated ? (
                        <div>
                          <MenuItem disabled>
                            <Typography gutterBottom>
                              {userData?.fullName}
                            </Typography>
                          </MenuItem>
                          <MenuItem
                            onClick={() => router.push("/profile")}
                            tabIndex={0}
                          >
                            <ListItemIcon>
                              <AccountBoxIcon />
                            </ListItemIcon>
                            <ListItemText>Profile</ListItemText>
                          </MenuItem>
                          <MenuItem onClick={handleClickLogout} tabIndex={0}>
                            <ListItemIcon>
                              <LoginIcon />
                            </ListItemIcon>
                            <ListItemText>Keluar</ListItemText>
                          </MenuItem>
                        </div>
                      ) : (
                        <div>
                          <MenuItem disabled>
                            <Typography gutterBottom>Akun</Typography>
                          </MenuItem>
                          <MenuItem onClick={handleToggleLoginBox} tabIndex={0}>
                            <ListItemIcon>
                              <LoginIcon />
                            </ListItemIcon>
                            <ListItemText>Masuk</ListItemText>
                          </MenuItem>
                          <MenuItem
                            onClick={() => router.push("/register")}
                            tabIndex={0}
                          >
                            <ListItemIcon>
                              <RegistrationIcon />
                            </ListItemIcon>
                            <ListItemText>Daftar</ListItemText>
                          </MenuItem>
                        </div>
                      )}
                    </MenuList>
                  </Paper>
                )}
                {isAuthenticated && (
                  <ConfirmDialog
                    ref={confirmLogoutDialogRef}
                    onConfirm={handleConfirmLogout}
                    autoCloseOnConfirm={false}
                  />
                )}
              </div>
            </ClickAwayListener>
          </div>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default MainNavbar;

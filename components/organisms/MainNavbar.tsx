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
  Collapse,
} from "@mui/material";
import { useState, MouseEvent, useRef } from "react";
import Logo from "../atoms/Logo";
import LoginIcon from "@mui/icons-material/Login";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import MenuIcon from "@mui/icons-material/Menu";
import NavbarMenuBulletIcon from "@mui/icons-material/DoubleArrow";
import RegistrationIcon from "@mui/icons-material/AppRegistration";
import useToggleDarkMode from "../hooks/useToggleDarkMode";
import useLoginPopup from "../hooks/useLoginPopup";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import Link from "../atoms/Link";
import MuiLink from "@mui/material/Link";
import { useRouter } from "next/router";
import { signOut } from "next-auth/react";
import ConfirmDialog, { ConfirmDialogRef } from "../molecules/ConfirmDialog";
import useUserData from "../hooks/useUserData";
import { useDispatch } from "react-redux";
import { openSnackbar } from "../../lib/redux/slices/noPersistConfig";
import { runDevOnly } from "../../lib";
import mediaQuery from "../hooks/mediaQuery";
import ProfileIcon from "../atoms/ProfileIcon";

interface NavbarMenuList {
  text: string;
  link: string;
}

const navbarMenuList: NavbarMenuList[] = [
  { link: "/", text: "Home" },
  { link: "/guide", text: "Panduan" },
  { link: "/about", text: "Tentang" },
];

runDevOnly(() => {
  navbarMenuList.push({ link: "/test", text: "Test" });
});

const MainNavbar = () => {
  const confirmLogoutDialogRef = useRef<ConfirmDialogRef>(null);
  const [openProfileMenu, setopenProfileMenu] = useState<boolean>(false);
  const [openNavbarMenu, setOpenNavbarMenu] = useState<boolean>(false);
  const dispatch = useDispatch();

  const [userData, userStatus] = useUserData();
  const isAuthenticated = userStatus === "authenticated";
  const router = useRouter();
  const [hideNavbarMenuByScreen] = mediaQuery("md");

  const handleToggleProfileMenu = () => {
    setopenProfileMenu((prevState) => !prevState);
  };

  const handleCloseProfileMenu = () => {
    if (openProfileMenu) {
      setopenProfileMenu(false);
    }
  };

  const handleToggleNavbarMenu = () =>
    setOpenNavbarMenu((prevMenu) => !prevMenu);
  const handleCloseNavbarMenu = () => setOpenNavbarMenu(false);

  const [theme, toggleDarkMode] = useToggleDarkMode();
  const [openLoginPopup, closeLoginPopup] = useLoginPopup();

  const handleOpenLoginPopup = (event: MouseEvent<HTMLElement>) => {
    handleCloseProfileMenu();
    openLoginPopup();
  };

  const handleClickLogout = () => {
    if (confirmLogoutDialogRef.current?.openConfirm)
      confirmLogoutDialogRef.current?.openConfirm();
  };

  const handleOpenRegister = () => {
    router.push("/register");
    handleToggleProfileMenu();
  };

  const handleConfirmLogout = async () => {
    try {
      const executeSignOut = await signOut({
        redirect: false,
      });

      if (executeSignOut) {
        handleCloseProfileMenu();
        closeLoginPopup();
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
      <Container maxWidth="xl" className="px-2 md:px-5">
        <Toolbar disableGutters>
          <ClickAwayListener onClickAway={handleCloseNavbarMenu}>
            <div className="md:hidden">
              <IconButton
                color="inherit"
                onClick={handleToggleNavbarMenu}
                size="large"
              >
                <MenuIcon />
              </IconButton>
              <div className="absolute top-20 mt-2 w-full">
                {openNavbarMenu && (
                  <Paper elevation={0} className="">
                    <MenuList>
                      {navbarMenuList.map((item, index) => (
                        <MenuItem
                          key={item.link}
                          divider={index + 1 < navbarMenuList.length}
                        >
                          <ListItemIcon>
                            <NavbarMenuBulletIcon />
                          </ListItemIcon>
                          <Link
                            color="inherit"
                            href={item.link}
                            variant="h5"
                            onClick={handleCloseNavbarMenu}
                          >
                            {item.text}
                          </Link>
                        </MenuItem>
                      ))}
                    </MenuList>
                  </Paper>
                )}
              </div>
            </div>
          </ClickAwayListener>
          <div className="my-2 flex flex-1 md:flex-none md:table justify-center mr-3 relative">
            <Logo className="h-16" />
          </div>
          <div className="hidden md:inline flex-1">
            <Typography variant="h6">
              {process.env.NEXT_PUBLIC_COMPANY_NAME}
            </Typography>
          </div>
          <div className="flex-1 hidden md:flex items-center justify-end mx-10 gap-6">
            {navbarMenuList.map((item) => (
              <MuiLink
                key={item.link}
                component={Link}
                color="inherit"
                href={item.link}
                variant="subtitle1"
                fontWeight="bold"
              >
                {item.text}
              </MuiLink>
            ))}
          </div>
          <div className="text-right">
            <ClickAwayListener onClickAway={handleCloseProfileMenu}>
              <div>
                <ProfileIcon
                  onClick={handleToggleProfileMenu}
                  showBorder={openProfileMenu}
                >
                  {isAuthenticated
                    ? userData?.firstName?.charAt(0) +
                      userData?.lastName?.charAt(0)
                    : null}
                </ProfileIcon>
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
                          <MenuItem onClick={handleOpenLoginPopup} tabIndex={0}>
                            <ListItemIcon>
                              <LoginIcon />
                            </ListItemIcon>
                            <ListItemText>Masuk</ListItemText>
                          </MenuItem>
                          <MenuItem onClick={handleOpenRegister} tabIndex={0}>
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

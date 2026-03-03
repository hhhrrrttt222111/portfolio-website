import { useState, useCallback } from "react";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import MobileNav from "./MobileNav";
import {
  NavbarRoot,
  NavbarToolbar,
  Logo,
  NavLink,
  ContactButton,
  HamburgerButton,
} from "./Navbar.styles";

const NAV_LINKS = [
  { label: "About", path: "/about" },
  { label: "Blog", path: "/blog" },
] as const;

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const toggleMobile = useCallback(() => {
    setMobileOpen((prev) => !prev);
  }, []);

  return (
    <>
      <NavbarRoot position="fixed" elevation={0}>
        <NavbarToolbar disableGutters>
          <Logo to="/">HRT</Logo>

          <Box sx={{ flexGrow: 1 }} />

          {!isMobile && (
            <Stack direction="row" alignItems="center" spacing={1}>
              {NAV_LINKS.map((link) => (
                <NavLink key={link.path} to={link.path}>
                  {link.label}
                </NavLink>
              ))}
              <ContactButton to="/contact">Contact Me</ContactButton>
            </Stack>
          )}

          {isMobile && (
            <HamburgerButton onClick={toggleMobile} aria-label="open menu" size="medium">
              <MenuIcon />
            </HamburgerButton>
          )}
        </NavbarToolbar>
      </NavbarRoot>

      {isMobile && <MobileNav open={mobileOpen} onClose={toggleMobile} links={[...NAV_LINKS]} />}
    </>
  );
};

export default Navbar;

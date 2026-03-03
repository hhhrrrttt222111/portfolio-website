import { type FC } from "react";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import {
  MobileDrawer,
  DrawerLogo,
  DrawerNavItem,
  DrawerNavLabel,
  DrawerContactButton,
} from "./MobileNav.styles";

interface NavLink {
  label: string;
  path: string;
}

interface MobileNavProps {
  open: boolean;
  onClose: () => void;
  links: NavLink[];
}

const MobileNav: FC<MobileNavProps> = ({ open, onClose, links }) => {
  return (
    <MobileDrawer anchor="right" open={open} onClose={onClose}>
      <Stack spacing={4} sx={{ height: "100%" }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <DrawerLogo variant="h6">HRT</DrawerLogo>
          <IconButton onClick={onClose} aria-label="close menu" size="large">
            <CloseIcon />
          </IconButton>
        </Stack>

        <Stack spacing={1} component="nav">
          {links.map((link) => (
            <DrawerNavItem key={link.path} to={link.path} onClick={onClose}>
              <DrawerNavLabel variant="body1">{link.label}</DrawerNavLabel>
            </DrawerNavItem>
          ))}
        </Stack>

        <Box sx={{ mt: "auto", pb: 2 }}>
          <DrawerContactButton to="/contact" onClick={onClose}>
            Contact Me
          </DrawerContactButton>
        </Box>
      </Stack>
    </MobileDrawer>
  );
};

export default MobileNav;

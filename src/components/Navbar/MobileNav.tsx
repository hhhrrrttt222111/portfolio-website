import { type FC, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import CloseIcon from "@mui/icons-material/Close";
import {
  Overlay,
  MobileMenuContainer,
  MobileMenuHeader,
  DrawerLogo,
  CloseButton,
  MobileMenuContent,
  NavItemsContainer,
  DrawerNavItem,
  DrawerNavLabel,
  ActiveNavItem,
  MobileMenuFooter,
  DrawerContactButton,
} from "./MobileNav.styles";
import { LOGO_TEXT, CTA_LINK } from "@/constants";
import type { NavLink } from "@/types";
import {
  overlayVariants,
  menuVariants,
  mobileHeaderVariants,
  mobileNavItemVariants,
  mobileFooterVariants,
  activeNavIndicatorVariants,
} from "@/animations";

const MotionOverlay = motion.create(Overlay);
const MotionMobileMenuContainer = motion.create(MobileMenuContainer);
const MotionActiveNavItem = motion.create(ActiveNavItem);
const MotionCloseButton = motion.create(CloseButton);
const MotionDrawerContactButton = motion.create(DrawerContactButton);
const MotionMobileMenuHeader = motion.create(MobileMenuHeader);
const MotionMobileMenuFooter = motion.create(MobileMenuFooter);

interface MobileNavProps {
  onClose: () => void;
  links: NavLink[];
  onContactClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

const MobileNav: FC<MobileNavProps> = ({ onClose, links, onContactClick }) => {
  const location = useLocation();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    },
    [onClose],
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <>
      <MotionOverlay
        variants={overlayVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={onClose}
        aria-hidden="true"
      />
      <MotionMobileMenuContainer
        variants={menuVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation menu"
      >
        <MotionMobileMenuHeader variants={mobileHeaderVariants}>
          <DrawerLogo variant="h6">{LOGO_TEXT}</DrawerLogo>
          <MotionCloseButton
            onClick={onClose}
            aria-label="close menu"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <CloseIcon />
          </MotionCloseButton>
        </MotionMobileMenuHeader>

        <MobileMenuContent>
          <NavItemsContainer aria-label="Main navigation">
            {links.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <motion.div key={link.path} variants={mobileNavItemVariants}>
                  <DrawerNavItem
                    to={link.path}
                    onClick={onClose}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {isActive && (
                      <MotionActiveNavItem
                        layoutId="activeNavIndicator"
                        initial={activeNavIndicatorVariants.initial}
                        animate={activeNavIndicatorVariants.animate}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                    <DrawerNavLabel variant="body1">{link.label}</DrawerNavLabel>
                  </DrawerNavItem>
                </motion.div>
              );
            })}
          </NavItemsContainer>
        </MobileMenuContent>

        <MotionMobileMenuFooter variants={mobileFooterVariants}>
          <MotionDrawerContactButton
            to={CTA_LINK.path}
            onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
              if (onContactClick) {
                onContactClick(e);
              }
              onClose();
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>{CTA_LINK.label}</span>
          </MotionDrawerContactButton>
        </MotionMobileMenuFooter>
      </MotionMobileMenuContainer>
    </>
  );
};

export default MobileNav;

import { type FC, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { motion, type Variants } from "framer-motion";
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
import { LOGO_TEXT, CTA_LINK, type NavLink } from "@/constants";

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
}

const easeOutCubic: [number, number, number, number] = [0.4, 0, 0.2, 1];

const overlayVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.3, ease: easeOutCubic },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.2, ease: easeOutCubic, delay: 0.1 },
  },
};

const menuVariants: Variants = {
  hidden: { x: "100%" },
  visible: {
    x: 0,
    transition: {
      type: "spring",
      damping: 30,
      stiffness: 300,
      when: "beforeChildren",
      staggerChildren: 0.05,
    },
  },
  exit: {
    x: "100%",
    transition: {
      type: "spring",
      damping: 30,
      stiffness: 300,
    },
  },
};

const headerVariants: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: easeOutCubic },
  },
};

const navItemVariants: Variants = {
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.3, ease: easeOutCubic },
  },
};

const footerVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: easeOutCubic, delay: 0.2 },
  },
};

const MobileNav: FC<MobileNavProps> = ({ onClose, links }) => {
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
        <MotionMobileMenuHeader variants={headerVariants}>
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
                <motion.div key={link.path} variants={navItemVariants}>
                  <DrawerNavItem
                    to={link.path}
                    onClick={onClose}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {isActive && (
                      <MotionActiveNavItem
                        layoutId="activeNavIndicator"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
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

        <MotionMobileMenuFooter variants={footerVariants}>
          <MotionDrawerContactButton
            to={CTA_LINK.path}
            onClick={onClose}
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

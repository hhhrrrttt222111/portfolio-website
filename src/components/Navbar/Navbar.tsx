import { useState, useCallback, useEffect, useMemo } from "react";
import Box from "@mui/material/Box";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import MobileNav from "./MobileNav";
import {
  NavbarRoot,
  NavbarToolbar,
  Logo,
  NavLinksContainer,
  NavLinkWrapper,
  NavLink,
  NavLinkUnderline,
  ActiveIndicator,
  ActiveNavLink,
  ContactButton,
  HamburgerButton,
  HamburgerIconWrapper,
  HamburgerLine,
} from "./Navbar.styles";
import { NAV_LINKS, LOGO_TEXT, CTA_LINK } from "@/constants";

const MotionNavLinkUnderline = motion.create(NavLinkUnderline);
const MotionActiveIndicator = motion.create(ActiveIndicator);
const MotionNavbarRoot = motion.create(NavbarRoot);
const MotionHamburgerLine = motion.create(HamburgerLine);
const MotionNavLinkWrapper = motion.create(NavLinkWrapper);

const SCROLL_THRESHOLD = 50;

const easeOutCubic: [number, number, number, number] = [0.4, 0, 0.2, 1];

const navItemVariants: Variants = {
  hidden: { opacity: 0, y: -10 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.4,
      ease: easeOutCubic,
    },
  }),
};

const logoVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: easeOutCubic,
    },
  },
};

const ctaVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delay: 0.3,
      duration: 0.4,
      ease: easeOutCubic,
    },
  },
};

interface NavLinkItemProps {
  link: { label: string; path: string };
  index: number;
  isActive: boolean;
}

const NavLinkItem = ({ link, index, isActive }: NavLinkItemProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <MotionNavLinkWrapper
      custom={index}
      variants={navItemVariants}
      initial="hidden"
      animate="visible"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatePresence>
        {isActive && (
          <MotionActiveIndicator
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.25, ease: easeOutCubic }}
            layoutId="activeNavBackground"
          />
        )}
      </AnimatePresence>
      {isActive ? (
        <ActiveNavLink to={link.path}>{link.label}</ActiveNavLink>
      ) : (
        <NavLink to={link.path}>{link.label}</NavLink>
      )}
      <AnimatePresence>
        {isHovered && !isActive && (
          <MotionNavLinkUnderline
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "50%", opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: easeOutCubic }}
          />
        )}
      </AnimatePresence>
    </MotionNavLinkWrapper>
  );
};

const HamburgerIcon = ({ isOpen }: { isOpen: boolean }) => (
  <HamburgerIconWrapper>
    <MotionHamburgerLine
      animate={{
        rotate: isOpen ? 45 : 0,
        y: isOpen ? 0 : -6,
      }}
      transition={{ duration: 0.3, ease: easeOutCubic }}
    />
    <MotionHamburgerLine
      animate={{
        opacity: isOpen ? 0 : 1,
        scaleX: isOpen ? 0 : 1,
      }}
      transition={{ duration: 0.2, ease: easeOutCubic }}
    />
    <MotionHamburgerLine
      animate={{
        rotate: isOpen ? -45 : 0,
        y: isOpen ? 0 : 6,
      }}
      transition={{ duration: 0.3, ease: easeOutCubic }}
    />
  </HamburgerIconWrapper>
);

const SCROLL_PADDING = 100;

const scrollToContact = () => {
  const contactSection = document.getElementById("contact");
  if (contactSection) {
    const top = contactSection.getBoundingClientRect().top + window.scrollY - SCROLL_PADDING;
    window.scrollTo({ top, behavior: "smooth" });
  }
};

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > SCROLL_THRESHOLD);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      setMobileOpen(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const toggleMobile = useCallback(() => {
    setMobileOpen((prev) => !prev);
  }, []);

  const handleContactClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      if (location.pathname !== "/") {
        navigate("/");
        setTimeout(() => scrollToContact(), 100);
      } else {
        scrollToContact();
      }
    },
    [location.pathname, navigate],
  );

  const navLinks = useMemo(() => [...NAV_LINKS], []);

  return (
    <>
      <MotionNavbarRoot
        position="fixed"
        elevation={0}
        scrolled={scrolled}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: easeOutCubic }}
      >
        <NavbarToolbar disableGutters scrolled={scrolled}>
          <motion.div variants={logoVariants} initial="hidden" animate="visible">
            <Logo to="/">{LOGO_TEXT}</Logo>
          </motion.div>

          <Box sx={{ flexGrow: 1 }} />

          {!isMobile && (
            <NavLinksContainer>
              {navLinks.map((link, index) => (
                <NavLinkItem
                  key={link.path}
                  link={link}
                  index={index}
                  isActive={location.pathname === link.path}
                />
              ))}
              <motion.div variants={ctaVariants} initial="hidden" animate="visible">
                <ContactButton to={CTA_LINK.path} onClick={handleContactClick}>
                  <span>{CTA_LINK.label}</span>
                </ContactButton>
              </motion.div>
            </NavLinksContainer>
          )}

          {isMobile && (
            <HamburgerButton
              onClick={toggleMobile}
              aria-label={mobileOpen ? "close menu" : "open menu"}
              aria-expanded={mobileOpen}
              size="medium"
            >
              <HamburgerIcon isOpen={mobileOpen} />
            </HamburgerButton>
          )}
        </NavbarToolbar>
      </MotionNavbarRoot>

      <AnimatePresence>
        {isMobile && mobileOpen && (
          <MobileNav onClose={toggleMobile} links={navLinks} onContactClick={handleContactClick} />
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;

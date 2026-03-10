import { useState, useCallback, useEffect, useMemo } from "react";
import Box from "@mui/material/Box";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
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
import {
  easeOutCubic,
  navItemVariants,
  logoVariants,
  ctaVariants,
  navActiveIndicatorVariants,
  navLinkUnderlineVariants,
  getHamburgerLineVariants,
} from "@/animations";

const MotionNavLinkUnderline = motion.create(NavLinkUnderline);
const MotionActiveIndicator = motion.create(ActiveIndicator);
const MotionNavbarRoot = motion.create(NavbarRoot);
const MotionHamburgerLine = motion.create(HamburgerLine);
const MotionNavLinkWrapper = motion.create(NavLinkWrapper);

const SCROLL_THRESHOLD = 50;

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
            initial={navActiveIndicatorVariants.initial}
            animate={navActiveIndicatorVariants.animate}
            exit={navActiveIndicatorVariants.exit}
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
            initial={navLinkUnderlineVariants.initial}
            animate={navLinkUnderlineVariants.animate}
            exit={navLinkUnderlineVariants.exit}
            transition={{ duration: 0.2, ease: easeOutCubic }}
          />
        )}
      </AnimatePresence>
    </MotionNavLinkWrapper>
  );
};

const HamburgerIcon = ({ isOpen }: { isOpen: boolean }) => {
  const hamburgerVariants = getHamburgerLineVariants(isOpen);
  return (
    <HamburgerIconWrapper>
      <MotionHamburgerLine
        animate={hamburgerVariants.top}
        transition={{ duration: 0.3, ease: easeOutCubic }}
      />
      <MotionHamburgerLine
        animate={hamburgerVariants.middle}
        transition={{ duration: 0.2, ease: easeOutCubic }}
      />
      <MotionHamburgerLine
        animate={hamburgerVariants.bottom}
        transition={{ duration: 0.3, ease: easeOutCubic }}
      />
    </HamburgerIconWrapper>
  );
};

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

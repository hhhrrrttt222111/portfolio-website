import { useState, useCallback } from "react";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import SendIcon from "@mui/icons-material/Send";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { useEmailJS } from "@/hooks";
import {
  ContactRoot,
  ContactTitle,
  ContactSubtitle,
  ContactWrapper,
  InfoSection,
  InfoCard,
  InfoLabel,
  InfoText,
  FormSection,
  FormTitle,
  SendButton,
  PaperPlaneWrapper,
  FloatingIcon,
  SuccessSnackbar,
  ErrorSnackbar,
} from "./Contact.styles";

const MotionSendButton = motion.create(SendButton);

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

const paperPlaneVariants = {
  initial: { scale: 0, rotate: -45, opacity: 0 },
  animate: {
    scale: [0, 1.2, 1],
    rotate: [-45, 0, 15],
    opacity: [0, 1, 1],
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
  fly: {
    x: [0, 100, 300],
    y: [0, -150, -400],
    rotate: [15, 25, 45],
    opacity: [1, 1, 0],
    scale: [1, 0.8, 0.3],
    transition: { duration: 1.2, ease: "easeIn" as const, delay: 0.3 },
  },
};

const snackbarVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  },
  exit: {
    opacity: 0,
    y: 20,
    scale: 0.95,
    transition: { duration: 0.3 },
  },
};

type SnackbarState = {
  open: boolean;
  type: "success" | "error";
  message: string;
};

const Contact = () => {
  const prefersReduced = useReducedMotion();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [showPlane, setShowPlane] = useState(false);
  const [planePhase, setPlanePhase] = useState<"animate" | "fly">("animate");
  const [snackbar, setSnackbar] = useState<SnackbarState>({
    open: false,
    type: "success",
    message: "",
  });

  const { sendEmail, isLoading } = useEmailJS();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const showSnackbar = useCallback((type: "success" | "error", message: string) => {
    setSnackbar({ open: true, type, message });
    setTimeout(() => {
      setSnackbar((prev) => ({ ...prev, open: false }));
    }, 4000);
  }, []);

  const handleSuccess = useCallback(() => {
    if (!prefersReduced) {
      setShowPlane(true);
      setPlanePhase("animate");
      setTimeout(() => setPlanePhase("fly"), 100);
      setTimeout(() => {
        setShowPlane(false);
        showSnackbar("success", "Message sent successfully! I'll get back to you soon.");
      }, 1600);
    } else {
      showSnackbar("success", "Message sent successfully! I'll get back to you soon.");
    }
    setForm({ name: "", email: "", message: "" });
  }, [prefersReduced, showSnackbar]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await sendEmail(form);
    if (result.success) {
      handleSuccess();
    } else if (result.error) {
      showSnackbar("error", result.error);
    }
  };

  return (
    <ContactRoot id="contact" data-testid="contact-section">
      <Container maxWidth="lg">
        <motion.div
          variants={prefersReduced ? undefined : containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div variants={prefersReduced ? undefined : itemVariants}>
            <ContactTitle>Get In Touch</ContactTitle>
          </motion.div>

          <motion.div variants={prefersReduced ? undefined : itemVariants}>
            <ContactSubtitle>
              Have a project in mind or just want to say hello? Drop me a message and I&apos;ll get
              back to you as soon as possible.
            </ContactSubtitle>
          </motion.div>

          <motion.div variants={prefersReduced ? undefined : itemVariants}>
            <ContactWrapper>
              <InfoSection>
                <FloatingIcon>
                  <svg
                    width="80"
                    height="80"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ margin: "0 auto 16px", display: "block" }}
                  >
                    <path
                      d="M22 2L11 13"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{ color: "var(--primary-color, #66bb6a)" }}
                    />
                    <path
                      d="M22 2L15 22L11 13L2 9L22 2Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{ color: "var(--primary-color, #66bb6a)" }}
                    />
                  </svg>
                </FloatingIcon>

                <InfoCard
                  as="a"
                  href="tel:+918281627763"
                  sx={{ textDecoration: "none", cursor: "pointer" }}
                >
                  <PhoneIcon />
                  <Stack>
                    <InfoLabel>Phone</InfoLabel>
                    <InfoText>+91 8281627763</InfoText>
                  </Stack>
                </InfoCard>

                <InfoCard
                  as="a"
                  href="mailto:hemanththanal@gmail.com"
                  sx={{ textDecoration: "none", cursor: "pointer" }}
                >
                  <EmailIcon />
                  <Stack>
                    <InfoLabel>Email</InfoLabel>
                    <InfoText>hemanththanal@gmail.com</InfoText>
                  </Stack>
                </InfoCard>
              </InfoSection>

              <FormSection {...{ component: "form", onSubmit: handleSubmit }}>
                <FormTitle>
                  <SendIcon />
                  Send a Message
                </FormTitle>

                <Stack spacing={2.5}>
                  <TextField
                    fullWidth
                    label="Your Name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    variant="outlined"
                    color="primary"
                    size="small"
                  />
                  <TextField
                    fullWidth
                    label="Your Email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    variant="outlined"
                    color="primary"
                    size="small"
                  />
                  <TextField
                    fullWidth
                    label="Your Message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    multiline
                    rows={4}
                    variant="outlined"
                    color="primary"
                  />
                  <MotionSendButton
                    type="submit"
                    disabled={isLoading}
                    whileHover={prefersReduced ? undefined : { scale: 1.02 }}
                    whileTap={prefersReduced ? undefined : { scale: 0.98 }}
                  >
                    {isLoading ? (
                      "Sending..."
                    ) : (
                      <>
                        Send Message
                        <SendIcon sx={{ fontSize: "1.1rem" }} />
                      </>
                    )}
                  </MotionSendButton>
                </Stack>
              </FormSection>
            </ContactWrapper>
          </motion.div>
        </motion.div>
      </Container>

      <AnimatePresence>
        {showPlane && (
          <PaperPlaneWrapper>
            <motion.div variants={paperPlaneVariants} initial="initial" animate={planePhase}>
              <svg
                width="64"
                height="64"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M22 2L11 13"
                  stroke="#66bb6a"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M22 2L15 22L11 13L2 9L22 2Z"
                  fill="#66bb6a"
                  stroke="#66bb6a"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.div>
          </PaperPlaneWrapper>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {snackbar.open &&
          (snackbar.type === "success" ? (
            <motion.div variants={snackbarVariants} initial="hidden" animate="visible" exit="exit">
              <SuccessSnackbar>
                <CheckCircleIcon />
                {snackbar.message}
              </SuccessSnackbar>
            </motion.div>
          ) : (
            <motion.div variants={snackbarVariants} initial="hidden" animate="visible" exit="exit">
              <ErrorSnackbar>
                <ErrorIcon />
                {snackbar.message}
              </ErrorSnackbar>
            </motion.div>
          ))}
      </AnimatePresence>
    </ContactRoot>
  );
};

export default Contact;

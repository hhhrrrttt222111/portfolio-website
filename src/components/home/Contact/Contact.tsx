import { useState } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import { motion, useReducedMotion } from "framer-motion";
import {
  ContactRoot,
  ContactTitle,
  ContactSubtitle,
  FormCard,
  InfoCard,
  InfoText,
} from "./Contact.styles";

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

const Contact = () => {
  const prefersReduced = useReducedMotion();
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <ContactRoot component="section" data-testid="contact-section">
      <Container maxWidth="lg">
        <motion.div
          variants={prefersReduced ? undefined : containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div variants={prefersReduced ? undefined : itemVariants}>
            <ContactTitle variant="h2" component="h2">
              Get In Touch
            </ContactTitle>
          </motion.div>

          <motion.div variants={prefersReduced ? undefined : itemVariants}>
            <ContactSubtitle>
              Have a project in mind or just want to say hello? Drop me a message and I&apos;ll get
              back to you as soon as possible.
            </ContactSubtitle>
          </motion.div>

          <Grid container spacing={4} justifyContent="center" sx={{ mb: 5 }}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <motion.div variants={prefersReduced ? undefined : itemVariants}>
                <InfoCard>
                  <PhoneIcon color="primary" />
                  <InfoText>+1 (555) 123-4567</InfoText>
                </InfoCard>
              </motion.div>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <motion.div variants={prefersReduced ? undefined : itemVariants}>
                <InfoCard>
                  <EmailIcon color="primary" />
                  <InfoText>hello@hemanthr.dev</InfoText>
                </InfoCard>
              </motion.div>
            </Grid>
          </Grid>

          <motion.div variants={prefersReduced ? undefined : itemVariants}>
            <FormCard {...{ component: "form", onSubmit: handleSubmit }}>
              <Grid container spacing={3}>
                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    label="Name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    variant="outlined"
                    color="primary"
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    variant="outlined"
                    color="primary"
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    label="Message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    multiline
                    rows={5}
                    variant="outlined"
                    color="primary"
                  />
                </Grid>
                <Grid size={{ xs: 12 }} sx={{ textAlign: "center" }}>
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    endIcon={<SendIcon />}
                    sx={{
                      px: 5,
                      py: 1.5,
                      borderRadius: 3,
                      fontWeight: 600,
                      textTransform: "none",
                      fontSize: "1rem",
                    }}
                  >
                    Send Message
                  </Button>
                </Grid>
              </Grid>
            </FormCard>
          </motion.div>
        </motion.div>
      </Container>
    </ContactRoot>
  );
};

export default Contact;

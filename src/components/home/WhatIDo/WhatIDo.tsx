import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { motion, type Variants } from "framer-motion";
import { WHAT_I_DO_CARDS } from "@/constants";
import { SectionRoot, SectionTitle, SectionSubtitle } from "./WhatIDo.styles";
import ServiceCard from "./ServiceCard";

const sectionVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const WhatIDo = () => {
  return (
    <SectionRoot>
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <SectionTitle>What I Do</SectionTitle>
          <SectionSubtitle>
            I specialize in building exceptional digital experiences — from architecting scalable
            frontends to crafting performant backend services.
          </SectionSubtitle>
        </motion.div>

        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          <Grid container spacing={3}>
            {WHAT_I_DO_CARDS.map((card) => (
              <ServiceCard key={card.title} card={card} />
            ))}
          </Grid>
        </motion.div>
      </Container>
    </SectionRoot>
  );
};

export default WhatIDo;

import { useRef } from "react";
import Container from "@mui/material/Container";
import { motion, useInView } from "framer-motion";
import { SERVICES } from "@/constants/services";
import {
  servicesContainerVariants,
  serviceCardVariants,
  servicesHeaderVariants,
  servicesLabelVariants,
} from "@/animations";
import {
  SectionRoot,
  CircuitPattern,
  GlowOrb,
  SectionHeader,
  SectionLabel,
  SectionTitle,
  SectionSubtitle,
  ServicesGrid,
  ServiceCard,
  IconWrapper,
  IconRing,
  ServiceTitle,
  ServiceDescription,
  FeaturesList,
  FeatureItem,
  ServiceNumber,
} from "./Services.styles";

const Services = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <SectionRoot ref={sectionRef} id="services">
      <CircuitPattern />
      <GlowOrb placement="top" />
      <GlowOrb placement="bottom" />

      <Container maxWidth="lg">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={servicesHeaderVariants}
        >
          <SectionHeader>
            <motion.div variants={servicesLabelVariants}>
              <SectionLabel>What I Offer</SectionLabel>
            </motion.div>
            <SectionTitle>Services</SectionTitle>
            <SectionSubtitle>
              Transforming ideas into exceptional digital experiences through expertise in design,
              development, and strategic consulting.
            </SectionSubtitle>
          </SectionHeader>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={servicesContainerVariants}
          style={{ perspective: 1000 }}
        >
          <ServicesGrid>
            {SERVICES.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <motion.div key={service.id} variants={serviceCardVariants}>
                  <ServiceCard>
                    <ServiceNumber>{String(index + 1).padStart(2, "0")}</ServiceNumber>
                    <IconWrapper className="service-icon-wrapper">
                      <IconRing className="service-ring" />
                      <IconComponent />
                    </IconWrapper>
                    <ServiceTitle>{service.title}</ServiceTitle>
                    <ServiceDescription>{service.description}</ServiceDescription>
                    <FeaturesList>
                      {service.features.map((feature) => (
                        <FeatureItem key={feature} className="feature-item">
                          {feature}
                        </FeatureItem>
                      ))}
                    </FeaturesList>
                  </ServiceCard>
                </motion.div>
              );
            })}
          </ServicesGrid>
        </motion.div>
      </Container>
    </SectionRoot>
  );
};

export default Services;

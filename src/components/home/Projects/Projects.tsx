import { useRef } from "react";
import Container from "@mui/material/Container";
import { motion, useInView } from "framer-motion";
import GitHubIcon from "@mui/icons-material/GitHub";
import { PROJECTS } from "@/constants/projects";
import {
  projectsContainerVariants,
  projectCardVariants,
  projectHeaderVariants,
} from "@/animations";
import {
  SectionRoot,
  HexagonGrid,
  SectionHeader,
  SectionTitle,
  SectionSubtitle,
  ProjectsGrid,
  ProjectCard,
  ProjectNumber,
  ProjectTitle,
  ProjectDescription,
  TagsContainer,
  ProjectTag,
  GitHubLink,
  FloatingParticle,
} from "./Projects.styles";

const Projects = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const handleProjectClick = (githubUrl: string) => {
    window.open(githubUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <SectionRoot ref={sectionRef} id="projects">
      <HexagonGrid />
      <FloatingParticle sx={{ top: "15%", left: "10%" }} delay={0} />
      <FloatingParticle sx={{ top: "30%", right: "15%" }} delay={1} />
      <FloatingParticle sx={{ bottom: "25%", left: "20%" }} delay={2} />
      <FloatingParticle sx={{ bottom: "15%", right: "10%" }} delay={1.5} />

      <Container maxWidth="lg">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={projectHeaderVariants}
        >
          <SectionHeader>
            <SectionTitle>Projects</SectionTitle>
            <SectionSubtitle>// A collection of my recent work and experiments</SectionSubtitle>
          </SectionHeader>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={projectsContainerVariants}
        >
          <ProjectsGrid>
            {PROJECTS.map((project, index) => (
              <motion.div key={project.id} variants={projectCardVariants}>
                <ProjectCard
                  onClick={() => handleProjectClick(project.githubUrl)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      handleProjectClick(project.githubUrl);
                    }
                  }}
                  aria-label={`View ${project.title} on GitHub`}
                >
                  <ProjectNumber className="project-number">
                    {String(index + 1).padStart(2, "0")}
                  </ProjectNumber>
                  <ProjectTitle>{project.title}</ProjectTitle>
                  <ProjectDescription>{project.description}</ProjectDescription>
                  <TagsContainer>
                    {project.tags.map((tag) => (
                      <ProjectTag key={tag}>{tag}</ProjectTag>
                    ))}
                  </TagsContainer>
                  <GitHubLink className="github-icon">
                    <GitHubIcon />
                    <span>View on GitHub</span>
                  </GitHubLink>
                </ProjectCard>
              </motion.div>
            ))}
          </ProjectsGrid>
        </motion.div>
      </Container>
    </SectionRoot>
  );
};

export default Projects;

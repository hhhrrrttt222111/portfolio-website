import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import RedditIcon from "@mui/icons-material/Reddit";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import type { SvgIconComponent } from "@mui/icons-material";

export interface SocialLink {
  name: string;
  url: string;
  Icon: SvgIconComponent;
}

export const SOCIAL_LINKS: SocialLink[] = [
  {
    name: "GitHub",
    url: "https://github.com/hhhrrrttt22211",
    Icon: GitHubIcon,
  },
  {
    name: "LinkedIn",
    url: "https://linkedin.com/in/hhhrrrttt22211",
    Icon: LinkedInIcon,
  },
  {
    name: "Twitter",
    url: "https://twitter.com/hhhrrrttt22211",
    Icon: TwitterIcon,
  },
  {
    name: "Instagram",
    url: "https://instagram.com/hhhrrrttt22211",
    Icon: InstagramIcon,
  },
  {
    name: "Facebook",
    url: "https://facebook.com/hhhrrrttt22211",
    Icon: FacebookIcon,
  },
  {
    name: "Reddit",
    url: "https://reddit.com/user/hhhrrrttt22211",
    Icon: RedditIcon,
  },
  {
    name: "Goodreads",
    url: "https://goodreads.com/hhhrrrttt22211",
    Icon: MenuBookIcon,
  },
];

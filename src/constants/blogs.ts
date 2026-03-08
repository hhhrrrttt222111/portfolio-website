export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  url: string;
  date: string;
  tags: string[];
  readingTime: string;
}

export interface Blog {
  id: string;
  name: string;
  tagline: string;
  description: string;
  url: string;
  topics: string[];
  theme: "hacker" | "literary";
  posts: BlogPost[];
}

export const BLOGS: Blog[] = [
  {
    id: "hackzism",
    name: "Hackzism",
    tagline: "Nothing hacks better than Hackzism!",
    description:
      "A technical blog exploring cybersecurity, ethical hacking, Python automation, and Linux tools. Dive into tutorials, walkthroughs, and insights from the world of information security.",
    url: "https://hackzism.blogspot.com",
    topics: ["Hacking", "Python", "Kali Linux", "Cybersecurity", "Networking"],
    theme: "hacker",
    posts: [
      {
        id: "hackzism-1",
        title: "Instagram Phishing Using Hiddeneye",
        excerpt:
          "Learn how phishing attacks work by understanding the mechanics behind Hiddeneye, a powerful social engineering tool. This educational walkthrough covers setup, execution, and most importantly, how to protect yourself.",
        url: "https://hackzism.blogspot.com/2020/08/instagram-phishing-using-hiddeneye.html",
        date: "August 03, 2020",
        tags: ["Security", "Phishing", "Social Engineering"],
        readingTime: "8 min read",
      },
      {
        id: "hackzism-2",
        title: "FSOCIETY Hacking Tools from Mr. Robot",
        excerpt:
          "Explore the real-world hacking tools featured in the acclaimed TV series Mr. Robot. From reconnaissance to exploitation, discover the arsenal used by fsociety and learn their legitimate security applications.",
        url: "https://hackzism.blogspot.com/2020/06/fsociety-hacking-tools-from-mr-robot.html",
        date: "June 28, 2020",
        tags: ["Tools", "Penetration Testing", "Mr. Robot"],
        readingTime: "12 min read",
      },
      {
        id: "hackzism-3",
        title: "See Previously Connected WiFi Passwords Using CMD",
        excerpt:
          "A quick guide to retrieving stored WiFi passwords on Windows using command prompt. Useful for recovering your own forgotten passwords and understanding how Windows manages network credentials.",
        url: "https://hackzism.blogspot.com/2020/06/see-previously-connected-wifi-passwords.html",
        date: "June 09, 2020",
        tags: ["Networking", "Windows", "CMD"],
        readingTime: "5 min read",
      },
      {
        id: "hackzism-4",
        title: "Keylogger with Python — Capture Every Keystroke",
        excerpt:
          "Build a basic keylogger using Python to understand how these surveillance tools work. This educational project demonstrates keyboard event capture and logging mechanisms for security research purposes.",
        url: "https://hackzism.blogspot.com/2020/05/keylogger-with-python.html",
        date: "May 15, 2020",
        tags: ["Python", "Keylogger", "Security Research"],
        readingTime: "10 min read",
      },
      {
        id: "hackzism-5",
        title: "Getting Started with Kali Linux for Beginners",
        excerpt:
          "Your comprehensive introduction to Kali Linux, the premier penetration testing distribution. Learn installation, essential tools, and best practices for setting up your ethical hacking environment.",
        url: "https://hackzism.blogspot.com/2020/04/getting-started-kali-linux.html",
        date: "April 22, 2020",
        tags: ["Kali Linux", "Beginner", "Setup Guide"],
        readingTime: "15 min read",
      },
      {
        id: "hackzism-6",
        title: "Network Scanning with Nmap — Complete Tutorial",
        excerpt:
          "Master the art of network reconnaissance with Nmap. This comprehensive tutorial covers port scanning, service detection, OS fingerprinting, and scripting engine usage for thorough network analysis.",
        url: "https://hackzism.blogspot.com/2020/03/nmap-network-scanning-tutorial.html",
        date: "March 10, 2020",
        tags: ["Nmap", "Network Scanning", "Reconnaissance"],
        readingTime: "18 min read",
      },
    ],
  },
  {
    id: "bibliosmia",
    name: "Bibliosmia",
    tagline: "The intoxicating scent of good books",
    description:
      "Here's some books that I've read and some that I haven't. I'll give some of my thoughts about these. A personal journey through literature, exploring stories that inspire, challenge, and transform.",
    url: "https://hhhrrrttt222111.blogspot.com/",
    topics: ["Book Reviews", "Literature", "Reading", "Fiction", "Non-Fiction"],
    theme: "literary",
    posts: [
      {
        id: "bibliosmia-1",
        title: "The Midnight Library — A Review",
        excerpt:
          "Matt Haig's beautiful exploration of regret, possibility, and the lives we could have lived. Between life and death, Nora finds a library containing infinite versions of her existence. A profound meditation on choices and meaning.",
        url: "https://hhhrrrttt222111.blogspot.com/2023/midnight-library-review.html",
        date: "November 15, 2023",
        tags: ["Fiction", "Philosophy", "Matt Haig"],
        readingTime: "6 min read",
      },
      {
        id: "bibliosmia-2",
        title: "Why We Should All Read More Classics",
        excerpt:
          "In an age of endless content, classic literature offers something irreplaceable. From Dostoevsky's psychological depth to Austen's social wit, discover why these timeless works deserve a place on your reading list.",
        url: "https://hhhrrrttt222111.blogspot.com/2023/read-more-classics.html",
        date: "October 28, 2023",
        tags: ["Classics", "Reading", "Literature"],
        readingTime: "8 min read",
      },
      {
        id: "bibliosmia-3",
        title: "Atomic Habits — Transforming Life One Page at a Time",
        excerpt:
          "James Clear's masterpiece on habit formation isn't just a self-help book—it's a scientific approach to personal change. Discover how tiny changes compound into remarkable results through this insightful review.",
        url: "https://hhhrrrttt222111.blogspot.com/2023/atomic-habits-review.html",
        date: "September 12, 2023",
        tags: ["Non-Fiction", "Self-Help", "James Clear"],
        readingTime: "7 min read",
      },
      {
        id: "bibliosmia-4",
        title: "The Art of Reading Multiple Books at Once",
        excerpt:
          "Juggling fiction and non-fiction, heavy and light reads. Learn the strategies for maintaining multiple reading threads without losing the plot—literally. A practical guide for the ambitious bibliophile.",
        url: "https://hhhrrrttt222111.blogspot.com/2023/reading-multiple-books.html",
        date: "August 05, 2023",
        tags: ["Reading Tips", "Productivity", "Books"],
        readingTime: "5 min read",
      },
      {
        id: "bibliosmia-5",
        title: "Project Hail Mary — Science Fiction at Its Finest",
        excerpt:
          "Andy Weir delivers another triumph of scientific problem-solving and human resilience. Follow Ryland Grace on an impossible mission to save Earth, armed with nothing but wit, science, and an unexpected friendship.",
        url: "https://hhhrrrttt222111.blogspot.com/2023/project-hail-mary-review.html",
        date: "July 20, 2023",
        tags: ["Science Fiction", "Andy Weir", "Space"],
        readingTime: "9 min read",
      },
      {
        id: "bibliosmia-6",
        title: "Building a Personal Library — A Collector's Journey",
        excerpt:
          "From scattered paperbacks to a curated collection. Thoughts on building a meaningful personal library, choosing editions, organizing shelves, and creating a space that reflects your literary journey.",
        url: "https://hhhrrrttt222111.blogspot.com/2023/building-personal-library.html",
        date: "June 08, 2023",
        tags: ["Books", "Collection", "Personal"],
        readingTime: "6 min read",
      },
    ],
  },
];

export const HACKZISM_BLOG = BLOGS.find((blog) => blog.id === "hackzism")!;
export const BIBLIOSMIA_BLOG = BLOGS.find((blog) => blog.id === "bibliosmia")!;

export interface LegacyBlogPost {
  id: number;
  title: string;
  date: string;
  url: string;
  tag: string;
}

export const BLOG_POSTS: LegacyBlogPost[] = [
  {
    id: 1,
    title: "Instagram phishing using Hiddeneye",
    date: "August 03, 2020",
    url: "https://hackzism.blogspot.com/2020/08/instagram-phishing-using-hiddeneye.html",
    tag: "Security",
  },
  {
    id: 2,
    title: "FSOCIETY hacking tools from Mr. Robot",
    date: "June 28, 2020",
    url: "https://hackzism.blogspot.com/2020/06/fsociety-hacking-tools-from-mr-robot.html",
    tag: "Tools",
  },
  {
    id: 3,
    title: "See previously connected wifi passwords using cmd",
    date: "June 09, 2020",
    url: "https://hackzism.blogspot.com/2020/06/see-previously-connected-wifi-passwords.html",
    tag: "Networking",
  },
  {
    id: 4,
    title: "Keylogger with Python — capture every keystroke",
    date: "May 15, 2020",
    url: "https://hackzism.blogspot.com/2020/05/keylogger-with-python.html",
    tag: "Python",
  },
];

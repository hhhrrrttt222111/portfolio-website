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
        readingTime: "10 min read",
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
        title: "Tracing packets with Traceroute",
        excerpt:
          "Traceroute is a command which shows the path a packet of information from user computer to destination.",
        url: "https://hackzism.blogspot.com/2020/08/tracing-packets-with-traceroute.html",
        date: "August 03, 2020",
        tags: ["Networking", "Traceroute"],
        readingTime: "5 min read",
      },
      {
        id: "hackzism-6",
        title: "Scraping Billboard and IMDB using python Selenium",
        excerpt:
          "Learn how to scrape the Billboard and IMDB websites using Python and Selenium to extract movie data. This tutorial covers web scraping techniques, handling dynamic content, and managing browser interactions for efficient data collection.",
        url: "https://hackzism.blogspot.com/2020/07/scraping-billboard-and-imdb-using.html",
        date: "July 01, 2020",
        tags: ["Python", "Selenium", "Web Scraping"],
        readingTime: "4 min read",
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
        title: "The Da Vinci Code",
        excerpt:
          "The Da Vinci Code is a thrilling mystery that follows symbologist Robert Langdon as he investigates the murder of a renowned curator at the Louvre. He discovers that the ancient order of the Priory of Sion is linked to a centuries-old conspiracy to protect the secret of Jesus Christ's bloodline.",
        url: "https://hhhrrrttt222111.blogspot.com/2018/05/the-da-vinci-code-exciting-fascinating.html",
        date: "May 31, 2018",
        tags: ["Fiction", "Mystery", "Dan Brown"],
        readingTime: "1 min read",
      },
      {
        id: "bibliosmia-2",
        title: "Murder on the Orient Express",
        excerpt:
          "Murder on the Orient Express is a classic murder mystery novel written by Agatha Christie. It is one of the most famous and influential detective stories of all time. The novel follows the investigation of a murder that takes place on a train traveling from Istanbul to London.",
        url: "https://hhhrrrttt222111.blogspot.com/2018/05/murder-on-orient-express-this-is-one-of.html",
        date: "May 30, 2018",
        tags: ["Mystery", " Agatha Christie"],
        readingTime: "1 min read",
      },
      {
        id: "bibliosmia-3",
        title: "Anna Karenina",
        excerpt:
          "Anna Karenina is a classic novel written by Leo Tolstoy. It is one of the most famous and influential novels of all time. The novel follows the story of Anna Karenina, a beautiful woman who is caught in a web of love and infidelity.",
        url: "https://hhhrrrttt222111.blogspot.com/2018/06/anna-karenina-this-book-is-reason-why.html",
        date: "June 1, 2018",
        tags: ["Novel", "Leo Tolstoy"],
        readingTime: "1 min read",
      },
      {
        id: "bibliosmia-4",
        title: "Rebecca",
        excerpt:
          "Rebecca is a classic novel written by Daphne du Maurier. It is one of the most famous and influential novels of all time. The novel follows the story of a young woman who is caught in a web of love and infidelity.",
        url: "https://hhhrrrttt222111.blogspot.com/2018/06/rebecca-romance-mystery-horror-evilness.html",
        date: "June 24, 2018",
        tags: ["Novel", "Daphne du Maurier"],
        readingTime: "1 min read",
      },
      {
        id: "bibliosmia-5",
        title: "Not a Penny More, Not a Penny Less",
        excerpt:
          "Not a Penny More, Not a Penny Less is a classic novel written by Jeffrey Archer. It is one of the most famous and influential novels of all time. The novel follows the story of a young man who is caught in a web of love and infidelity.",
        url: "https://hhhrrrttt222111.blogspot.com/2018/06/not-penny-more-not-penny-less-just-like.html",
        date: "June 24, 2018",
        tags: ["Novel", "Jeffrey Archer"],
        readingTime: "1 min read",
      },
      {
        id: "bibliosmia-6",
        title: "The Count of Monte Cristo",
        excerpt:
          "The Count of Monte Cristo is a classic novel written by Alexandre Dumas. It is one of the most famous and influential novels of all time. The novel follows the story of a young man who is caught in a web of love and infidelity.",
        url: "https://hhhrrrttt222111.blogspot.com/2018/05/the-count-of-monte-cristo-well-if-you.html",
        date: "June 08, 2018",
        tags: ["Novel", "Alexandre Dumas"],
        readingTime: "1 min read",
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
  {
    id: 5,
    title: "Rebecca",
    date: "June 24, 2018",
    url: "https://hhhrrrttt222111.blogspot.com/2018/06/rebecca-romance-mystery-horror-evilness.html",
    tag: "Literature",
  },
];

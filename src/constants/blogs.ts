export interface BlogPost {
  id: number;
  title: string;
  date: string;
  url: string;
  tag: string;
}

export const BLOG_POSTS: BlogPost[] = [
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

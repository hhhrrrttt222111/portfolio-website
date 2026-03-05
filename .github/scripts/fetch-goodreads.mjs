/**
 * Fetches the Goodreads "read" shelf RSS feed and converts it to books.json.
 *
 * Usage: GOODREADS_USER_ID=12345 node .github/scripts/fetch-goodreads.mjs
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "../..");
const OUT_PATH = resolve(ROOT, "public/data/books.json");

function loadEnv() {
  const envPath = resolve(ROOT, ".env");
  if (!existsSync(envPath)) return;
  const lines = readFileSync(envPath, "utf-8").split("\n");
  for (const line of lines) {
    const match = line.match(/^\s*([\w]+)\s*=\s*(.+)\s*$/);
    if (match && !process.env[match[1]]) {
      process.env[match[1]] = match[2];
    }
  }
}

loadEnv();

const USER_ID = process.env.GOODREADS_USER_ID;
if (!USER_ID) {
  console.error("GOODREADS_USER_ID environment variable is required");
  process.exit(1);
}

const RSS_URL = `https://www.goodreads.com/review/list_rss/${USER_ID}?shelf=read`;

function extractText(xml, tag) {
  const re = new RegExp(`<${tag}><!\\[CDATA\\[([\\s\\S]*?)\\]\\]></${tag}>|<${tag}>([^<]*)</${tag}>`);
  const match = xml.match(re);
  return match ? (match[1] ?? match[2] ?? "").trim() : "";
}

function extractImageSrc(xml) {
  const match = xml.match(/<img[^>]+src="([^"]+)"/);
  return match ? match[1].replace(/\._\w+_\./, ".") : "";
}

function parseItem(itemXml) {
  const title = extractText(itemXml, "title");
  const author = extractText(itemXml, "author_name");
  const userRating = parseInt(extractText(itemXml, "user_rating"), 10) || 0;
  const avgRating = parseFloat(extractText(itemXml, "average_rating")) || 0;
  const readDate = extractText(itemXml, "user_read_at");
  const link = extractText(itemXml, "link");
  const bookDescription = extractText(itemXml, "book_description");

  const cover = extractImageSrc(bookDescription || extractText(itemXml, "description"));

  let formattedDate = "";
  if (readDate) {
    try {
      formattedDate = new Date(readDate).toISOString().split("T")[0];
    } catch {
      formattedDate = readDate;
    }
  }

  return {
    title,
    author,
    cover,
    rating: userRating,
    avgRating: Math.round(avgRating * 100) / 100,
    readDate: formattedDate,
    link,
  };
}

async function fetchAllPages() {
  const allBooks = [];
  let page = 1;

  while (true) {
    const url = `${RSS_URL}&page=${page}`;
    console.log(`Fetching page ${page}...`);

    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}: ${res.statusText}`);
    }

    const xml = await res.text();
    const items = xml.match(/<item>[\s\S]*?<\/item>/g);

    if (!items || items.length === 0) break;

    for (const item of items) {
      const book = parseItem(item);
      if (book.title) allBooks.push(book);
    }

    if (items.length < 20) break;
    page++;
  }

  return allBooks;
}

async function main() {
  try {
    const books = await fetchAllPages();
    books.sort((a, b) => (b.readDate || "").localeCompare(a.readDate || ""));

    mkdirSync(dirname(OUT_PATH), { recursive: true });
    writeFileSync(OUT_PATH, JSON.stringify(books, null, 2));
    console.log(`Wrote ${books.length} books to ${OUT_PATH}`);
  } catch (err) {
    console.error("Failed to fetch Goodreads data:", err);
    process.exit(1);
  }
}

main();

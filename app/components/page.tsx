import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";

const title = "Float UI - Introduction";
const description =
  "Beautiful and responsive UI components and templates for React and Vue with Tailwind CSS.";

export const metadata = {
  metadataBase: new URL("https://floatui.com"),
  title,
  description,
  openGraph: {
    title,
    url: "https://floatui.com",
    description,
  },
  twitter: {
    title,
    description,
  },
};

export default async () => {
  const markdownWithMeta = fs.readFileSync(
    path.join(process.cwd(), "content/intro.mdx"),
    "utf-8"
  );
  const { data: frontMatter, content } = matter(markdownWithMeta);
  const mdxSource = await serialize(content);

  return (
    <>
      <article className="prose prose-invert max-w-7xl">
      </article>
    </>
  );
};

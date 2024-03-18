import fs from "fs";
import { compileMDX } from "next-mdx-remote/rsc";

export type Metadata = {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
};

export type Post = {
  metadata: Metadata;
  content: any;
};

type GitFileTree = {
  tree: [
    {
      path: string;
    }
  ];
};

export async function getPostByName(name: string): Promise<Post> {
  const res = await fetch(
    `https://raw.githubusercontent.com/Akmenz/mdx_blogposts/main/${name}`,
    {
      headers: {
        "Cache-Control": "no-cache",
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${process.env.GIT_TOKEN}`,
        "X-GitHub-Api-Version": "2022-11-28",
      },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const mdx = await res.text();

  if (mdx === "404: Not Found") {
    throw new Error("Not Found");
  }

  const { frontmatter, content } = await compileMDX<{
    title: string;
    description: string;
    date: string;
    tags: string[];
  }>({
    source: mdx,
    options: {
      parseFrontmatter: true,
    },
  });

  console.log(`Frontmatter:`, frontmatter);

  const slug = name.replace(/\.mdx$/, "");
  const postObj: Post = {
    metadata: {
      slug,
      title: frontmatter.title,
      description: frontmatter.description,
      date: frontmatter.date,
      tags: frontmatter.tags,
    },
    content,
  };

  return postObj;
}

export async function getPostsMetadatas(): Promise<Metadata[] | undefined> {
  const res = await fetch(
    "https://api.github.com/repos/Akmenz/mdx_blogposts/git/trees/main?recursive=1",
    {
      headers: {
        "Cache-Control": "no-cache",
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${process.env.GIT_TOKEN}`,
        "X-GitHub-Api-Version": "2022-11-28",
      },
    }
  );

  if (!res.ok) return undefined;

  const gitFileTree: GitFileTree = await res.json();

  console.log("File tree:", gitFileTree.tree);

  const files = gitFileTree.tree
    .map((file) => file.path)
    .filter((path) => path.endsWith(".mdx"));

  console.log("Files post:", files);

  const posts: Metadata[] = [];

  for (const filePath of files) {
    console.log(`Fetching post: ${filePath}`);
    const post = await getPostByName(filePath);
    if (post) {
      posts.push(post.metadata);
    }
  }

  console.log(`Posts metadata:`, posts);

  return posts.sort((a, b) => (a.date < b.date ? 1 : -1))
}

// export function getPostsMetadata() {
//   const folder = "posts";
//   const files = fs.readdirSync(folder);
//   const markdownFiles = files.filter((file) => file.endsWith(".md"));
//   const slugs = markdownFiles.map((file) => file.replace(".md", ""));
//   return slugs;
// }

// // get content for individual post
// export function getPostContentBySlug(slug: string) {
//   const folder = "posts";
//   const file = `${folder}/${slug}.md`;
//   const content = fs.readFileSync(file, "utf8");
//   return content;
// }

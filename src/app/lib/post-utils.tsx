import { compileMDX } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";

export type Metadata = {
  slug: string;
  title: string;
  description: string;
  author: string;
  authorImage: string;
  date: string;
  image: string;
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

const prettyCodeOptions = {
  lang: 'ts',
  theme: 'one-dark-pro', // dark theme
  keepBackground: true,
  bypassInlineCode: true,

  onVisitLine(node: any) {
    if (node.properties?.className) {
      node.properties.className.push("bg-[#282c34]");
    } else {
      node.properties = { className: ["bg-[#282c34]"] };
    }
  },
};

export async function getPostByName(name: string): Promise<Post> {
  const res = await fetch(
    `https://raw.githubusercontent.com/Akmenz/mdx_blogposts/main/posts/${name}`,
    {
      next: { revalidate: 10 },
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
    author: string;
    authorImage: string;
    date: string;
    image: string;
    tags: string[];
  }>({
    source: mdx,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        // rehypePlugins: [rehypeHighlight],
        rehypePlugins: [[rehypePrettyCode, prettyCodeOptions]],
      },
    },
  });

  // console.log(`Frontmatter:`, frontmatter);

  const slug = name.replace(/\.mdx$/, "");
  const postObj: Post = {
    metadata: {
      slug,
      title: frontmatter.title,
      description: frontmatter.description,
      author: frontmatter.author,
      authorImage: frontmatter.authorImage,
      date: frontmatter.date,
      image: frontmatter.image || "/default.jpg",
      tags: frontmatter.tags,
    },
    content,
  };

  return postObj;
}

export async function getPostsMetadata(
  limit?: number
): Promise<Metadata[] | undefined> {
  const res = await fetch(
    "https://api.github.com/repos/Akmenz/mdx_blogposts/git/trees/main?recursive=1",
    {
      next: { revalidate: 3600 }, // revalidate every hour
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

  // console.log("File tree:", gitFileTree.tree);

  const files = gitFileTree.tree
    .map((file) => file.path)
    .filter((path) => path.endsWith(".mdx"))
    .map((path) => path.split("/").pop()!);

  // console.log("Files post:", files);

  const posts: Metadata[] = [];

  for (const filePath of files) {
    // console.log(`Fetching post: ${filePath}`);
    const post = await getPostByName(filePath);
    if (post) {
      posts.push(post.metadata);
    }
  }

  // console.log(`Posts metadata:`, posts);

  const sortedPosts = posts.sort((a, b) => (a.date < b.date ? 1 : -1));

  if (limit) {
    return sortedPosts.slice(0, limit);
  }

  return sortedPosts;
}
function visit(tree: any, arg1: string, arg2: (node: any) => void) {
  throw new Error("Function not implemented.");
}


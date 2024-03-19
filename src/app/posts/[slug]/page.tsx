import type { Post } from "@/app/lib/post-utils";
import { getPostByName, getPostsMetadata } from "@/app/lib/post-utils";
import "highlight.js/styles/github-dark-dimmed.css";

type Props = {
  params: {
    slug: string;
  };
};

export async function generateStaticParams() {
  const posts = await getPostsMetadata();

  if (!posts) return [];

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// export async function generateMetadata({ params: { slug } }: Props) {
//   const post = await getPostByName(`${slug}.mdx`);

//   if (!post) {
//     return {
//       title: "Not Found",
//     };
//   }

//   return {
//     title: post.metadata.title,
//   };
// }

export default async function Post({ params: { slug } }: Props) {
  const post = await getPostByName(`${slug}.mdx`);

  const { metadata, content } = post;

  return (
    <>
      <div className="p-20">
        <h2 className="text-5xl font-bold mt-4 mb-4">{metadata.title}</h2>
        <article>{content}</article>
        <p className="text-end mt-5 text-sm">Janis Akmentins {metadata.date}</p>
      </div>
    </>
  );
}

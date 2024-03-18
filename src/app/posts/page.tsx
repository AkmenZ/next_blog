import Link from "next/link";
import { getPostsMetadata } from "../lib/post-utils";

export default async function Posts() {
  const postsMetadata = await getPostsMetadata();

  if (!postsMetadata) {
    return <h2 className="text-center">No Posts available!</h2>;
  }

  const posts = postsMetadata.map((post) => (
    <Link href={`/posts/${post.slug}`} key={post.slug}>
      <div>
        <h1 className="text-3xl">{post.title}</h1>
        <p>{post.date}</p>
        <h2 className="text-2xl">{post.description}</h2>
      </div>
    </Link>
  ));

  return (
    <div className="flex min-h-screen flex-col p-20 gap-4 md:grid md:grid-cols-2 lg:grid-cols-3">
      {posts}
    </div>
  );
}

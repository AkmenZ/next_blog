import Link from "next/link";
import { getPostsMetadata } from "../lib/post-utils";
import PostCard from "../components/PostCard";

export default async function Posts() {
  const postsMetadata = await getPostsMetadata();

  if (!postsMetadata) {
    return <h2 className="text-center">No Posts available!</h2>;
  }

  const posts = postsMetadata.map((post) => (
    <Link href={`/posts/${post.slug}`} key={post.slug}>
      <PostCard metadata={post}></PostCard>
    </Link>
  ));

  return (
    <div className="flex min-h-screen flex-col px-10 gap-6 md:grid md:grid-cols-2 lg:grid-cols-3 justify-center">
      {posts}
    </div>
  );
}

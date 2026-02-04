import Link from "next/link";
import Hero from "./components/Hero";
import { getPostsMetadata } from "./lib/post-utils";
import PostCard from "./components/PostCard";

export const revalidate = 86400; // revalidate this page every day

export default async function Home() {
  const postsMetadata = await getPostsMetadata(3);

  const posts = postsMetadata?.map((post) => (
    <Link href={`/posts/${post.slug}`} key={post.slug}>
      <PostCard metadata={post}></PostCard>
    </Link>
  ));

  return (
    <main className="flex flex-col min-h-screen w-full items-center">
      <div className="z-10 w-screen font-mono text-sm">
        <Hero></Hero>
      </div>
      <div className="py-10 w-full">
        <h3 className="text-5xl font-bold text-center pb-10">Latest posts</h3>
        {postsMetadata?.length ? (
          <div className="flex flex-col px-10 gap-6 sm:grid md:grid-cols-2 lg:grid-cols-3 justify-center">
            {posts}
          </div>
        ) : (
          <h2 className="text-center">No Posts available!</h2>
        )}
      </div>
    </main>
  );
}

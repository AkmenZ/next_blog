// import Link from "next/link";
// import { getPostsMetadatas } from "../lib/post-utils";

import Link from "next/link";
import { getPostsMetadatas } from "../lib/post-utils";

// export default function PostList() {
//   const postMetadata = getPostsMetadata();
//   const posts = postMetadata.map((slug) => (
//     <Link href={`/posts/${slug}`}>
//       <div>
//         <h1>{slug}</h1>
//       </div>
//     </Link>
//   ));

//   return (
//     <div className="flex min-h-screen flex-col items-center justify-between p-24">
//       {posts}
//     </div>
//   );
// }

export default async function Posts() {
  const postsMetadata = await getPostsMetadatas();

  if (!postsMetadata) {
    return <h2 className="text-center">No Posts available!</h2>;
  }

  const posts = postsMetadata.map((post) => (
    <Link href={`/posts/${post.slug}`} key={post.slug}>
      <div>
        <h1 className="text-2xl">{post.title}</h1>
        <p>{post.date}</p>
        <h2>{post.description}</h2>
      </div>
    </Link>
  ));

  return (
    <div className="flex min-h-screen flex-col items-center p-24 gap-4 md:grid md:grid-cols-2 lg:grid-cols-3">{posts}</div>
  );
}

import Link from "next/link";
import Image from "next/image";
import { getPostsMetadata } from "../lib/post-utils";

export default async function Posts() {
  const postsMetadata = await getPostsMetadata();

  if (!postsMetadata) {
    return <h2 className="text-center">No Posts available!</h2>;
  }

  const posts = postsMetadata.map((post) => (
    <Link href={`/posts/${post.slug}`} key={post.slug}>
      <div className="bg-white max-w-sm rounded-lg m-auto overflow-hidden shadow-md hover:shadow-xl transform hover:scale-105 transition-all duration-300 ease-in-out">
        <div className="relative h-56 w-full flex items-center justify-center">
          <Image
            src={post.image}
            alt="image"
            layout="fill"
            objectFit="cover"
          ></Image>
          <p className="text-sm text-white bg-black bg-opacity-50 absolute top-0 left-0 ml-3 mt-2 p-1 rounded">
            {post.tags.join(" ")}
          </p>
        </div>
        <div className="px-6 py-4">
          <h1 className="font-bold text-2xl mb-2 text-gray-800">
            {post.title}
          </h1>
          <p className="text-gray-700 text-sm">{post.date}</p>
          <h2 className="text-gray-600 text-lg mt-4 truncate overflow-hidden whitespace-nowrap text-ellipsis">{post.description}</h2>
        </div>
      </div>
    </Link>
  ));

  return (
    <div className="flex min-h-screen flex-col mt-16 p-10 gap-6 md:grid md:grid-cols-2 lg:grid-cols-3 justify-center">
      {posts}
    </div>
  );
}

import type { Post } from "@/app/lib/post-utils";
import Image from "next/image";
import { getPostByName, getPostsMetadata } from "@/app/lib/post-utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComment,
  faThumbsUp,
  faArrowUpFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import "highlight.js/styles/github-dark-dimmed.css";
import { getComments } from "@/app/lib/actions";

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

export default async function Post({ params: { slug } }: Props) {
  const post = await getPostByName(`${slug}.mdx`);
  const commentsResult = await getComments(slug);

  const { metadata, content } = post;
  const comments = commentsResult.success && commentsResult.data ? commentsResult.data : [];

  return (
    <>
      <div className="p-20">
        <div className="relative w-full h-48 md:h-72 lg:h-96">
          <Image
            src={post.metadata.image}
            alt="main image"
            layout="fill"
            objectFit="cover"
            objectPosition="top"
          ></Image>
        </div>
        <h2 className="text-5xl font-semibold my-4">{metadata.title}</h2>

        <div className="border-t border-b border-gray-200 py-4">
          <div className="flex items-center space-x-3">
            <Image
              src={metadata.authorImage || "/default-avatar.png"}
              alt="User Image"
              width={40}
              height={40}
              className="rounded-full"
            ></Image>
            <div className="flex flex-col">
              <h2 className="text-lg font-semibold">{metadata.author}</h2>
              <p className="text-sm font-extralight">{metadata.date}</p>
            </div>
          </div>
        </div>

        <article className="pt-4 pb-8">{content}</article>

        <div className="border-t border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <FontAwesomeIcon icon={faComment} className="h-6 w-6" />
              <p>{comments.length}</p>
              <FontAwesomeIcon icon={faThumbsUp} className="h-6 w-6" />
              <p>2</p>
            </div>
            <FontAwesomeIcon icon={faArrowUpFromBracket} className="h-6 w-6" />
          </div>
        </div>
        
        <div className="mt-8">
          <h3 className="text-2xl font-semibold mb-4">Comments</h3>
          <ul className="list-disc pl-5">
            {comments.length > 0 ? comments.map((comment) => (
              <li key={comment.id} className="mb-2">
                <div className="flex items-start space-x-3">
                  <Image
                    src={comment.authorImageUrl || "/default-avatar.png"}
                    alt="User Image"
                    width={30}
                    height={30}
                    className="rounded-full"
                  ></Image>
                  <div>
                    <p className="text-sm font-semibold">{comment.authorEmail}</p>
                    <p className="text-sm">{comment.content}</p>
                    <p className="text-xs text-gray-500">{new Date(comment.createdAt).toLocaleString()}</p>
                  </div>
                </div>
              </li>
            )) : (
              <li>No comments yet.</li>
            )}
          </ul>
        </div>

      </div>
    </>
  );
}

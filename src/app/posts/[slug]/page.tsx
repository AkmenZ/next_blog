import type { Post } from "@/app/lib/post-utils";
import type { Comment, Like } from "@/app/lib/types";
import Image from "next/image";
import { getPostByName, getPostsMetadata } from "@/app/lib/post-utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { getComments, getLikes } from "@/app/lib/data";
import CommentForm from "@/app/components/CommentForm";
import LikeButton from "@/app/components/LikeButton";
import CopyButtonHandler from "@/app/components/CopyButton";

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

export const dynamicParams = false; // Block 404s from triggering ISR
export const revalidate = 86400; // Revalidate this page every day

export default async function Post({ params: { slug } }: Props) {
  const post = await getPostByName(`${slug}.mdx`);
  const commentsResult = await getComments(slug);
  const likesResult = await getLikes(slug);

  const { metadata, content } = post;
  const comments: Comment[] =
    commentsResult.success && commentsResult.data ? commentsResult.data : [];
  const likes: Like[] =
    likesResult.success && likesResult.data ? likesResult.data : [];

  return (
    <>
      <div className="relative w-full h-56 md:h-96">
        <Image
          src={post.metadata.image}
          alt="main image"
          fill
          style={{ objectFit: "cover" }}
          className="md:px-10"
        ></Image>
      </div>
      <div className="py-1 px-6 md:px-10">
        <h2 className="text-5xl font-semibold my-4">{metadata.title}</h2>
        <div className="border-t border-b border-black border-opacity-20 py-4">
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
              <p className="text-sm font-extralight text-gray-500">
                {metadata.date}
              </p>
            </div>
          </div>
        </div>

        {/* mdx content */}
        <article className="p-4">{content}</article>
        <CopyButtonHandler />


        <div className="border-t border-b border-black border-opacity-20 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <FontAwesomeIcon icon={faComment} className="h-6 w-6" />
              <p>{comments.length}</p>
              <FontAwesomeIcon icon={faThumbsUp} className="h-6 w-6" />
              <p>{likes.length}</p>
            </div>
            <LikeButton blog={slug} likes={likes}></LikeButton>
          </div>
        </div>

        {/* comments list */}
        <div className="mt-4">
          <h3 className="text-2xl font-semibold mb-4">Comments</h3>
          <CommentForm blog={slug}></CommentForm>
          <ul className="px-8 mt-4">
            {comments.length > 0 ? (
              comments.map((comment) => (
                <li
                  key={comment.id}
                  className="my-4 border-b border-black border-opacity-20 p-4"
                >
                  <div className="flex items-start space-x-3 w-full">
                    <Image
                      src={comment.authorImageUrl || "/default-avatar.png"}
                      alt="User Image"
                      width={40}
                      height={40}
                      className="rounded-full"
                    ></Image>
                    <div className="w-full">
                      <div className="flex items-center justify-between w-full">
                        <p className="text-sm font-semibold">
                          {comment.authorName}
                        </p>
                        <p className="text-sm font-extralight text-gray-500">
                          {new Date(comment.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <p className="text-sm">{comment.content}</p>
                    </div>
                  </div>
                </li>
              ))
            ) : (
              <li>No comments yet.</li>
            )}
          </ul>
        </div>
      </div>
    </>
  );
}

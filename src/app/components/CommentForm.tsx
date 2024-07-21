"use client";

import { Textarea } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { useSession } from "next-auth/react";
import { useRef } from "react";
import { addComment } from "../lib/actions";
import Link from "next/link";

interface CommentFormProps {
  blog: string;
}

export default function CommentForm({ blog }: CommentFormProps) {
  const ref = useRef<HTMLFormElement>(null);
  const { status, data: session } = useSession();
  const authorName = session?.user?.name;
  const authorEmail = session?.user?.email;
  const authorImageUrl = session?.user?.image;

  // if user not signed in, return sign in component
  if (!authorEmail || !authorImageUrl || !authorName) {
    return (
      <div className="flex flex-col items-center w-full space-y-2 p-5 bg-gray-100 rounded-lg">
        <p>Please log in to post comments</p>
        <Link href="?login=true">
          <Button
            radius="sm"
            className="px-4 py-2 text-white bg-violet-500 hover:bg-violet-700"
          >
            Sign In
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <form
      ref={ref}
      action={async (formData) => {
        await addComment(
          blog,
          formData,
          authorEmail,
          authorName,
          authorImageUrl
        );
        ref.current?.reset(); // reset the form
      }}
      className="flex items-center space-x-2"
    >
      <Textarea
        type="text"
        name="comment"
        placeholder="Aa..."
        variant="faded"
        maxLength={200}
      ></Textarea>
      <Button type="submit" color="secondary">
        Post
      </Button>
    </form>
  );
}

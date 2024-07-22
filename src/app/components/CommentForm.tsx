"use client";

import { Textarea } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRef } from "react";
import { addComment } from "../lib/actions";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
            color="secondary"
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
      className="flex flex-col items-center space-y-2"
    >
      <div className="flex w-full gap-4">
        <div>
          <Image
            src={authorImageUrl}
            alt="User Image"
            width={40}
            height={40}
            className="rounded-full"
          ></Image>
        </div>

        <Textarea
          type="text"
          name="comment"
          placeholder="Aa..."
          variant="faded"
          minRows={4}
          maxLength={200}
        ></Textarea>
      </div>

      <div className="flex justify-end w-full">
        <Button
          type="submit"
          color="secondary"
          startContent={<FontAwesomeIcon icon={faPaperPlane} />}
        >
          Post Comment
        </Button>
      </div>
    </form>
  );
}

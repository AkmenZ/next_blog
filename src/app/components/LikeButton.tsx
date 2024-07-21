"use client";

import { Button } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { addLike, removeLike } from "../lib/actions";
import { Like } from "../lib/types";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface LikeButtonProps {
  blog: string;
  likes: Like[];
}

export default function LikeButton({ blog, likes }: LikeButtonProps) {
  const { status, data: session } = useSession();
  const authorEmail = session?.user?.email;

  // checking if likes array already contains authorEmail
  const hasLiked = likes.some((like) => like.authorEmail === authorEmail);

  if (!authorEmail) {
    return (
      <Button isDisabled startContent={<FontAwesomeIcon icon={faThumbsUp} />}>
        Like
      </Button>
    );
  }

  return (
    <Button
      onClick={async () => {
        if (hasLiked) {
          await removeLike(blog, authorEmail);
        } else {
          await addLike(blog, authorEmail);
        }
      }}
      color={hasLiked ? "danger" : "secondary"}
      variant="ghost"
      startContent={
        <FontAwesomeIcon icon={hasLiked ? faThumbsDown : faThumbsUp} />
      }
    >
      {hasLiked ? "Unlike" : "Like"}
    </Button>
  );
}

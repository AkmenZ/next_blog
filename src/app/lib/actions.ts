"use server";

import { prisma } from "./db";
import { revalidatePath } from "next/cache";

// comments
export async function getComments(blog: string) {
  try {
    const comments = await prisma.comment.findMany({
      where: { blog: blog },
      orderBy: { createdAt: "desc" },
    });
    return { success: true, data: comments };
  } catch (error) {
    let errorMessage = "An unknown error occurred";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return { success: false, error: errorMessage };
  }
}

export async function addComment(
  blog: string,
  FormData: FormData,
  authorEmail: string,
  authorName: string,
  authorImageUrl: string
) {
  try {
    const newComment = await prisma.comment.create({
      data: {
        blog,
        content: FormData.get("comment") as string,
        authorEmail,
        authorName,
        authorImageUrl,
        createdAt: new Date(),
      },
    });
    revalidatePath(`/blog/${blog}`); // regenerate the page
    return { success: true, data: newComment };
  } catch (error) {
    let errorMessage = "An unknown error occurred";
    if (error instanceof Error) {
      errorMessage = error.message;
      console.error("Error message:", error.message);
    }
    return { success: false, error: errorMessage };
  }
}

// likes
export async function getLikes(blog: string) {
  try {
    const likes = await prisma.like.findMany({
      where: { blog: blog },
      orderBy: { createdAt: "desc" },
    });
    return { success: true, data: likes };
  } catch (error) {
    let errorMessage = "An unknown error occurred";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return { success: false, error: errorMessage };
  }
}

export async function addLike(blog: string, authorEmail: string) {
  try {
    const newLike = await prisma.like.create({
      data: {
        blog,
        authorEmail,
        createdAt: new Date(),
      },
    });
    revalidatePath(`/blog/${blog}`); // regenerate the page
    return { success: true, data: newLike };
  } catch (error) {
    let errorMessage = "An unknown error occurred";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return { success: false, error: errorMessage };
  }
}

export async function removeLike(blog: string, authorEmail: string) {
  try {
    await prisma.like.deleteMany({
      where: { blog: blog, authorEmail: authorEmail },
    });
    revalidatePath(`/blog/${blog}`); // regenerate the page
    return { success: true };
  } catch (error) {
    let errorMessage = "An unknown error occurred";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return { success: false, error: errorMessage };
  }
}

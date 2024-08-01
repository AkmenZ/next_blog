import { prisma } from "./db";

// call these directly from server component

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

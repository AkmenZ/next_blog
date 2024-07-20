import { prisma } from "./db";

export async function getComments(blog: string) {
  "use server";

  try {
    console.log("getting comments for blog:", blog);
    console.time("fetch comments");
    const comments = await prisma.comment.findMany({
      where: { blog: blog },
      orderBy: { createdAt: "desc" },
    });
    console.log("getting comments succeeds", comments);
    return { success: true, data: comments };
  } catch (error) {
    console.log("getting comments failed");
    let errorMessage = "An unknown error occurred";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return { success: false, error: errorMessage };
  }
}

"use server";

import { prisma } from "./db";
import { revalidatePath } from "next/cache";
import { Resend } from "resend";

// comments
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

// email
export async function sendEmail(FormData: FormData) {
  const resend = new Resend(process.env.RESEND_API_KEY);

  // HONEYPOT CHECK
  const honeypot = FormData.get("phone_number");
  if (honeypot) {
    // If this field has value, it's a bot. Return success to trick them, but send nothing
    return { success: true }; 
  }

  try{
    await new Promise(resolve => setTimeout(resolve, 1000));
    const data = await resend.emails.send({
      from: "contacts@ak-blog.com",
      reply_to: FormData.get("email") as string,
      to: "akmenz89@gmail.com",
      subject: `An Inquiry From ${FormData.get("name")}`,
      text: FormData.get("message") as string
    })
    revalidatePath(`/contact`); // regenerate the page

  } catch (error) {
    let errorMessage = "An unknown error occurred";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return { success: false, error: errorMessage };
  }
}

import { Post, getPostByName, getPostsMetadatas } from "@/app/lib/post-utils"

type Props = {
  params: {
      slug: string
  }
}

export async function generateStaticParams() {
  const posts = await getPostsMetadatas()

  if (!posts) return []

  return posts.map((post) => ({
      slug: post.slug
  }))
}

export async function generateMetadata({ params: { slug } }: Props) {

  const post = await getPostByName(`${slug}.mdx`)

  if (!post) {
      return {
          title: 'Post Not Found'
      }
  }

  return {
      title: post.metadata.title,
  }
}

export default async function Post({ params: { slug } }: Props) {

  const post = await getPostByName(`${slug}.mdx`)

  const { metadata, content } = post

  return (
      <>
          <h2 className="text-3xl mt-4 mb-0">{metadata.title}</h2>
          <p className="mt-0 text-sm">
              {metadata.date}
          </p>
          <article>
              {content}
          </article>
      </>
  )
}
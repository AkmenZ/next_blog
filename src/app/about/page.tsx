import Image from "next/image";
import ProjectShowcase from "../components/ProjectShowcase";
import LinkedInButton from "../components/LinkedInButton";

export default function About() {
  return (
    <>
      <div className="relative w-full bg-gradient-to-r from-purple-500 to-indigo-500 p-10">
        <div className="flex flex-col md:flex-row items-center md:items-start">
          <Image
            src="/akblog.jpeg"
            alt="My Image"
            width={200}
            height={200}
            className="rounded-full border-4 border-white"
          />
          <div className="text-center md:text-left md:ml-6">
            <p className="text-white text-2xl font-bold m-4">
              Hello!
            </p>
            <p className="text-white m-4 text-left">
            My name is Janis. I&apos;m a software developer from Sligo, Ireland. I graduated in Software Development from Atlantic Technological University in 2023. 
            I have experience working with a company that provides websites, room booking systems, and digital marketing solutions to 4* and 5* hotels. 
            This role helped me develop essential skills in software development and design, which I enjoy showcasing in my own projects. 
            I&apos;m particularly interested in web and mobile development, including game design. 
            I&apos;m always on the lookout for intriguing ideas, collaborations, and projects, so feel free to reach out!
            </p>
            <div className="flex items-center justify-end gap-2">
              <p className="text-white">Lets Connect</p>
              <LinkedInButton></LinkedInButton>
            </div>
          </div>
        </div>
      </div>
      {/* my projects */}
      <div className="flex justify-center pt-10">
        <h3 className="text-5xl font-bold">My Projects</h3>
      </div>
      {/* mobo */}
      <div className="w-full px-10 pt-10 my-4">
        <ProjectShowcase
          title="mobo"
          description="Mobo is a fully featured car listings platform, tailored to Latvian region and market. 
          The app is built with Flutter/Dart at it's core, utilizing RiverPod state management solution, and navigation with GoRouter package. 
          The backend services are handled by Supabase, that is built on top of PostgreSQL.
          It features account creation, individual and business user profile settup, and 1 on 1 realtime chat. 
          It integrates Stripe for payments, and additional features, like push notifications, are handled by Firebase."
          logo="/mobo-logo.png"
          image="/mobo-project.png"
          technologies={[
            "/flutter-logo.svg",
            "/supabase-logo.svg",
            "/firebase-logo.svg",
            "/javascript-logo.svg",
            "/stripe-logo.svg",
          ]}
          appStoreLinks={{appStoreLink: "https://apps.apple.com/ie/app/mobo-lv/id6467503039", playStoreLink: "https://play.google.com/store/apps/details?id=com.moboapp.listings_app&pcampaignid=web_share"}}
        ></ProjectShowcase>
      </div>
      {/* blog */}
      <div className="w-full px-10 pt-10 my-4">
        <ProjectShowcase
          title="ak.blog"
          description="Welcome! You're already here. An app like this is a great way to showcase your developer skills and also serves as part of portfolio. 
          The blog posts I make cover things I've worked on and had to research myself. The app itself is a full stack NextJS project written in TypeScript, 
          and the blog posts are in a seperate project as MDX files that get revalidated every 24 hours, since NextJS uses static site generation.
          This way it makes it easy for me to add new posts without the need to redeploy the app itself. I'm using Next Auth package to authenticate users with Google provider. 
          This allows to add like feature and a comment section, which stores data in a MongoDB Atlas database. To make the interaction easier, I'm using Prisma ORM. 
          UI/UX is a key part in any site, and to make things appealing, I used Tailwind CSS with Next UI library."
          logo="/akblog.png"
          image="/blog-project.png"
          technologies={[
            "/nextjs-logo.svg",
            "/tailwind-logo.svg",
            "/typescript-logo.svg",
            "/prisma-logo.svg",
            "/mongodb-logo.svg"
          ]}
        ></ProjectShowcase>
      </div>
    </>
  );
}

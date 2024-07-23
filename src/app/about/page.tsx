import { Link, Button } from "@nextui-org/react";
import Image from "next/image";
import ProjectShowcase from "../components/ProjectShowcase";
import AppStoreLinks from "../components/AppStoreLinks";

export default function About() {
  return (
    <>
      <div className="relative w-full bg-gradient-to-r from-purple-500 to-indigo-500 p-10 rounded-lg">
        <div className="flex flex-col md:flex-row items-center md:items-start">
          <Image
            src="/akblog.jpeg"
            alt="My Image"
            width={200}
            height={200}
            className="rounded-full border-4 border-white"
          />
          <div className="text-center md:text-left md:ml-6">
            <p className="text-white text-xl font-bold m-4">
              This is about page using app router!
            </p>
            <p className="text-white m-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse varius enim in eros elementum tristique. Duis cursus,
              mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam
              libero vitae erat. Aenean faucibus nibh et justo cursus id rutrum
              lorem imperdiet. Nunc ut sem vitae risus tristique posuere. Lorem
              ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
              varius enim in eros elementum tristique. Duis cursus, mi quis
              viverra ornare, eros dolor interdum nulla, ut commodo diam libero
              vitae erat. Aenean faucibus nibh et justo cursus id rutrum lorem
              imperdiet. Nunc ut sem vitae risus tristique posuere. Lorem ipsum
              dolor sit amet, consectetur adipiscing elit. Suspendisse varius
              enim in eros elementum tristique. Duis cursus, mi quis viverra
              ornare, eros dolor interdum nulla, ut commodo diam libero vitae
              erat. Aenean faucibus nibh et justo cursus id rutrum lorem
              imperdiet. Nunc ut sem vitae risus tristique posuere. Lorem ipsum
              dolor sit amet, consectetur adipiscing elit. Suspendisse varius
              enim in eros elementum tristique. Duis cursus, mi quis viverra
              ornare, eros dolor interdum nulla, ut commodo diam libero vitae
              erat. Aenean faucibus nibh et justo cursus id rutrum lorem
              imperdiet. Nunc ut sem vitae risus tristique posuere.
            </p>
            <div className="flex items-center justify-end gap-4">
              <p>Lets Connect</p>
              <Button
                href="https://www.linkedin.com/in/janisakmentins/"
                as={Link}
                isIconOnly
                radius="sm"
                variant="faded"
                style={{
                  border: "2px solid #0077B5",
                }}
              >
                <Image
                  src="/linkedin-logo.svg"
                  alt="LinkedIn Logo"
                  width="24"
                  height="24"
                />
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* my projects */}
      <div className="flex justify-center pt-4">
        <h3 className="text-4xl font-bold">My Projects</h3>
      </div>
      {/* mobo */}
      <div className="w-full px-10 pt-10 my-4">
        <ProjectShowcase
          title="MOBO"
          description="MOBO is a fully featured car listings platform, tailored to Latvian region and market. 
          The app is built with Flutter/Dart at it's core, and utilizes Supabase for backend services. 
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
        ></ProjectShowcase>
        <AppStoreLinks appStoreLink="" playStoreLink=""></AppStoreLinks>
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
          logo="/mobo-logo.png"
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

import { Link, Button } from "@nextui-org/react";
import Image from "next/image";
import ProjectShowcase from "../components/ProjectShowcase";

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
                color="primary"
                style={{
                  border: "2px solid white",
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
      <div className="flex justify-center p-4">
        <h3 className="text-3xl font-bold">My Projects</h3>
      </div>
      <div className="w-full bg-slate-200 p-10 rounded-lg">
        <ProjectShowcase
          title="MOBO"
          description="MOBO is a fully featured car listings platform, tailored to Latvian region and market. 
          The app is built with Flutter/Dart at it's core, and utilizes Supabase as it's backend. 
          It features account creation, individual and business user profile settup, and 1 on 1 realtime chat. 
          It integrates Stripe for payments, and additional features, like push notifications, are handled by Firebase."
          image="/mobo-project.png"
          technologies={[
            "/flutter-logo.svg",
            "/supabase-logo.svg",
            "/firebase-logo.svg",
            "/javascript-logo.svg",
            "/stripe-logo.svg",
          ]}
          links={["/app-store-badge.svg", "/google-play-badge.svg"]}
        ></ProjectShowcase>
      </div>
    </>
  );
}

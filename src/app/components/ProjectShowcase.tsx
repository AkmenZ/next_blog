"use client";

import Image from "next/image";
import AppStoreLinks, { AppStoreLinkProps } from "./AppStoreLinks";

interface ProjectShowcaseProps {
  title: string;
  description: string;
  logo: string;
  image: string;
  technologies: string[];
  appStoreLinks?: AppStoreLinkProps; // optional prop
}

export default function ProjectShowcase(props: ProjectShowcaseProps) {
  const { title, description, logo, image, technologies, appStoreLinks } = props;
  return (
    <div>
      {/* logo & technologies */}
      <div className="flex flex-wrap justify-end gap-4 pb-2">
        {technologies.map((tech, index) => (
          <Image
            key={index}
            src={tech}
            alt="Technology"
            width={20}
            height={20}
          ></Image>
        ))}
      </div>
      <div className="flex py-2 items-center mb-4 border-b border-t border-black border-opacity-20">
        <Image src={logo} alt="Logo" width={50} height={50}></Image>
        <h3 className="text-3xl font-bold p-2 ">
          {title}
        </h3>
      </div>
      <div className="flex flex-wrap md:flex-nowrap">
        <div className="w-full md:w-2/3 pb-4">
          <p>{description}</p>
        </div>
        <div className="w-full md:w-1/3">
          <Image
            src={image}
            alt="Project Image"
            width={300}
            height={300}
            className="mx-auto"
          ></Image>
          {appStoreLinks && <AppStoreLinks {...appStoreLinks} />}
        </div>
      </div>
    </div>
  );
}

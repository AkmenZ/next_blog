"use client";

import Image from "next/image";

interface ProjectShowcaseProps {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  links: string[];
}

export default function ProjectShowcase(props: ProjectShowcaseProps) {
  const { title, description, image, technologies, links } = props;
  return (
    <div>
      {/* technology logos */}
      <div className="flex flex-wrap justify-end gap-4">
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
      <h3 className="text-2xl font-bold">{title}</h3>
      <div className="flex flex-wrap md:flex-nowrap">
        <div className="w-full md:w-2/3">
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
        </div>
      </div>
      {/* app store links */}
      <div className="flex flex-wrap justify-end gap-4">
        {links.map((link, index) => (
          <Image
            key={index}
            src={link}
            alt="store"
            width={120}
            height={40}
          ></Image>
        ))}
      </div>
    </div>
  );
}

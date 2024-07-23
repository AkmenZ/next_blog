"use client";

import Image from "next/image";

interface ProjectShowcaseProps {
  title: string;
  description: string;
  logo: string;
  image: string;
  technologies: string[];
}

export default function ProjectShowcase(props: ProjectShowcaseProps) {
  const { title, description, logo, image, technologies } = props;
  return (
    <div>
      {/* logo & technologies */}
      <div className="flex justify-between items-end pb-2">
        <Image src={logo} alt="Logo" width={50} height={50}></Image>
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
      </div>

      <h3 className="text-3xl font-bold p-2 mb-4 border-b border-t border-black border-opacity-20">{title}</h3>
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
        </div>
      </div>
    </div>
  );
}

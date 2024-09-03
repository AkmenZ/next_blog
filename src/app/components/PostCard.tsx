"use client";

import { Card, CardHeader, CardBody } from "@nextui-org/react";
import Image from "next/image";
import { Metadata } from "../lib/post-utils";

interface PostCardProps {
  metadata: Metadata;
}

export default function PostCard({ metadata }: PostCardProps) {
  return (
    <Card
      isHoverable
      className="overflow-hidden shadow-md hover:shadow-xl transform hover:scale-105 transition-all duration-300 ease-in-out"
    >
      <CardHeader className="relative">
        <Image
          src={metadata.image}
          alt="image"
          width={200}
          height={0}
          className="rounded-lg"
          style={{ objectFit: "cover", width: "100%", height: "220px" }}
        />
        <p className="text-sm text-white bg-indigo-400 bg-opacity-25 absolute top-5 left-5 py-1 px-2 rounded-lg backdrop-blur-md shadow-small">
          {metadata.tags.join(" / ")}
        </p>
      </CardHeader>
      <CardBody>
        <h3 className="text-2xl font-bold">{metadata.title}</h3>
        <p className="text-gray-600 text-lg my-2 truncate overflow-hidden whitespace-nowrap text-ellipsis">
          {metadata.description}
        </p>
        <p className="text-gray-400 text-sm font-light text-right">
          {metadata.date}
        </p>
      </CardBody>
    </Card>
  );
}

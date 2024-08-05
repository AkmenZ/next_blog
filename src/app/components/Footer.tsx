import { Link } from "@nextui-org/react";
import NextLink from "next/link";

export default function Footer() {
  return (
    <footer className="w-full h-20 flex items-center justify-center text-gray-400 font-light">
      &copy; {new Date().getFullYear()} ak-blog.com. All rights reserved.
    </footer>
  );
}

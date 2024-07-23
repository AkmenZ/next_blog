import { Link } from "@nextui-org/react";
import NextLink from "next/link";

export default function Footer() {
  return (
    <footer className="w-full h-20 flex items-center justify-center">
      <ul className="flex space-x-4">
        <li>
          <Link as={NextLink} href="/" color="secondary">
            Home
          </Link>
        </li>
        <li>
          <Link as={NextLink} href="/contact" color="secondary">
            Contacts
          </Link>
        </li>
      </ul>
    </footer>
  );
}

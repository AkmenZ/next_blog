import Link from "next/link";
import Logo from "./Logo";

export default function Navbar() {
  return (
    <header>
      <nav className="fixed top-0 w-full bg-gray-800 text-white p-4 flex justify-between items-center">
        <Link href="/">
          <Logo></Logo>
        </Link>
        <ul className="flex space-x-4">
          <li className="px-4 py-2 hover:bg-gray-700 rounded">
            <Link href="/posts">All Posts</Link>
          </li>
          <li className="px-4 py-2 hover:bg-gray-700 rounded">
            <Link href="/about">About Me</Link>
          </li>
          <li className="px-4 py-2 hover:bg-gray-700 rounded">
            <Link href="/about">Contact</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

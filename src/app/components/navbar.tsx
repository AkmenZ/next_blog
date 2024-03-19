"use client";

import Link from "next/link";
import Image from "next/image";
import Logo from "./Logo";
import { signOut, useSession } from "next-auth/react";

export default function Navbar() {
  const { status, data: session } = useSession();
  if (status === "authenticated") {
    console.log(session?.user?.image);
  }
  return (
    <header>
      <nav className="fixed top-0 w-full bg-white bg-opacity-50 backdrop-blur-md text-slate-600 p-4 flex justify-between items-center z-50">
        <Link href="/">
          <Logo></Logo>
        </Link>
        <ul className="flex space-x-4">
          <li className="px-4 py-2 hover:text-violet-700">
            <Link href="/posts">All Posts</Link>
          </li>
          <li className="px-4 py-2 hover:text-violet-700">
            <Link href="/about">About Me</Link>
          </li>
          <li className="px-4 py-2 hover:text-violet-700">
            <Link href="/about">Contact</Link>
          </li>

          {session?.user && (
            <>
              <li>
                <button
                  onClick={() => signOut()}
                  className="px-4 py-2 text-white bg-violet-500 hover:bg-violet-700 rounded"
                >
                  Sign Out
                </button>
              </li>
              <li>
                <Image
                  src={session.user.image || "/default-avatar.png"}
                  alt="User Image"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              </li>
            </>
          )}
          {!session && (
            <li>
              <Link href="?login=true">
                <button
                  type="button"
                  className="px-4 py-2 text-white bg-violet-500 hover:bg-violet-700 rounded"
                >
                  Sign In
                </button>
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

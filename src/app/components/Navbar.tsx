"use client";

import Link from "next/link";
import Image from "next/image";
import Logo from "./Logo";
import { Button } from "@nextui-org/react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";

export default function Navbar() {
  const { status, data: session } = useSession();
  const { scrollY } = useScroll();
  const [navHidden, setNavHidden] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();

    if (previous != undefined && latest > previous && latest > 100) {
      setNavHidden(true);
    } else {
      setNavHidden(false);
    }
  });

  return (
    <header>
      <motion.nav
        variants={{
          visible: { y: 0 },
          hidden: { y: "-100%" },
        }}
        animate={navHidden ? "hidden" : "visible"}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="fixed top-0 w-full bg-indigo-900 text-white p-4 flex justify-between items-center z-50"
      >
        <Link href="/">
          <Logo></Logo>
        </Link>
        <ul className="flex space-x-4">
          <li className="px-4 py-2 hover:text-violet-400">
            <Link href="/posts">All Posts</Link>
          </li>
          <li className="px-4 py-2 hover:text-violet-400">
            <Link href="/about">About Me</Link>
          </li>
          <li className="px-4 py-2 hover:text-violet-400">
            <Link href="/contact">Contact</Link>
          </li>

          {session?.user && (
            <>
              <li>
                <Button
                  onClick={() => signOut()}
                  radius="sm"
                  className="px-4 py-2 text-white bg-violet-500 hover:bg-violet-700"
                >
                  Sign Out
                </Button>
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
                <Button
                  radius="sm"
                  className="px-4 py-2 text-white bg-violet-500 hover:bg-violet-700"
                >
                  Sign In
                </Button>
              </Link>
            </li>
          )}
        </ul>
      </motion.nav>
    </header>
  );
}

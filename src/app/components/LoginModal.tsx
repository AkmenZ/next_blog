"use client";

import { useSearchParams, usePathname } from "next/navigation";
import { useSession, signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons/faTimes";

export default function LoginModal() {
  const { status } = useSession();
  const searchParams = useSearchParams();
  const modal = searchParams.get("login");
  const pathname = usePathname();

  return (
    <>
      {modal && (
        <dialog className="fixed left-0 top-0 w-full h-full bg-black bg-opacity-50 z-50 overflow-auto backdrop-blur-sm flex justify-center items-center">
          <div className="relative bg-white m-auto p-8">
            <Link href={pathname}>
              <button
                type="button"
                className="absolute top-0 right-0 text-slate-600 m-2"
              >
                <FontAwesomeIcon
                  icon={faTimes}
                  className="h-6 w-6"
                ></FontAwesomeIcon>
              </button>
            </Link>
            <div className="flex flex-col items-center mt-4">
              <p>Sign in to add comments</p>
              <br />

              <button
                onClick={() => signIn("google")}
                className="flex items-center gap-4 my-2 py-2 px-3 bg-blue-100 hover:bg-blue-300 rounded-md"
              >
                <Image
                  src={"/google-logo.svg"}
                  height={30}
                  width={30}
                  alt="google logo"
                ></Image>
                Sign In With Google
              </button>
            </div>
          </div>
        </dialog>
      )}
    </>
  );
}

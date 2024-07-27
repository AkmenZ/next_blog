"use client";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
  Button,
} from "@nextui-org/react";
import Logo from "./Logo";
import Image from "next/image";
import NextLink from "next/link";
import { signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Nav() {
  const { status, data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const menuItems = [
    { name: "All Posts", path: "/posts" },
    { name: "About Me", path: "/about" },
    { name: "Contacts", path: "/contact" },
  ];

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <Navbar
      shouldHideOnScroll
      maxWidth="xl"
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      className="mb-2"
    >
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle onChange={() => setIsMenuOpen(!isMenuOpen)} />
      </NavbarContent>
      <NavbarContent justify="center">
        <NavbarBrand>
          <Link href="/" as={NextLink}>
            <Logo></Logo>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      {/* collapable elements */}
      <NavbarContent className="hidden sm:flex gap-4 pl-4">
        {menuItems.map((item) => (
          <NavbarItem key={item.path} isActive={pathname === item.path}>
            <Link color="secondary" href={item.path} as={NextLink}>
              {item.name}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>
      <NavbarContent className="hidden sm:flex" justify="end">
        {session?.user && (
          <>
            <NavbarItem>
              <Button
                onClick={() => signOut()}
                radius="sm"
                color="secondary"
                variant="ghost"
              >
                Sign Out
              </Button>
            </NavbarItem>
            <NavbarItem>
              <Image
                src={session.user.image || "/default-avatar.png"}
                alt="User Image"
                width={40}
                height={40}
                className="rounded-full"
              />
            </NavbarItem>
          </>
        )}
        {!session && (
          <NavbarItem>
            <Link href="?login=true" as={NextLink}>
              <Button radius="sm" color="secondary" variant="ghost">
                Sign In
              </Button>
            </Link>
          </NavbarItem>
        )}
      </NavbarContent>
      {/* navbar menu */}
      <NavbarMenu className="flex justify-between pb-5">
        <div>
          {menuItems.map((item, index) => (
            <NavbarMenuItem
              key={`${item}-${index}`}
              isActive={pathname === item.path}
            >
              <Link
                className="w-full py-1"
                size="lg"
                color="secondary"
                href={item.path}
                onClick={handleLinkClick}
                as={NextLink}
              >
                {item.name}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
        {/* login button */}
        <NavbarMenuItem className="flex justify-end pb-28">
          {session?.user && (
            <NavbarItem>
              <Button
                onClick={() => signOut()}
                radius="sm"
                color="secondary"
                variant="ghost"
              >
                Sign Out
              </Button>
            </NavbarItem>
          )}
          {!session && (
            <NavbarItem>
              <Link href="?login=true" as={NextLink}>
                <Button radius="sm" color="secondary" variant="ghost">
                  Sign In
                </Button>
              </Link>
            </NavbarItem>
          )}
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
}

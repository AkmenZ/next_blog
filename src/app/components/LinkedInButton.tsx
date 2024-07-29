import { Button } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";

export default function LinkedInButton() {
  return (
    <Button
      href="https://www.linkedin.com/in/janisakmentins/"
      as={Link}
      isIconOnly
      radius="sm"
      variant="faded"
      style={{
        border: "2px solid #0077B5",
      }}
    >
      <Image
        src="/linkedin-logo.svg"
        alt="LinkedIn Logo"
        width="24"
        height="24"
      />
    </Button>
  );
}

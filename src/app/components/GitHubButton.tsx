import { Button } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";

export default function GitHubButton() {
    return(
        <Button
      href="https://github.com/AkmenZ"
      as={Link}
      isIconOnly
      radius="sm"
      variant="faded"
      style={{
        border: "2px solid black",
      }}
    >
      <Image
        src="/github-logo.svg"
        alt="GitHub Logo"
        width="24"
        height="24"
      />
    </Button>
    );
};

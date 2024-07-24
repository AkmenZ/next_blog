import { Link } from "@nextui-org/react";
import Image from "next/image";

export interface AppStoreLinkProps {
  appStoreLink: string;
  playStoreLink: string;
}

export default function AppStoreLinks(props: AppStoreLinkProps) {
  const { appStoreLink, playStoreLink } = props;

  return (
    <div className="flex justify-center space-x-4">
      <Link href={appStoreLink}>
        <Image
          src="/app-store-badge.svg"
          alt="App Store"
          width={150}
          height={50}
        ></Image>
      </Link>

      <Link href={playStoreLink}>
        <Image
          src="/google-play-badge.svg"
          alt="App Store"
          width={150}
          height={50}
        ></Image>
      </Link>
    </div>
  );
}

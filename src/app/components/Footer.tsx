import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-gray-800 text-white p-4">
      <div className="flex justify-items-center">
        <ul className="flex space-x-4">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/contact">Contact</Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}

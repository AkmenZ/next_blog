import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative w-full h-96 overflow-hidden flex items-center justify-center">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/background.webp"
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          alt="Background"
        />
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
      </div>

      {/* Text content */}
      <div className="px-4 z-10 text-5xl font-extrabold text-white">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-400">
          Welcome to my Blog
        </span>
        <p className="text-lg font-light">
          I write about web and mobile development..<span className="blinking-dot">.</span>
        </p>
      </div>
    </section>
  );
}

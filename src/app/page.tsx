import Hero from "./components/Hero";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center px-12">
      <div className="z-10 w-screen items-center justify-between font-mono text-sm lg:flex">
        <Hero></Hero>
      </div>
      <div className="pt-10">
        <h3 className="text-5xl font-extrabold">Latest posts</h3>
      </div>
    </main>
  );
}

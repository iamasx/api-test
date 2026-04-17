import { ProjectsSection } from "@/components/ProjectsSection";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center bg-zinc-50 font-sans dark:bg-black">
      <main className="w-full max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <ProjectsSection />
      </main>
    </div>
  );
}

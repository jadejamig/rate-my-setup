import SetupList from "@/components/SetupList";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex items-center justify-center bg-white md:rounded-lg shadow-md w-full max-w-3xl dark:bg-dark-200">
      <SetupList />
    </main>
  );
}

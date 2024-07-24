// import Head from "next/head";
// import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import Loading from "./loading";
import AnimateWord from "@/components/AnimateWord";

export default function Home() {
  return (
    <main className="z-10">
      <div className="h-screen flex items-center justify-center">
        <Suspense fallback={<Loading />} />
        <Link href="/heros">
          <AnimateWord text="Hello! Click here to start! Have a nice day!" />
        </Link>
      </div>
    </main>
  );
}

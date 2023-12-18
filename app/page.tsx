import Link from "next/link";
import About from "./about/page";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <Button>Hello</Button>
    </main>
  )
}
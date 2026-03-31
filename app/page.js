import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function Home() {
  return (
  <div>
    <div className="notes-app flex flex-col items-center justify-center py-5">
      <h1 className="text-2xl md:text-3xl font-bold mb-4 text-center">Next.js Learnings</h1>
    </div>

    <div className="notes-app p-5 flex justify-center">
      <Link href="/notes-app">
        <Button variant="outline">Open Notes App</Button>
      </Link>
    </div>


    <div className="contact-form p-5 flex justify-center">
      <Link href="/contact-form">
        <Button variant="outline">Open Contact App</Button>
      </Link>
    </div>

    <div className="contact-form p-5 flex justify-center">
      <Link href="/todo-app">
        <Button variant="outline">Open Todo App</Button>
      </Link>
    </div>
cp
    <div className="contact-form p-5 flex justify-center">
      <Link href="/login">
        <Button variant="outline">Open Authentication + Payment Flow</Button>
      </Link>
    </div>
    <div className="contact-form p-5 flex justify-center">
      <Link href="/ask-gemini">
        <Button variant="outline"> LLM API integrate [ GEMINI ]</Button>
      </Link>
    </div>
  </div>  
  );
}

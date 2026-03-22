import NoteClient from "@/components/NoteClient"
import dbConnection from "@/lib/database";
import Image from "next/image";

export default async function Home() {
  await dbConnection();
  return (<div>
    <p> Notes App</p>
    <NoteClient></NoteClient>
  </div>);
}

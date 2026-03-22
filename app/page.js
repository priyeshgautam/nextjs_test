import dbConnect from "@/lib/db";
import Image from "next/image";

export default async function Home() {
  await dbConnect();
  return (<div>
    <p> Notes app</p>
  </div>);
}

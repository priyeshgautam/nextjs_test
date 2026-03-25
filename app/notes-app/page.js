import NoteClient from "@/components/NoteClient";
import dbConnection from "@/lib/mongodb";
import Note from "@/models/note";

async function getNotes() {
  await dbConnection();
  const notes = await Note.find({}).sort({ createdAt: -1 }).lean();
  return notes.map((note) => ({
    ...note,
    _id: note._id.toString(),
  }));
}

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function NotesAppPage() {
  const notes = await getNotes();

  return (
    <div>

      <div className="mb-4">
        <Link href="/">
          <Button variant="outline" size="sm" className="bg-transparent">
            Back to home
          </Button>
        </Link>
      </div>

      <NoteClient notes={notes} />
      
    </div>
  );
}

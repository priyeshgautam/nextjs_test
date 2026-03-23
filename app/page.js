import NoteClient from "@/components/NoteClient"
import dbConnection from "@/lib/database";
import Note from "@/models/note"

async function getNotes(){
  await dbConnection();
  const notes = await Note.find({}).sort({createdAt: -1}).lean();
  const result = notes.map((note)=>(
    {
      ...note,
      _id: note._id.toString()
    }));
  return result;
}

export default async function Home() {
  const notes = await getNotes();
  return (
  <div>
    <p> Notes App</p>
    <NoteClient notes={notes} />
  </div>)
  
  ;
}

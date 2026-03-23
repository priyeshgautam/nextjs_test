import NoteClient from "@/components/NoteClient"
import dbConnection from "@/lib/database";
import Note from "@/models/note"
import { Separator } from "@/components/ui/separator"
import ContactForm from "@/components/ContactForm";

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

    <div className="notes-app flex flex-col items-center justify-center py-5">
      <h1 className="text-2xl md:text-3xl font-bold mb-4 text-center">Next.js Learnings</h1>
      <NoteClient notes={notes} />    
    </div>


    <div className="contact-form p-5">
      <ContactForm/>
    </div>

  </div>  
  );
}

"use client"
import React, { useState } from 'react'
import toast from 'react-hot-toast';

function NoteClient({ notes: initialNotes = [] }) {
  const [notes, setNotes] = useState(
    () => (Array.isArray(initialNotes) ? initialNotes : [])
  )
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const createNote = async(e) => {
    e.preventDefault();
    if(!title.trim || !content.trim) return;
    setLoading(true);
    setContent("");
    setTitle("");
    try{
      const response = await fetch("/api/notes", {
        method: "POST",
        headers: { "Content-type": "application/json"},
        body: JSON.stringify({title, content})
      })
      const result = await response.json();
      if(result.success){
        setNotes([...notes, result.data])
        setLoading(false);
        toast.success('Notes created successfully')
      }
      

    } catch(error){
      console.log(error)
      toast.error('Something went wrong')
    }
  }
  const deleteNote = async(id)=>{
    try{
      const response = await fetch(`api/notes/${id}`,{
        method: "DELETE"
      })
      const result = await response.json();
      if(result.success){
        
        console.log('id',id);
        console.log('notes',notes);
        setNotes(notes.filter((note)=> note._id !== id));
        toast.success("Notes Deleted successfully")
      }

    } catch(error){
      console.log('Error deleting notes ', error);
      toast.error('Something went wrong')

    }
  }
  return (
    <div className='space-y-6'>
        <form onSubmit = {createNote} className= 'bg-white p-6 rounded-lg shadow-md'>
            <h2 className= 'text-x1 text-gray-800 font-semibold mb-4'> Create  Note</h2>
            <div className='space-y-4'>
                <input 
                  type = "text"  
                  placeholder = "Note Title"  
                  value = {title}  
                  onChange={(e)=> {setTitle(e.target.value)}}
                  className='text-gray-800 w-full p-3 border border-gray rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 '
                  required
                  >
                </input>
                <textarea
                  placeholder = "Note Content"  
                  value = {content}  
                  onChange={(e)=> {setContent(e.target.value)}}
                  className='text-gray-800 w-full p-3 border border-gray rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300'
                  rows={4}
                  >
                </textarea>
                <button
                  type = 'Submit'
                  disabled = {loading}
                  className='bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 disabled:opacity-50'>
                  {loading ? 'Creating button' : 'Create note'}
                </button>
            </div>
        </form>
        
        <div className='space-y-4'>
            <h2>
              Your Notes ({notes.length})
            </h2>
            {notes.length === 0 ? (
              <p>No notes created</p>
            ) : (
              notes.map((note) => (
                <div key={note._id} className="bg-white p-6 rounded-lg shadow-md">
                  <div className='flex justify-between items-start mb-2'>
                  
                  <h3 className="text-lg font-semibold mb-1 text-gray-700">{note.title}</h3>
                  
                  <div className='flex gap-6'>
                    <button className='text-blue-500 hover:text-blue-700 text-sm'>Edit</button>
                    <button onClick = {()=>deleteNote(note._id)} className='text-red-500 hover:text-red-700 text-sm'>Delete</button>
                  </div>
                  </div>
                  
                  <p className="mb-2 text-gray-600">{note.content}</p>
                  
                  <div className="text-xs text-gray-500">
                    <div>Created: {note.createdAt ? new Date(note.createdAt).toLocaleString() : "N/A"}</div>
                    <div>Updated: {note.updatedAt ? new Date(note.updatedAt).toLocaleString() : "N/A"}</div>
                  </div>

                  </div>
              ))
            )}
        </div>
        </div>
  )
}

export default NoteClient
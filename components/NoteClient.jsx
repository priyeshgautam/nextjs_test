"use client"
import React, { useState } from 'react'

function NoteClient() {
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
      console.log(result);
      setLoading(false);

    } catch(error){
      console.log(error)

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
    </div>
  )
}

export default NoteClient
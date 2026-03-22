"use client"
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

function normalizeNotes(value) {
  return Array.isArray(value) ? value : [];
}

function NoteClient({ notes: initialNotes = [] }) {
  const [notes, setNotes] = useState(() => normalizeNotes(initialNotes))

  useEffect(() => {
    setNotes(normalizeNotes(initialNotes));
  }, [initialNotes]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");

  const createNote = async(e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;
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
        setNotes((prev) => [...normalizeNotes(prev), result.data])
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
      const response = await fetch(`/api/notes/${id}`,{
        method: "DELETE"
      })
      const result = await response.json();
      if(result.success){
        
        console.log('id',id);
        console.log('notes',notes);
        setNotes((prev) =>
          normalizeNotes(prev).filter((note) => String(note._id) !== String(id))
        );
        toast.success("Notes Deleted successfully")
      }

    } catch(error){
      console.log('Error deleting notes ', error);
      toast.error('Something went wrong')

    }
  }


  const updateNote = async (id) => {
    if (!editTitle.trim() || !editContent.trim()) return;

    setLoading(true);

    try {
      const response = await fetch(`/api/notes/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: editTitle, content: editContent }),
      });

      const result = await response.json();

      if (result.success) {
        toast.success("Notes updated successfully");
        setNotes((prev) =>
          normalizeNotes(prev).map((note) =>
            String(note._id) === String(id) ? result.data : note
          )
        );
        setEditingId(null);
        setEditTitle("");
        setEditContent("");
      }

      setLoading(false);
    } catch (error) {
      console.error("Error updating note:", error);
      toast.error("Somethin went wrong");
    }
  };

  const startEdit = (note) => {
    setEditingId(note._id);
    setEditTitle(note.title);
    setEditContent(note.content);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditTitle("");
    setEditContent("");
  };

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
                  {editingId === note._id ? 
                  (
                  <>
                      <div className="space-y-4">
                        <input
                          type="text"
                          value={editTitle}
                          onChange={(e) => setEditTitle(e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                          required
                        />
                        <textarea
                          value={editContent}
                          onChange={(e) => setEditContent(e.target.value)}
                          rows={4}
                          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                          required
                        />
    
                        <div className="flex gap-2">
                          <button
                            onClick={() => updateNote(note._id)}
                            disabled={loading}
                            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 disabled:opacity-50"
                          >
                            {loading ? "Saving..." : "Save"}
                          </button>
                          <button
                            onClick={cancelEdit}
                            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      {/* view */}
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-semibold text-gray-800">{note.title}</h3>
                        <div className="flex gap-2">
                          <button
                            onClick={() => startEdit(note)}
                            className="text-blue-500 hover:text-blue-700 text-sm"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => deleteNote(note._id)}
                            className="text-red-500 hover:text-red-700 text-sm"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
    
                      <p className="text-gray-700 mb-2">{note.content}</p>
                      <p className="text-sm text-gray-500">
                        Created: {new Date(note.createdAt).toLocaleDateString()}
                      </p>
                      {note.updatedAt !== note.createdAt && (
                        <p className="text-sm text-gray-500">
                          Updated: {new Date(note.updatedAt).toLocaleDateString()}
                        </p>
                      )}
                    </>
                  )}
                </div>
              ))
            )}
        </div>
        </div>
  )
}

export default NoteClient
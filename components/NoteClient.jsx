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
        <h1 className="text-2xl md:text-3xl font-bold mb-4 text-center text-black-700">📝 Notes App</h1>
        <div className="flex flex-col md:flex-row gap-6">
          {/* Main left side: Part 1 and Part 2 stacked vertically */}
          <div className="flex-1 flex flex-col gap-6">
            {/* Part 1 */}
            <form onSubmit={createNote} className="bg-white p-5 rounded-lg shadow-md">
              <h2 className="text-x1 text-gray-800 font-semibold mb-4">Create Note</h2>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Note Title"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                  className="text-gray-800 w-full p-3 border border-gray rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                  required
                />
                <textarea
                  placeholder="Note Content"
                  value={content}
                  onChange={(e) => {
                    setContent(e.target.value);
                  }}
                  className="text-gray-800 w-full p-3 border border-gray rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                  rows={4}
                />
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full transition-all duration-200 flex items-center justify-center gap-2 
                  bg-gradient-to-r from-black via-gray-800 to-gray-900 
                  text-white font-semibold px-6 py-3 rounded-lg shadow-md
                  hover:from-gray-900 hover:to-black 
                  hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-gray-400 
                  disabled:opacity-60 disabled:cursor-not-allowed`}
                >
                  {loading ? (
                    <>
                      <svg
                        className="animate-spin h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v8z"
                        ></path>
                      </svg>
                      Creating...
                    </>
                  ) : (
                    <>
                      <svg
                        className="h-5 w-5 text-white"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 4v16m8-8H4"
                        />
                      </svg>
                      Create Note
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Part 2 */}
            <div className="space-y-4">
              <h2>Your Notes ({notes.length})</h2>
              {notes.length === 0 ? (
                <p>No notes created</p>
              ) : (
                notes.map((note) => (
                  <div
                    key={note._id}
                    className="bg-white p-6 rounded-lg shadow-md"
                  >
                    {editingId === note._id ? (
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
                          <h3 className="text-lg font-semibold text-gray-800">
                            {note.title}
                          </h3>
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
                          Created:{" "}
                          {new Date(note.createdAt).toLocaleDateString()}
                        </p>
                        {note.updatedAt !== note.createdAt && (
                          <p className="text-sm text-gray-500">
                            Updated:{" "}
                            {new Date(note.updatedAt).toLocaleDateString()}
                          </p>
                        )}
                      </>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Right side: Part 3 */}
          <div className="md:w-96 w-full">
            <div className="p-6 h-full bg-white rounded-lg shadow-md">
              <h2 className="text-xl font-bold mb-2">
                Key Learnings from the Notes App
              </h2>
              <ol className="list-decimal list-inside space-y-1 text-gray-700">
                <li>Understanding and implementing CRUD operations using api routes</li>
                <li>Connecting to and working with MongoDB</li>
                <li>
                  Integrating and using toast notifications for better UX
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
  )
}

export default NoteClient
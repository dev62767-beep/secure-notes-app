import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import AdminPanel from './Admin'
const Notes = () => {
  const [title, setTitle] = useState('')
  const [edit, setedit] = useState(null)
  const [content, setContent] = useState('')
  const api_URL = import.meta.env.VITE_API_URL
  const [notes, setNotes] = useState([])
    useEffect(() => {
      getNotes()
    }, [])
  const user = JSON.parse(
  localStorage.getItem("user")
)
     const navigate = useNavigate()
  const handleNotes = async (e) => {
  e.preventDefault();

  try {
    if (edit) {
      
      await axios.put(
        `${api_URL}/api/v1/notes/${edit}`,
        { title, content },
        { withCredentials: true }
      );
    } else {
      
      await axios.post(
       ` ${api_URL}/api/v1/notes`,
        { title, content },
        { withCredentials: true }
      );
    }

    setTitle('');
    setContent('');
    setedit(null);

    await getNotes();

  } catch (error) {
    console.error(error.response?.data || error.message);
  }
};
    const getNotes = async () => {
      try {
        const response = await axios.get(
          `${api_URL}/api/v1/notes`,
          { withCredentials: true }
        )
        setNotes(response.data.notes)
      } catch (error) {
        console.error('Error fetching notes:', error.response?.data || error.message)
      }
    }

    const deleteNote = async (id) => {
      try {
        await axios.delete(
          `${api_URL}/api/v1/notes/${id}`,
          { withCredentials: true }
        )
        await getNotes()
      } catch (error) {
        console.error('Error deleting note:', error.response?.data || error.message)
      }
    }

    const handleEdit = (note) => {
      setTitle(note.title);
      setContent(note.content);
      setedit(note._id); 
     };

  return (
   <div className='flex flex-col gap-4 items-center justify-center h-[90%] pt-10 w-full'>
      <h1 className='text-4xl font-bold'>Notes</h1>
      {user?.role === "admin" && (
        <AdminPanel />
      )}
      <form
        className='flex flex-col gap-4 w-full md:w-[50%]'
        onSubmit={ handleNotes}
      >
        <input
          type="text"
          placeholder='Title'
          
          className='p-2 rounded-2xl'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea rows={10}
          placeholder='Content'
          
          className='p-2 rounded-2xl outline-black'
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <button
          type='submit'
          className='p-2 bg-blue-500 text-white rounded hover:bg-blue-600' >
          {edit ? "Update Note" : "Add Note"}
        </button>        
      </form>
      <div className="mt-6 w-full flex-col md:w-[50%]">
        {notes.map((note) => (
        <div key={note._id} className="border p-3 rounded mb-2 gap-2">
          <h3 className="font-bold">{note.title}</h3>
          <p>{note.content}</p>   
        <button onClick={() => deleteNote(note._id)}  className="mt-2 bg-red-500 gap-2 text-white px-3 py-1 rounded">Delete Note</button>
        <button onClick={() =>(handleEdit(note))}  className="mt-2 bg-green-500 gap-2 text-white px-3 py-1 rounded">Edit</button>
        </div>
        ))}
       
      </div>
    </div>
  )
}

export default Notes

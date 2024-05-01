import {useState, useEffect} from "react";
import api from "../api.js";
import {Note} from "../components/Note.jsx";
import '../styles/Home.css';


export const Home = () => {
    const [notes, setNotes] = useState([]);
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");

    useEffect(() => {
        getNotes()
    }, []);

    const getNotes =  async () => {
        await api.get('/api/notes/')
            .then((response) => response.data)
            .then((data) => {setNotes(data); console.log(data);})
            .catch((error) => alert(error));
    };

    const deleteNote = async (id) => {
        await api.delete(`/api/notes/delete/${id}/`)
            .then((response) => {
                if (response.status === 204) alert('Note Deleted')
                else alert ('Failed to delete note');
            }).catch((error) => alert(error))
        await getNotes();
    };

    const createNote = async (e) => {
        e.preventDefault();
        await api.post('/api/notes/', {
            content,
            title
        }).then((response) => {
            if (response.status === 201) alert('Note Created')
            else alert('Failed to make note');
        }).catch((error) => alert(error));
        await getNotes();
    }
    return (
        <div>
            <div>
                <h2>Notes</h2>
                {notes.map((note) => (
                    <Note note={note} onDelete={deleteNote} key={note.id}/>
                ))}
            </div>
            <h2>Create a Note</h2>
            <form onSubmit={createNote}>
                <label htmlFor="title">Title:</label>
                <br/>
                <input
                    type="text"
                    id="title"
                    name="title"
                    required
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                />
                <label htmlFor="content">Content:</label>
                <br/>
                <textarea
                    id="content"
                    name="content"
                    required
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                ></textarea>
                <br/>
                <input type="submit" value="Submit"></input>
            </form>
        </div>
    )
}
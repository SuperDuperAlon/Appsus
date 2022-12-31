const { useState, useEffect } = React
const { useNavigate, useParams } = ReactRouterDOM

import { noteService } from "../services/note.service.js"

export function NoteAdd({ onSaveNote }) {


    // let [isOpen, setIsOpen] = useState(false)
    const [inputType, setInputType] = useState('note-txt')
    const [newNote, setNewNote] = useState(noteService.getEmptyNote(inputType))
    const [newTodo, setNewTodo] = useState(noteService.getEmptyTodo())
    const navigate = useNavigate()
    const { noteID } = useParams()


    useEffect(() => {
        setNewNote(noteService.getEmptyNote(inputType))
    }, [inputType])

    useEffect(() => {
        if (!noteID) return
        loadNote()
    }, [])
    
    useEffect(() => {
    }, [])


    function loadNote() {
        noteService.get(noteID)
            .then((note) => {
                setNewNote(note)
                setInputType(note.type)
            })
            .catch((err) => {
                console.log('Had issues in note ef', err)
                navigate('/note')
            })
    }

    function handleChange({ target }) {
        let { value, name: field, type } = target
        newNote.type = inputType
        if (type === 'color') {
            setNewNote((prevNote) => ({ ...prevNote, style: { ...prevNote.style, [field]: value } }))
        }
        // newNote.info[field] = value
        // setNewNote(newNote)
        // const noteToUpdate = newNote

        setNewNote((prevNote) => ({ ...prevNote, info: { ...prevNote.info, [field]: value } }))
    }

    function addTodo(ev) {
        if (ev.key === 'Enter') {
            setNewNote((prevNote) => ({ ...prevNote, info: { ...prevNote.info, todos: [...prevNote.info.todos, newTodo] } }))
            console.log(newNote)
            setNewTodo(noteService.getEmptyTodo())
        }

    }

    function handleTodoChange({ target }) {
        let { value, name: field } = target
        // newTodo.txt = target.value
        // console.log(newTodo)
        setNewTodo((prevTodo) => ({ ...prevTodo, [field]: value }))
        console.log(newTodo)

    }

    function saveNote(ev, newNote){
        ev.preventDefault()
        if(!newNote.info || (!newNote.info.title && !newNote.info.todos) ) return
        if (!newNote.id){
            console.log(newNote.id);
            // const newestNote = noteService.getEmptyNote(inputType)
            setNewNote(noteService.getEmptyNote(inputType))
        }
        onSaveNote(ev, newNote)
    }

    // function createNewNote() {
    //     const newestNote = noteService.getEmptyNote(inputType)
    //     setNewNote((prevNote) => ({ ...prevNote, newestNote }))
    // }

    console.log();

    return <section className={`note-add`} onSubmit={(ev) => saveNote(ev, newNote)}>
        <form>

            {(newNote.type === 'note-img'|| inputType==='note-img' || inputType==='note-video' || newNote.type === 'note-video') && <input type="txt"
                name="url"
                id="url"
                placeholder="Insert url link"
                value={newNote.info.url}
                onChange={handleChange} />}

            <input type="text"
                name="title"
                id="title"
                placeholder="Title"
                value={newNote.info.title}
                onChange={handleChange} />

            {(newNote.type === 'note-txt'||inputType=== 'note-txt') && <textarea
                name="txt"
                id="txt"
                placeholder="Write a note..."
                value={newNote.info.txt}
                onChange={handleChange} />}

            {(newNote.type === 'note-todos' || inputType=== 'note-todos')&& <textarea onKeyDown={addTodo} type="checkbox"
                name="txt"
                id="txt"
                placeholder="Write Todos..."
                value={newTodo.txt}
                onChange={handleTodoChange} />}

            <div className="note-option main">
            {!newNote.id && <div className="note-option">
                <button title="Text" onClick={() => setInputType('note-txt')}><i className="fa-solid fa-a"></i></button>
                <button title="Image url" onClick={() => setInputType('note-img')}><i className="fa-regular fa-image"></i></button>
                <button title="Todos" onClick={() => setInputType('note-todos')}><i className="fa-regular fa-square-check"></i></button>
                <button title="YouTube url" onClick={() => setInputType('note-video')}><i className="fa-brands fa-square-youtube"></i></button>
                </div>}
                <button title={newNote.id ? 'Save' : 'Add'} className="add-button"><i className="fa-solid fa-check"></i></button>
                <div title="Color" className="color-container"><i class="fa-solid fa-palette"></i>
                <input className="color-input" type="color"
                name="backgroundColor"
                value={newNote.style.backgroundColor}
                onChange={handleChange} /></div>
            </div>
        </form>

        {/* {newNote.id ? 'Save' : 'Add'} */}
        {/* {!newNote.id && <div className="note-option">
            <button onClick={() => setInputType('note-txt')}><i className="fa-solid fa-a"></i></button>
            <button onClick={() => setInputType('note-img')}><i className="fa-regular fa-image"></i></button>
            <button onClick={() => setInputType('note-todos')}><i className="fa-regular fa-square-check"></i></button>
            <button onClick={() => setInputType('note-video')}><i className="fa-brands fa-square-youtube"></i></button>
        </div>} */}
    </section>
}




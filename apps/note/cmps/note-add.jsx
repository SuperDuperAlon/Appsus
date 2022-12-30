const { useState, useEffect } = React
const { useNavigate} = ReactRouterDOM

import { noteService } from "../services/note.service.js"

export function NoteAdd({onSaveNote}) {

    
    // let [isOpen, setIsOpen] = useState(false)
    const [inputType, setInputType] = useState('note-txt')
    const [newNote, setNewNote] = useState(noteService.getEmptyNote(inputType))
    const [newTodo, setNewTodo] = useState(noteService.getEmptyTodo())
    const navigate = useNavigate()
        
    useEffect(()=>{
        setNewNote(noteService.getEmptyNote(inputType))
    },[inputType])
    
    // useEffect(() => {
    //     if (!noteID) return
    //     loadCar()
    // }, [])

    // function loadCar() {
    //     noteService.get(noteID)
    //         .then((note) => setNewNote(note))
    //         .catch((err) => {
    //             console.log('Had issues in note ef', err)
    //             navigate('/car')
    //         })
    // }

    function handleChange({ target }) {
        let { value, name: field ,type} = target
        newNote.type = inputType
        if(type=== 'color'){
            setNewNote((prevNote) => ( {...prevNote , style : {...prevNote.style , [field] : value }}))
        }
        // newNote.info[field] = value
        // setNewNote(newNote)
        // const noteToUpdate = newNote
        setNewNote((prevNote) => ( {...prevNote , info : {...prevNote.info , [field] : value }}))
    }

    function addTodo(ev){
        if(ev.key === 'Enter'){
            setNewNote( (prevNote)=> ({...prevNote, info : {...prevNote.info, todos : [...prevNote.info.todos , newTodo]}}))
            console.log(newNote)
            setNewTodo(noteService.getEmptyTodo())
        }

    }

    function handleTodoChange({target}){
        let { value, name: field } = target
        // newTodo.txt = target.value
        // console.log(newTodo)
        setNewTodo((prevTodo)=> ({...prevTodo , [field] : value  }))
        console.log(newTodo)

    }

    function createNewNote(){
        const newestNote = noteService.getEmptyNote(inputType)
        setNewNote((prevNote)=>({...prevNote, newestNote})) 
    }
    


    return <section className="note-add" onSubmit={(ev)=> onSaveNote(ev,newNote, inputType, setNewNote)}>
        <form id="note-form">
             {(inputType === 'note-img'  || inputType==='note-video') && <input type="txt"
             name="url"
             id="url"
             placeholder="Insert url link"
             value={newNote.info.url}
             onChange={handleChange}/>}
             <input type="text"
                name="title"
                id="title"
                placeholder="Title"
                value={newNote.info.title}
                onChange={handleChange} />
            <label htmlFor="txt"></label>
            {inputType === 'note-txt' && <textarea
                name="txt"
                id="txt"
                placeholder="Write a note..."
                value={newNote.info.txt}
                onChange={handleChange} />}
            {inputType === 'note-todos' && <textarea onKeyDown={addTodo} type="checkbox"
                name="txt"
                id="txt"
                placeholder="Write Todos..."
                value={newTodo.txt}
                onChange={handleTodoChange} />}
            <input type="color" 
                name="backgroundColor"
                value={newNote.style.backgroundColor} 
                onChange={handleChange}   />
            <button className="add-button">Add</button>
        </form>


        <div className="note-option">
            <button onClick={() => setInputType('note-txt')}>Text</button>
            <button onClick={() => setInputType('note-img')}>Photo</button>
            <button onClick={() => setInputType('note-todos')}>Todo</button>
            <button onClick={() => setInputType('note-video')}>Video</button>
        </div>
    </section>
}




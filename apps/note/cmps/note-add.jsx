const { useState, useEffect } = React
const { useNavigate} = ReactRouterDOM

import { noteService } from "../services/note.service.js"

export function NoteAdd({onSaveNote}) {

    const [newNote, setNewNote] = useState(noteService.getEmptyNote())
    // let [isOpen, setIsOpen] = useState(false)
    let [img, setImg] = useState('')
    let [inputType, setInputType] = useState('note-txt')
    let [newTodo, setNewTodo] = useState(noteService.getEmptyTodo(inputType))
    let [todos, setTodos] = useState([])
    const navigate = useNavigate()



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
        // console.log(ev.key);  
        if(ev.key === 'Enter'){
            // setTodos(todos.push(newTodo))
            setNewNote( newNote.info.todos.push(newTodo))
            console.log(newNote)
            // setNewTodo(newTodo=noteService.getEmptyTodo(inputType))
            // console.log(newTodo)
            // console.log(newTodo);
            // console.log(newNote); 
            // newNote.info.todos.push(newTodo)
            // setNewNote(newNote)
            // console.log(newNote)
            //  newTodo = noteService.getEmptyTodo()
        }
        // ev.target.addEventListener('keypress', ()=>{console.log(ev)})
        // console.log(target.value)
        // ev.addEventListener('keypress', ()=>console.log('enter'))
        // let { value, name: field } = target
    }

    function handleTodoChange({target}){
        let { value, name: field } = target
        // newTodo.txt = target.value
        // console.log(newTodo)
        setNewTodo((prevTodo)=> ({...prevTodo , [field] : value  }))
        console.log(newTodo)

    }
    
    // function onSaveNoate(ev) {
    //     ev.preventDefault()
    //     noteService.save(newNote).then((note) => {
    //         console.log('Note saved', note)
    //         navigate('/note') 
    //     })
    // }

    // function onImgInput(ev) {
    //     noteService.loadImageFromInput(ev, renderImg)
    // }

    // function renderImg(image) {
    //     img = image
    //     console.log(img);
    //     setImg(img)
    // }

    return <section className="note-add" onSubmit={()=>onSaveNote(event,newNote)}>
        <form>
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
            {inputType === 'note-todos' && <button onClick={addTodo}>+</button>}
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




function DynamicCmp(props) {
    console.log(props.cmpType)
    switch (props.cmpType) {
        case 'note-txt':
            return <NoteTxt {...props} />
        case 'note-img':
            return <NoteImg {...props} />
        case 'note-todos':
            return <NoteToDos {...props} />
        case 'note-video':
            return <NoteVideo {...props} />
    }
}

function NoteTxt({ info }) {
    return <form>
        <input type="text"
            name="title"
            id="title"
            placeholder="Title" />
        <label htmlFor="txt"></label>
        <input type="text"
            name="txt"
            id="txt"
            placeholder="Write a note..." />
        {/* // value={newNote.info.txt}
            onChange={handleChange}  */}
    </form>
}
function NoteImg(props) {
    return (
        <form onChange={onImgInput}>
            <input type="file" id="myFile" name="filename" />
        </form>)
}
function NoteToDos(props) {
    return <form>
        <input type="text"
            name="title"
            id="title"
            placeholder="Title" />
        {/* value={newNote.info.label}
        onChange={handleChange} */}
        <label htmlFor="txt"></label>
        <input type="text"
            name="txt"
            id="txt"
            placeholder="Write a note..." />
        {/* // value={newNote.info.todos}
        onChange={handleChange}  */}
    </form>
}
function NoteVideo({ info }) {
    return <form>
        <input type="text"
            name="txt"
            id="txt"
            placeholder="Insert YouTube link" />
        {/* // value={newNote.info.url}
        onChange={handleChange}  */}
    </form>
}


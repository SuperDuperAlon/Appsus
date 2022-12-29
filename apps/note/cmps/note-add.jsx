const { useState, useEffect } = React
const { useNavigate} = ReactRouterDOM

import { noteService } from "../services/note.service.js"

export function NoteAdd({onSaveNote}) {

    const [newNote, setNewNote] = useState(noteService.getEmptyNote())
    // let [isOpen, setIsOpen] = useState(false)
    let [img, setImg] = useState('')
    let [inputType, setInputType] = useState('note-txt')
    const navigate = useNavigate()



    function handleChange({ target }) {
        let { value, name: field } = target
        newNote.type = inputType
        // newNote.info[field] = value
        // setNewNote(newNote)
        // const noteToUpdate = newNote
        setNewNote((prevNote) => ( {...prevNote , info : {...prevNote.info , [field] : value }}))
    }

    function handelTodos(ev){
        ev.target.addEventListener('keypress', ()=>{console.log(ev)})
        // console.log(target.value)
        // ev.addEventListener('keypress', ()=>console.log('enter'))
        // let { value, name: field } = target


    }
    
    // function onSaveNoate(ev) {
    //     ev.preventDefault()
    //     noteService.save(newNote).then((note) => {
    //         console.log('Note saved', note)
    //         navigate('/note') 
    //     })
    // }

    function onImgInput(ev) {
        noteService.loadImageFromInput(ev, renderImg)
    }

    function renderImg(image) {
        img = image
        console.log(img);
        setImg(img)
    }

    return <section className="note-add" onSubmit={()=>onSaveNote(event,newNote)}>
        <form>
             {inputType === 'note-img'  || inputType==='note-video' && <input type="txt"
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
            {inputType === 'note-txt' && <input type="text"
                name="txt"
                id="txt"
                placeholder="Write a note..."
                value={newNote.info.txt}
                onChange={handleChange} />}
            {inputType === 'note-todos' && <textarea type="checkbox"
                name="txt"
                id="txt"
                placeholder="Write Todos..."
                value={newNote.info.todos}
                onChange={handelTodos} />}
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


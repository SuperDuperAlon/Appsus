const { useState, useEffect } = React

import {noteService} from "../services/note.service.js"

export function NoteAdd() {

    const [newNote, setNewNote] = useState(noteService.getEmptyNote())
    let [isOpen, setIsOpen] = useState(false)


    function handleChange({target}){
        console.log(target.value)
    }

    return <section className="note-add" >
        <form>
            {isOpen && <input type="text"
             name="title"
             id= "title"
             placeholder= "Title"
             value={newNote.info.title}
             onChange={ handleChange}/>}
            <label htmlFor="txt"></label>
            <input type="text"
             name="txt"
             id= "txt"
             placeholder= "Write a note..."
             value={newNote.info.txt}
             onChange={ handleChange}
             onClick={()=> setIsOpen(!isOpen)}/>

        </form>

    </section>
}
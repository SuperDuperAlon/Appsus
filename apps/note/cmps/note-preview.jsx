
const { useParams,useNavigate} = ReactRouterDOM
const { useState, useEffect } = React

import { noteService } from "../services/note.service.js"
import {DynamicCmp} from "../cmps/dynamic-cmp.jsx"
import {NotePinned} from "../cmps/note-pinned.jsx"
import { NoteAdd } from "./note-add.jsx"



export function NotePreview(){

    const { noteID } = useParams()
    const [clickedNote, setClickedNote] = useState(null)
    const [isEdit, setIsEdit] = useState(false)
    const [isPinned, setIsPinned] = useState(false)
    const navigate = useNavigate()
    
    useEffect(()=>{
        loadNote()
    },[noteID])


    function loadNote(){
        noteService.get(noteID)
        .then(clickedNote=>{ setClickedNote(clickedNote)
            // console.log(clickedNote);
        })
        .catch((err) => {
            console.log('Had issues in note preview', err)
            // showErrorMsg('Cannot load note')
            navigate('/note')
        })
    }

    function onClosePreview(){
        setIsEdit(false)
        navigate('/note')
      }

    function onRemovePreviewedNote(ev, noteId){
        ev.stopPropagation()
        noteService.remove(noteId).then(()=>{
            navigate('/note')

        // const updatedNotes = notes.filter(note => note.id !== noteId)
        // setNotes(updatedNotes)
        })
    }

    function setPinned(){
       
        
    }

    if (!clickedNote) return <div>Loading...</div>
    return <section className="note-preview" style={{backgroundColor:clickedNote.style.backgroundColor}}>
    {/* <h1>{clickedNote.info.title}</h1> */}
    {!isEdit && <DynamicCmp props={clickedNote} />}
    {isEdit && <NoteAdd/>}
    <div className="edit-bar">
    <button onClick={(ev)=> onRemovePreviewedNote(ev, clickedNote.id)}><i class="fa-solid fa-trash"></i></button>
    <button onClick={()=>setIsEdit(true)}><i class="fa-solid fa-pen-to-square"></i></button>
    <button><i class="fa-solid fa-envelope"></i></button>
    <button><i class="fa-solid fa-palette"></i></button>
    <button onClick={setPinned}><i class="fa-sharp fa-solid fa-thumbtack"></i></button>
    <button onClick={onClosePreview}>Close</button>
    </div>
    </section>

}
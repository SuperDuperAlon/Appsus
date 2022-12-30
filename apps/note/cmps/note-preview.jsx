
const { useParams,useNavigate} = ReactRouterDOM
const { useState, useEffect } = React

import { noteService } from "../services/note.service.js"
import {DynamicCmp} from "../cmps/dynamic-cmp.jsx"



export function NotePreview(){
    const { noteID } = useParams()
    const [clickedNote, setClickedNote] = useState(null)
    const navigate = useNavigate()
    
    useEffect(()=>{
        loadNote()
    },[noteID])

    function loadNote(){
        noteService.get(noteID)
        .then(clickedNote=>{ setClickedNote(clickedNote)
            console.log(clickedNote);
        })
        .catch((err) => {
            console.log('Had issues in note preview', err)
            showErrorMsg('Cannot load note')
            navigate('/note')
        })
    }

    function onClosePreview(){
        navigate('/note')
      }

    if (!clickedNote) return <div>Loading...</div>
    return <section className="note-preview" style={{backgroundColor:clickedNote.style.backgroundColor}}>
    {/* <h1>{clickedNote.info.title}</h1> */}
    <DynamicCmp props={clickedNote} />
    <button onClick={onClosePreview}>Close</button>
    <div className="edit-bar">
        

    </div>
    </section>

}
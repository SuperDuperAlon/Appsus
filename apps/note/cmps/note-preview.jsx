
const { useParams, useNavigate, useOutletContext } = ReactRouterDOM
const { useState, useEffect } = React

import { noteService } from "../services/note.service.js"
import { DynamicCmp } from "../cmps/dynamic-cmp.jsx"
import { NotePinned } from "../cmps/note-pinned.jsx"
import { NoteAdd } from "./note-add.jsx"



export function NotePreview() {

    const { noteID } = useParams()
    const [clickedNote, setClickedNote] = useState(null)
    const [isEdit, setIsEdit] = useState(false)
    const [isPinned, setIsPinned] = useState(false)
    const navigate = useNavigate()
    const [onSaveNote, onPinnedNote, onClosePreview, onRemoveNote] = useOutletContext()


    console.log(onSaveNote);
    console.log(onPinnedNote);

    useEffect(() => {
        loadNote()
    }, [noteID])


    function loadNote() {
        noteService.get(noteID)
            .then(clickedNote => {
                setClickedNote(clickedNote)
                // console.log(clickedNote);
            })
            .catch((err) => {
                console.log('Had issues in note preview', err)
                // showErrorMsg('Cannot load note')
                navigate('/note')
            })
    }

    // function onClosePreview() {
    //     setIsEdit(false)
    //     navigate('/note')
    // }


    function onRemovePreviewedNote(ev, noteId) {
        ev.stopPropagation()
        // noteService.remove(noteId).then(() => {
        onRemoveNote(ev,noteId)
        navigate('/note')

            // const updatedNotes = notes.filter(note => note.id !== noteId)
            // setNotes(updatedNotes)
        // })
    }

    function setPinned() {


    }

    if (!clickedNote) return <div>Loading...</div>
    return <section className="background">
        {/* <h1>{clickedNote.info.title}</h1> */}
        <div className="note-preview" style={{ backgroundColor: clickedNote.style.backgroundColor }}>
            {!isEdit && <DynamicCmp props={clickedNote} />}
            {isEdit && <NoteAdd onSaveNote={onSaveNote} />}
            <div className="edit-bar">
                <button onClick={(ev) => onRemovePreviewedNote(ev, clickedNote.id)}><i class="fa-solid fa-trash"></i></button>
                <button onClick={() => setIsEdit(true)}><i class="fa-solid fa-pen-to-square"></i></button>
                <button><i class="fa-solid fa-envelope"></i></button>
                <div className="color-container"><i class="fa-solid fa-palette"></i><input type="color" className="color-input"/></div>
                <button onClick={(ev) => onPinnedNote(ev, noteID)}><i className= {(clickedNote.isPinned) ? `fa-sharp fa-solid fa-thumbtack yellow` : `fa-sharp fa-solid fa-thumbtack`} ></i></button>
                <button onClick={onClosePreview}>Close</button>
            </div>
        </div>
    </section>

}
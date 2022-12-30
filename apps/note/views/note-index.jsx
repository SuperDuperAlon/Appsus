
const { useState, useEffect } = React
const { useNavigate, Link, Outlet} = ReactRouterDOM

import { NoteAdd } from "../cmps/note-add.jsx";
import { NoteFilter } from "../cmps/note-filter.jsx";
import { NoteList } from "../cmps/note-list.jsx";
import { NotePreview } from "../cmps/note-preview.jsx"
import {noteService} from "../services/note.service.js"


export function NoteIndex() {

  const navigate = useNavigate()
  const [notes, setNotes] = useState([])
  const [selectedNote, setSelectedNote] = useState(null)
  const [filterBy, setFilterBy] = useState(noteService.getDefaultFilter())
  
  useEffect(()=>{
    loadNotes()
  },[filterBy])

  
  function loadNotes(){
    noteService.query(filterBy)
    .then((notes)=> setNotes(notes))
  }
  
  function onSaveNote(ev, newNote, inputType ,setNewNote) {
    ev.preventDefault()
    noteService.save(newNote).then((note) => {
        console.log('Note saved', note)
        setNotes(notes)
        setNewNote(noteService.getEmptyNote(inputType))
        loadNotes()
    })
}

  function onRemoveNote(ev, noteId){
    ev.stopPropagation()
    noteService.remove(noteId).then(()=>{
      const updatedNotes = notes.filter(note => note.id !== noteId)
      setNotes(updatedNotes)
    })

  }
  function onSetFilter(filterBy) {
    setFilterBy(filterBy)
}

  function onOpenPreview(note){
    setSelectedNote(note)
    navigate(`/note/${note.id}`)
  }

  function onClosePreview(){
    navigate('/note')
  }

  return (
    <div>
      <NoteFilter onSetFilter={onSetFilter}/>
      <NoteAdd onSaveNote={onSaveNote}/>
      <NoteList notes={notes} onRemoveNote={onRemoveNote} onOpenPreview={onOpenPreview}/>
      {/* {selectedNote && <Link to=`/car/{selectedNote}`></Link>} */}
      <Outlet/>
    </div>
  )
}




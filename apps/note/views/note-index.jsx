
const { useState, useEffect } = React
const { useNavigate} = ReactRouterDOM

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
  
  function onSaveNote(ev, newNote) {
    ev.preventDefault()
    noteService.save(newNote).then((note) => {
        console.log('Note saved', note)
        setNotes(notes)
        loadNotes()
    })
}

  function onRemoveNote(noteId){
    // ev.preventDefault()
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
    return 
  }

  return (
    <div>
      <NoteFilter onSetFilter={onSetFilter}/>
      <NoteAdd onSaveNote={onSaveNote}/>
      <NoteList notes={notes} onRemoveNote={onRemoveNote} onOpenPreview={onOpenPreview}/>
      {selectedNote && <NotePreview note={selectedNote}/>}

      <div>note app</div>
    </div>
  )
}




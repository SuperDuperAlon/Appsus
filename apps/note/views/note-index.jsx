
const { useState, useEffect } = React
const { useNavigate} = ReactRouterDOM

import { NoteAdd } from "../cmps/note-add.jsx";
import { NoteFilter } from "../cmps/note-filter.jsx";
import { NoteList } from "../cmps/note-list.jsx";
import {noteService} from "../services/note.service.js"


export function NoteIndex() {

  const navigate = useNavigate()
  let [notes, setNotes] = useState([])
  
  useEffect(()=>{
    loadNotes()
  },[])

  
  function loadNotes(){
    noteService.query()
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

  return (
    <div>
      {/* <NoteFilter /> */}
      <NoteAdd onSaveNote={onSaveNote}/>
      <NoteList notes={notes} onRemoveNote={onRemoveNote}/>

      <div>note app</div>
    </div>
  )
}





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
  const [isPreview, setIsPreview] = useState(false)
  const [selectedNote, setSelectedNote] = useState(null)
  const [filterBy, setFilterBy] = useState(noteService.getDefaultFilter())
  const [pinnedNote, setPinnedNote] = useState(null)

  
  useEffect(()=>{
    loadNotes()
  },[filterBy])
  

  
  function loadNotes(){
    noteService.query(filterBy)
    .then((notes)=> setNotes(notes))
  }
  
  function onSaveNote(ev, newNote) {
    setIsPreview(false)
    ev.preventDefault()
    // console.log('hi');
    noteService.save(newNote).then((note) => {
        // console.log('Note saved', note)
        setNotes(notes)
        // console.log(notes);
        // console.log(inputType)
        // setNewNote(noteService.getEmptyNote(inputType))
        loadNotes()
    })
}

  function onRemoveNote(ev, noteId){
    setIsPreview(false)
    ev.stopPropagation()
    noteService.remove(noteId).then(()=>{
      const updatedNotes = notes.filter(note => note.id !== noteId)
      setNotes(updatedNotes)
      loadNotes()
    })
    
  }
  function onSetFilter(filterBy) {
    setFilterBy(filterBy)
  }
  
  function onOpenPreview(note){
    setIsPreview(true)
    // setSelectedNote(note)
    navigate(`/note/${note.id}`)
  }
  
  function onPinnedNote(ev, noteId){
    ev.preventDefault()
    ev.stopPropagation()
    // console.log(noteId)
    noteService.get(noteId)
    .then(note=> {
      (note.isPinned ? note.isPinned = false : note.isPinned = true)
      setPinnedNote(note)
      noteService.save(note)
    .then(note=> {
        setNotes(notes)
        loadNotes()
      })
    })
  
  }

  function onClosePreview(){
    setIsPreview(false)
    navigate('/note')
  }

  function openEdit(note){

  }

  return (
    <div>
      <NoteFilter onSetFilter={onSetFilter}/>
      <NoteAdd onSaveNote={onSaveNote}/>
      <NoteList notes={notes} onRemoveNote={onRemoveNote} onOpenPreview={onOpenPreview} onPinnedNote={onPinnedNote} openEdit={openEdit}/>
      {/* {selectedNote && <Link to=`/car/{selectedNote}`></Link>} */}
      <Outlet context={[onSaveNote, onPinnedNote, onClosePreview, onRemoveNote]} />
      {/* <Outlet context={[onPinnedNote]} /> */}
    </div>
  )
}






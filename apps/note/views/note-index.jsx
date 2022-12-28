
const { useState, useEffect } = React

import { NoteAdd } from "../cmps/note-add.jsx";
import { NoteFilter } from "../cmps/note-filter.jsx";
import { NoteList } from "../cmps/note-list.jsx";
import {noteService} from "../services/note.service.js"


export function NoteIndex() {

  let [notes, setNotes] = useState([])
  
  useEffect(()=>{
    loadNotes()
  },[])


  function loadNotes(){
    noteService.query()
    .then((notes)=> setNotes(notes))
  }


  return (
    <div>
      {/* <NoteFilter /> */}
      <NoteAdd/>
      <NoteList notes={notes}/>

      <div>note app</div>
    </div>
  )
}




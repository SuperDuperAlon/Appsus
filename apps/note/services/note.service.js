
import {utilService} from "../../../services/util.service.js"

export const noteService = {
    getNotes

}

const NOTE_KEY = "noteDB"
// _createNotes()

function getNotes(){
    return _createNotes()
}


function _createNotes(){    
    let notes = utilService.loadFromStorage(NOTE_KEY)
    if (!notes || !notes.length){
        notes = [
        {
         id: utilService.makeId(),
         type: "note-txt",
         isPinned: true,
         info: {
         txt: "Fullstack Me Baby!"
         }
        },
        {
         id: utilService.makeId(),
         type: "note-img",
         info: {
         url: "/assets/img/puppy.jpg",
         title: "Feed the dog"
         },
         style: {
         backgroundColor: "#00d"
         }
        },
        {
         id: utilService.makeId(),
         type: "note-todos",
         info: {
         label: "Get my stuff together",
         todos: [
         { txt: "Driving liscence", doneAt: null },
         { txt: "Coding power", doneAt: 187111111 }
         ]
         }
        }
        ]
        utilService.saveToStorage(NOTE_KEY, notes)
    }
    return notes
        
}
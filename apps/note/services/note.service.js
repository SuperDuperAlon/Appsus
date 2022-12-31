
import { utilService } from "../../../services/util.service.js"
import { asyncStorageService } from "../../../services/async-storage.service.js"

export const noteService = {
    getEmptyNote,
    query,
    loadImageFromInput,
    save,
    remove,
    getEmptyTodo,
    getDefaultFilter,
    get
}

const NOTE_KEY = "noteDB"
_createNotes()



// CallBack func will run on success load of the img
function loadImageFromInput(ev, onImageReady) {
    const reader = new FileReader()
    // After we read the file
    reader.onload = (event) => {
        let img = new Image() // Create a new html img element
        img.src = event.target.result // Set the img src to the img file we read
        // Run the callBack func, To render the img on the canvas
        img.onload = () => onImageReady(img)
    }

    reader.readAsDataURL(ev.target.files[0]) // Read the file we picked

}

function get(noteId){
    return asyncStorageService.get(NOTE_KEY, noteId)
}

// function createPinned(noteId){
//     return asyncStorageService.unshift(NOTE_KEY, noteId)
// }

function query(filterBy) {
    return asyncStorageService.query(NOTE_KEY)
        .then(notes => {
            if (filterBy.txt) {
                const regex = new RegExp(filterBy.txt, 'i')
                notes = notes.filter(note =>regex.test(note.info.txt) || regex.test(note.info.title) )
            }

            // if (filterBy.minPrice) {
            //     books = books.filter(book => book.listPrice.amount >= filterBy.minPrice)
            // }
            return notes
        })
}

function getEmptyNote(inputType){
    if (inputType==='note-todos'){
        return {id: '' , type:'', isPinned: false, info: {title:'',todos:[]}, style: {backgroundColor: "#ffffff"}}
    }
    return {id: '' , type:'', isPinned: false, info: {}, style: {backgroundColor: "#ffffff"}}
}

function getEmptyTodo(){
    return {txt: '', doneAt:''}
}

function save(note) {
    if (note.id) {
        return asyncStorageService.put(NOTE_KEY, note)
    } else {
        return asyncStorageService.post(NOTE_KEY, note)
    }
}

function remove(noteId) {
    return asyncStorageService.remove(NOTE_KEY, noteId)
}

function getDefaultFilter(){
    return {txt : ''}
}

function _createNotes() {
    let notes = utilService.loadFromStorage(NOTE_KEY)
    if (!notes || !notes.length) {
        notes = [
            {
                id: utilService.makeId(),
                type: "note-txt",
                isPinned: true,
                info: {
                    txt: "Fullstack Me Baby!"
                },
                style: {
                    backgroundColor: "white"
                }
            },
            {
                id: utilService.makeId(),
                type: "note-img",
                isPinned: false,
                info: {
                    url: "./assets/img/puppy.jpg",
                    title: "Take the dog out"
                },
                style: {
                    backgroundColor: "var(--note1)"
                }
            },
            {
                id: utilService.makeId(),
                type: "note-todos",
                isPinned: false,
                info: {
                    title: "This week assignments:",
                    todos: [
                        { txt: "Practice Css", doneAt: null },
                        { txt: " Practice React", doneAt: 187111111 },
                        { txt: "Eat", doneAt: 187111111 },
                        { txt: "Sleep", doneAt: 187111150 },
                        { txt: "Repeat", doneAt: 187111180 }
                    ]
                },
                style: {
                    backgroundColor: "var(--note2)"
                }
            },
            {
                id: utilService.makeId(),
                type: "note-video",
                isPinned: false,
                info: {
                    url: "https://www.youtube.com/embed/GTCd0hmjHBs",
                },
                style: {
                    backgroundColor: "var(--note3)"
                }
            },
            {
                id: utilService.makeId(),
                type: "note-txt",
                isPinned: true,
                info: {
                    title: "Save the date!!",
                    txt: "23.2.22 - Fullstack developer officially !"
                },
                style: {
                    backgroundColor: "var(--note4)"
                }
            },
            {
                id: utilService.makeId(),
                type: "note-video",
                isPinned: false,
                info: {
                    url: "https://www.youtube.com/embed/tEmt1Znux58",
                    title: "Sprints be like"
                },
                style: {
                    backgroundColor: "var(--note1)"
                }
            },
            {
                id: utilService.makeId(),
                type: "note-img",
                isPinned: false,
                info: {
                    url: "https://www.hollywoodreporter.com/wp-content/uploads/2014/12/dory_a_l.jpg?w=3000",
                    title: "Me tying to remember everything we have learned during the sprint"
                },
                style: {
                    backgroundColor: "var(--note-default)"
                }
            },
            {
                id: utilService.makeId(),
                type: "note-todos",
                isPinned: false,
                info: {
                    title: "Mommy's chocolate cake",
                    todos: [
                        { txt: "225g/8oz plain flour", doneAt: null },
                        { txt: " 350g/12½oz caster sugar", doneAt: 187111111 },
                        { txt: "85g/3oz cocoa powder", doneAt: 187111111 },
                        { txt: "1½ tsp baking powder", doneAt: 187111150 },
                        { txt: "2 eggs", doneAt: 187111180 },
                        { txt: "250ml/9fl oz milk", doneAt: 187111180 }
                    ]
                },
                style: {
                    backgroundColor: "var(--note4)"
                }
            },
            {
                id: utilService.makeId(),
                type: "note-img",
                isPinned: false,
                info: {
                    url: "https://travellersworldwide.com/wp-content/uploads/2022/07/Shutterstock_1927911998.jpg.webp",
                    title: "Next destinaion"
                },
                style: {
                    backgroundColor: "var( --note-default)"
                }
            },
            {
                id: utilService.makeId(),
                type: "note-txt",
                isPinned: false,
                info: {
                    title: "Next year goals:",
                    txt : "get rich"
                },
                style: {
                    backgroundColor: "var( --note3)"
                }
            },
            {
                id: utilService.makeId(),
                type: "note-txt",
                isPinned: false,
                info: {
                    title: "Bank pin code:",
                    txt : "****"
                },
                style: {
                    backgroundColor: "var( --note3)"
                }
            },
            {
                id: utilService.makeId(),
                type: "note-txt",
                isPinned: false,
                info: {
                    title: "Bank pin code:",
                    txt : "****"
                },
                style: {
                    backgroundColor: "var( --note2)"
                }
            }
            
            
        ]
        utilService.saveToStorage(NOTE_KEY, notes)
    }
    return notes

}
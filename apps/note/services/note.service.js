
import { utilService } from "../../../services/util.service.js"
import { asyncStorageService } from "../../../services/async-storage.service.js"

export const noteService = {
    getEmptyNote,
    query,
    loadImageFromInput,
    save,
    remove
}

const NOTE_KEY = "noteDB"
_createNotes()


// function onImgInput(ev) {
//     const img = loadImageFromInput(ev, renderImg)
//     console.log(img);
//     return img
// }

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

// function renderImg(img) {
//     // Draw the img on the canvas
//     // gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
//     // console.log(img);
//     return img
// }

function query() {
    return asyncStorageService.query(NOTE_KEY)
        .then(notes => {
            // if (filterBy.txt) {
            //     const regex = new RegExp(filterBy.txt, 'i')
            //     books = books.filter(book => regex.test(book.title))
            // }
            // if (filterBy.minPrice) {
            //     books = books.filter(book => book.listPrice.amount >= filterBy.minPrice)
            // }
            return notes
        })
}

function getEmptyNote(){
    return {id: '' , type:'', isPinned: false, info: {}, style: {backgroundColor: "white"}, }
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
                    url: "/assets/img/puppy.jpg",
                    title: "Feed the dog"
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
                    title: "Get my stuff together",
                    todos: [
                        { txt: "Driving liscence", doneAt: null },
                        { txt: "Coding power", doneAt: 187111111 }
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

            }
        ]
        utilService.saveToStorage(NOTE_KEY, notes)
    }
    return notes

}
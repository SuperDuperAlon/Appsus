
import { utilService } from "../../../services/util.service.js"

export const noteService = {
    getNotes

}

const NOTE_KEY = "noteDB"
// _createNotes()

function getNotes() {
    return _createNotes()
}


function query() {
    return storageService.query(BOOK_KEY)
        .then(books => {
            if (filterBy.txt) {
                const regex = new RegExp(filterBy.txt, 'i')
                books = books.filter(book => regex.test(book.title))
            }
            if (filterBy.minPrice) {
                books = books.filter(book => book.listPrice.amount >= filterBy.minPrice)
            }
            return books
        })
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
            },
            {
                id: utilService.makeId(),
                type: "note-video",
                info: {
                    url: "https://www.youtube.com/watch?v=GTCd0hmjHBs&t=1s",
                }
            }
        ]
        utilService.saveToStorage(NOTE_KEY, notes)
    }
    return notes

}


import {NoteTxt} from "../cmps/note-txt.jsx"
import {NoteImg} from "../cmps/note-img.jsx"
import {NoteToDos} from "../cmps/note-todos.jsx"
import {NoteVideo} from "../cmps/note-video.jsx"

export function DynamicCmp(props) {
    switch (props.props.type) {
        case 'note-txt':
            return <NoteTxt {...props.props} />
        case 'note-img':
            return <NoteImg {...props.props} />
        case 'note-todos':
            return <NoteToDos {...props.props} />
        case 'note-video':
            return <NoteVideo {...props.props} />
    }
}
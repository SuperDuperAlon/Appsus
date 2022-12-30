
import {DynamicCmp} from "../cmps/dynamic-cmp.jsx"

export function NoteList({ notes , onRemoveNote , onOpenPreview}) {

    return <div className="note-list-container">
        <ul className="note-list">
            {notes.map(note =>
                <li onClick={()=>onOpenPreview(note)} key={note.id} className="note" style={{backgroundColor:note.style.backgroundColor}}><DynamicCmp props={note} />
                <div className="note-operators"><button>Color</button><button onClick={(ev)=>onRemoveNote(ev, note.id)}>Delete</button></div></li>)}
        </ul>
    </div>

}


// function DynamicCmp(props) {
//     switch (props.props.type) {
//         case 'note-txt':
//             return <NoteTxt {...props.props} />
//         case 'note-img':
//             return <NoteImg {...props.props} />
//         case 'note-todos':
//             return <NoteToDos {...props.props} />
//         case 'note-video':
//             return <NoteVideo {...props.props} />
//     }
// }

// function NoteTxt({ info }) {
//     return <div>
//         {info.title && <h1>{info.title}</h1> }
//         <p>{info.txt}</p>
//         </div>
// }
// function NoteImg(props) {
//     return (<div>
//         <h1>{props.info.title}</h1>
//         <img src={props.info.url} />
//     </div>)
// }
// function NoteToDos(props) {
//     return <div>
//         <ul>
//             <h1>{props.info.title}</h1>
//             {props.info.todos.map((todo,idx) => <li key={idx} className="chack-mark"><input type="checkbox"/> <label>{todo.txt}</label></li>)}
//         </ul>
//     </div>
// }
// function NoteVideo({info}) {
//     return <div>
//         {info.title && <h1>{info.title}</h1> }
//         <div className="video-container"><iframe src={info.url} title="your video" width="100%"></iframe></div>
//     </div>
// }
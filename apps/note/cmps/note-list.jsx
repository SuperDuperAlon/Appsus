
const { useState, useEffect, useRef } = React
import {DynamicCmp} from "../cmps/dynamic-cmp.jsx"

export function NoteList({ notes , onRemoveNote , onOpenPreview, onPinnedNote, openEdit}) {

    const arePinned = notes.some(note=> note.isPinned === true)

    return <div className="note-list-container">
            {arePinned && <h6>Pinned</h6>}
            <ul className="note-list"> 
            {notes.map(note =>{
                if(note.isPinned){
                    return <li onClick={()=>onOpenPreview(note)} key={note.id} className="note" style={{backgroundColor:note.style.backgroundColor}}><DynamicCmp props={note} />
                   <div className="note-operators">
                <button onClick={(ev) => onRemoveNote(ev, note.id)}><i className="fa-solid fa-trash"></i></button>
                <button onClick={() => openEdit(true)}><i class="fa-solid fa-pen-to-square"></i></button>
                <button><i class="fa-solid fa-envelope"></i></button>
                {/* <div className="color-container"><i class="fa-solid fa-palette"></i><input type="color" className="color-input"/></div> */}
                <button  onClick={(ev) => onPinnedNote(ev, note.id)}><i className= "fa-sharp fa-solid fa-thumbtack yellow" ></i></button>
                </div></li>
                }
                })
            }
            </ul>
            {arePinned && <h6>Other</h6>}
            <ul className="note-list">
                {notes.map(note =>{
                    if(!note.isPinned){
                    return <li onClick={()=>onOpenPreview(note)} key={note.id} className="note" style={{backgroundColor:note.style.backgroundColor}}><DynamicCmp props={note} />
                        <div className="note-operators">
                <button onClick={(ev) => onRemoveNote(ev, note.id)}><i class="fa-solid fa-trash"></i></button>
                <button onClick={() => setIsEdit(true)}><i class="fa-solid fa-pen-to-square"></i></button>
                <button><i class="fa-solid fa-envelope"></i></button>
                {/* <div className="color-container"><i class="fa-solid fa-palette"></i><input type="color" className="color-input"/></div> */}
                <button onClick={(ev) => onPinnedNote(ev, note.id)}><i className= "fa-sharp fa-solid fa-thumbtack" ></i></button>
                </div>
                </li>
                        }
                })
            }
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
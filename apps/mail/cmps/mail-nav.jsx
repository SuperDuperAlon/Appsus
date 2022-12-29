const { useState } = React;
const { Link } = ReactRouterDOM;

import { mailService } from "../services/mail.service.js";

export function MailNav() {
  // const [currFolder, setCurrFolder] = useState('inbox');

  return (
    <aside className="main-nav ">
      <ul className="clean-list">
        <Link to="./mail"> Inbox</Link>
        <Link to="./mail/trash">Trash</Link>
        <Link to="./mail/unread">Unread</Link>
        <Link to="./mail/sent">Sent</Link>
      </ul>
    </aside>
  );
}

// export function NoteList({ notes , onRemoveNote }) {

//   return <div >
//       <ul className="note-list">
//           {notes.map(note =>
//               <li key={note.id} className="note" style={{backgroundColor:note.style.backgroundColor}}><DynamicCmp props={note} /><button onClick={()=>onRemoveNote(note.id)}>Delete</button></li>)}
//       </ul>
//   </div>

// }

// function DynamicCmp(props) {
//   switch (props.props.type) {
//       case 'note-txt':
//           return <NoteTxt {...props.props} />
//       case 'note-img':
//           return <NoteImg {...props.props} />
//       case 'note-todos':
//           return <NoteToDos {...props.props} />
//       case 'note-video':
//           return <NoteVideo {...props.props} />
//   }
// }

// function NoteTxt({ info }) {
//   return <div>
//       {info.title && <h1>{info.title}</h1> }
//       <p>{info.txt}</p>
//       </div>
// }
// function NoteImg(props) {
//   return (<div>
//       <h1>{props.info.title}</h1>
//       <img src={props.info.url} />
//   </div>)
// }
// function NoteToDos(props) {
//   return <div>
//       <ul>
//           <h1>{props.info.label}</h1>
//           {props.info.todos.map((todo,idx) => <li key={idx} className="chack-mark"><input type="checkbox"/> <label>{todo.txt}</label></li>)}
//       </ul>
//   </div>
// }
// function NoteVideo({info}) {
//   return <div>
//       {info.title && <h1>{info.title}</h1> }
//       <iframe src={info.url} title="your video"></iframe>
//   </div>
// }

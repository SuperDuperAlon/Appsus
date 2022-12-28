

export function NoteList({ notes }) {

    return <div >
        <ul className="note-list">
            {notes.map(note =>
                <li key={note.id} className="note"><DynamicCmp props={note} /></li>)}
        </ul>
    </div>

}


function DynamicCmp(props) {
    console.log(props.props.type);
    switch (props.props.type) {
        case 'note-txt':
            return <NoteTxt {...props.props} />
        case 'note-img':
            return <NoteImg {...props.props} />
        case 'note-todos':
            return <NoteToDos {...props.props} />
        case 'note-video':
            return <WelcomeBack {...props.props} />
    }
}

function NoteTxt({ info }) {
    // console.log(info)
    return <p>{info.txt}</p>
}
function NoteImg(props) {
    return (<div>
        <h1>{props.info.title}</h1>
        <img src={props.info.url} />
    </div>)
}
function NoteToDos(props) {
    console.log(props);
    return <div>
        <ul>
            <h1>{props.info.label}</h1>
            {props.info.todos.map(todo => <li class="chack-mark">{todo.txt}</li>)}
        </ul>
    </div>
}


//   <ul>
//             <h1>{props.info.label}</h1>
//             {props.info.todos.map(todo=> <li class="chack-mark">{todo.txt}</li>)}
//           </ul>


{/* <FormGroup>
{props.info.todos.map(todo=><FormControlLabel control={<Checkbox defaultChecked />} label={todo.txt} />)}
</FormGroup> */}
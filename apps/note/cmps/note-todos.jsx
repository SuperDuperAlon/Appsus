
export function NoteToDos(props) {
    return <div>
        <ul>
            <h1>{props.info.title}</h1>
            {props.info.todos.map((todo,idx) => <li key={idx} className="chack-mark"><input type="checkbox"/> <label>{todo.txt}</label></li>)}
        </ul>
    </div>
}
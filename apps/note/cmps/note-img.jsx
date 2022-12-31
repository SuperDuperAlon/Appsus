
export function NoteImg(props) {
    return (<div class="img-container">
        <img src={props.info.url} />
        <h1>{props.info.title}</h1>
    </div>)
}
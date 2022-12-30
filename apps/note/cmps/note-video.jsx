
export function NoteVideo({info}) {
    return <div>
        {info.title && <h1>{info.title}</h1> }
        <div className="video-container"><iframe src={info.url} title="your video" width="100%"></iframe></div>
    </div>
}
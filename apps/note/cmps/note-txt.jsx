
export function NoteTxt({ info }) {
    return <div>
        {info.title && <h1>{info.title}</h1> }
        <p>{info.txt}</p>
        </div>
}
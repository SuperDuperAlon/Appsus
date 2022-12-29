const { useParams} = ReactRouterDOM

export function NotePreview(){
    const { noteID } = useParams()
    console.log(useParams())
    
    return <h1>{noteID}</h1>

}
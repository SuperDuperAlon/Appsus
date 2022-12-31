const { useState, useEffect, useRef } = React

import {noteService} from "../services/note.service.js"

export function NoteFilter({onSetFilter}) {

    const [filterByToEdit, setFilterByToEdit] = useState(noteService.getDefaultFilter())
    const elInputRef = useRef(null)

    useEffect(() => {
        elInputRef.current.focus()
    }, [])

    useEffect(() => {
        onSetFilter(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        let { value, name: field, type } = target
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
    }

    function onSubmitFilter(ev) {
        // update father cmp that filters change on submit
        ev.preventDefault()
        onSetFilter(filterByToEdit)
    }
    
    
    return <section className="filter">
        <label htmlFor="txt"><i className="fa-solid fa-magnifying-glass"></i></label>
        <form onSubmit={onSubmitFilter}>
        <input type="text"
                id="txt"
                name="txt"
                placeholder= "Search"
                value={filterByToEdit.txt}
                onChange={handleChange}
                ref={elInputRef}
            />
            </form>

    </section>
}
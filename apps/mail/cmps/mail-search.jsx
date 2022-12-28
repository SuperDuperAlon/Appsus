const { useState, useEffect, useRef } = React

import { mailService } from "../../mail/services/mail.service.js"


export function MailSearchBar({ onSetFilter }) {

    const [filterByToEdit, setFilterByToEdit] = useState(mailService.getDefaultFilter())
    const elInputRef = useRef(null)

    useEffect(() => {
        elInputRef.current.focus()
    }, [])

    useEffect(() => {
        onSetFilter(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        let { value, name: field, type } = target;
        console.log(value);
        console.log(field);
        console.log(type);
        value = type === "number" ? +value : value;
        setFilterByToEdit((prevFilter) => {
          return {
            ...prevFilter,
            [field]: value,
          };
        });
      }

    return <section>
        <h2>Filter our emails</h2>
        <form>
            <label htmlFor="vendor">Vendor:</label>
            <input type="text"
                id="vendor"
                name="from"
                placeholder="emails"
                value={filterByToEdit.from}
                onChange={handleChange}
                ref={elInputRef}
            />
        </form>

    </section>
}
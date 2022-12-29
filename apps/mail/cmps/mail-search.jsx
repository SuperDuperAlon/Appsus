const { useState, useEffect, useRef } = React;

import { mailService } from "../../mail/services/mail.service.js";

export function MailSearchBar({ onSetFilter, sortByNumbers, sortByAlphabet }) {
  const [filterByToEdit, setFilterByToEdit] = useState(
    mailService.getDefaultFilter()
  );
  const elInputRef = useRef(null);

  useEffect(() => {
    elInputRef.current.focus();
  }, []);

  useEffect(() => {
    onSetFilter(filterByToEdit);
  }, [filterByToEdit]);

  function handleChange({ target }) {
    let { value, name: field, type } = target;
    value = type === "number" ? +value : value;
    setFilterByToEdit((prevFilter) => {
      return {
        ...prevFilter,
        [field]: value,
      };
    });
  }

  return (
    <section className="mail-search">
      <form>
        <label htmlFor="sender"></label>
        <input
          type="text"
          id="sender"
          name="from"
          placeholder="🥦 Search Mail"
          value={filterByToEdit.from}
          onChange={handleChange}
          ref={elInputRef}
        />
      </form>
      <button onClick={sortByNumbers}>#</button>
      <button onClick={sortByAlphabet}>Aa</button>
    </section>
  );
}

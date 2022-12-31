export function MailSearchBar({
  filterByText,
  sortByNumbers,
  sortByAlphabet,
  filterByRead,
}) {
  function handleChange({ target }) {
    let { value } = target
    filterByText(value)
  }

  return (
    <section className="mail-search">
      <div className="mail-search-bar">
        <div className="mail-search-form">
          <form>
            <label htmlFor="sender"></label>
            <input
              type="text"
              id="sender"
              name="from"
              placeholder="Search Mail"
              value={filterByText.from}
              onChange={handleChange}
            />
          </form>
        </div>
        <div className="mail-search-btn">
          <button onClick={() => filterByRead("unread")}><i className="fa-solid fa-envelope"></i></button>
          <button onClick={() => filterByRead("read")}><i className="fa-solid fa-envelope-open"></i></button>
          <button onClick={() => filterByRead("all")}><i className="fa-solid fa-envelopes-bulk"></i></button>
          <button onClick={sortByNumbers}>#</button>
          <button onClick={sortByAlphabet}>Aa</button>
        </div>
      </div>
    </section>
  )
}

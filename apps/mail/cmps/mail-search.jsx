export function MailSearchBar({
  filterByText,
  sortByNumbers,
  sortByAlphabet,
  filterByRead,
}) {
  function handleChange({ target }) {
    let { value } = target;
    filterByText(value);
  }

  return (
    <section className="mail-search">
      <div className="mail-search-bar">
        <div className="mail-search-form">
          <a>
            <i className="fa-solid fa-magnifying-glass"></i>
          </a>
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
          <button onClick={() => filterByRead("unread")}>unread</button>
          <button onClick={() => filterByRead("read")}>read</button>
          <button onClick={() => filterByRead("all")}>read</button>
          <button onClick={sortByNumbers}>#</button>
          <button onClick={sortByAlphabet}>Aa</button>
        </div>
      </div>
    </section>
  );
}

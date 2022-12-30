export function MailSearchBar({ filterByText, sortByNumbers, sortByAlphabet }) {
  function handleChange({ target }) {
    let { value } = target;
    filterByText(value);
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
          value={filterByText.from}
          onChange={handleChange}
        />
      </form>
      <button onClick={sortByNumbers}>#</button>
      <button onClick={sortByAlphabet}>Aa</button>
    </section>
  );
}

export function MailCompose({ openComposeBtnSection }) {
  return (
    <section className="mail-compose-btn">
      <button className="compose-btn" onClick={openComposeBtnSection}>
        <i className="fa-solid fa-pen-to-square"></i> Compose
      </button>
    </section>
  );
}

export function MailCompose({ openComposeBtnSection }) {
  return (
    <section className="mail-compose-btn">
      <button className="compose-btn" onClick={openComposeBtnSection}>
        <div className="compose-btn-icon">
          <i className="fa-solid fa-pen-to-square"></i>
        </div>
        <div className="compose-btn-txt">Compose</div>
      </button>
    </section>
  );
}

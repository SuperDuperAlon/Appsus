export function MailCompose({openComposeBtnSection}) {
  return (
    <section className="mail-compose-btn">
      <button className="compose-btn" onClick={openComposeBtnSection}>Compose</button>
    </section>
  );
}

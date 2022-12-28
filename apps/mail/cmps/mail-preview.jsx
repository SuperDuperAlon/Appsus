export function MailPreview({ mail }) {
  return (
    <article className="mail-preview">
      <h2>Subject: {mail.subject}</h2>
      <h3>Body: {mail.body}</h3>
    </article>
  );
}

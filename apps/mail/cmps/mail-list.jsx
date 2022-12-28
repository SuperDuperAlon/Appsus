import { mailService } from "../services/mail.service.js";
import { MailPreview } from "./mail-preview.jsx";
export function MailList({ emails }) {
  console.log(emails);
  return (
    <table border="1">
      <thead>
        <tr>
          <th>Star</th>
          <th>From</th>
          <th>Message</th>
          <th>Delete</th>
          <th>Un/Read</th>
          <th>Time</th>
        </tr>
      </thead>
      <tbody>
        {emails.map((email) => (
          <MailPreview key={email.id} email={email} />
        ))}
      </tbody>
    </table>
  );
}

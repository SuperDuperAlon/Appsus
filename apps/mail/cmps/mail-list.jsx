import { mailService } from "../services/mail.service.js";
import { asyncStorageServe } from "../../../services/async-storage.service.js";

import { MailPreview } from "./mail-preview.jsx";

export function MailList({ mails, onRemoveMail }) {
  return (
    <section className="mail-list">
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
          {mails.map((mail) => (
            <MailPreview
              key={mail.id}
              mail={mail}
              onRemoveMail={onRemoveMail}
            />
          ))}
        </tbody>
      </table>
    </section>
  );
}

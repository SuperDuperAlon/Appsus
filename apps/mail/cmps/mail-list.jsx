import { mailService } from "../services/mail.service.js"
import { asyncStorageServe } from "../../../services/async-storage.service.js"

import { MailPreview } from "./mail-preview.jsx"

export function MailList({ mails, onRemoveMail , changeReadStatus}) {
  return (
    <section className="mail-list">
      <table border="1">
        <tbody>
          {mails.map((mail) => (
            <MailPreview
              key={mail.id}
              mail={mail}
              onRemoveMail={onRemoveMail}
              changeReadStatus={changeReadStatus}
            />
          ))}
        </tbody>
      </table>
    </section>
  )
}

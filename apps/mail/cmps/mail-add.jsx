const { useState, useEffconsect } = React
const { useNavigate, useParams, Link } = ReactRouterDOM

import { mailService } from "../../mail/services/mail.service.js"
import {
  eventBusService,
  showSuccessMsg,
} from "../services/event-bus.service.js"

export function MailAdd({ onSendMail }) {
  const [mailToAdd, setMailToAdd] = useState(mailService.getTemplateMail())

  function handleChange({ target }) {
    let { value, name: field } = target
    setMailToAdd((prevMail) => ({ ...prevMail, [field]: value }))
  }

  return (
    <section className="mail-add">
      <div className="mail-add-header">New Message</div>
      <div className="mail-add-form">
        <form
          onSubmit={() => {
            onSendMail(event, mailToAdd)
          }}
        >
          <div className="mail-add-receipient">
            <label htmlFor="receipient"> </label>
            <input
              type="text"
              name="to"
              id="Receipient"
              placeholder="Receipients"
              required
              pattern="^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$"
              value={mailToAdd.to}
              onChange={handleChange}
            />
            <div className="mail-add-subject"></div>
            <label htmlFor="subject"></label>
            <input
              type="text"
              name="subject"
              id="subject"
              placeholder="Subject"
              value={mailToAdd.subject}
              onChange={handleChange}
            />
            <div className="mail-add-body"></div>

            <label htmlFor="mail-body"></label>
            <input
              type="text-area"
              rows="20"
              cols="50"
              name="body"
              id="mail-body"
              placeholder=""
              value={mailToAdd.body}
              onChange={handleChange}
            />
          </div>

          <div>
            <button className="mail-add-submit-btn">Send</button>
          </div>
        </form>
      </div>
    </section>
  )
}

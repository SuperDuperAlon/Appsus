const { useState, Fragment, useEffect } = React;

import { asyncStorageServe } from "../../../services/async-storage.service.js";
import { mailService } from "../services/mail.service.js";

export function MailPreview({ email, onRemoveEmail }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isUnread, setIsRead] = useState("white");

  function changeReadStatus() {
    console.log("I was clicked");
  }

  return (
    <Fragment>
      <tr
        onClick={() => {
          setIsExpanded(!isExpanded);
        }}
      >
        <td>🐱‍🚀</td>
        <td>{email.from}</td>
        <td>
          <span className="email-title-bold">{email.subject}</span> - {email.body}
        </td>
        <td>
          <button onClick={() => onRemoveEmail(email.id)}>🗑</button>{" "}
        </td>
        <td>✉</td>
        <td>Time</td>
      </tr>
      <tr hidden={!isExpanded}>
        <td colSpan="6">
          <h3>{email.body}</h3>
        </td>
      </tr>
    </Fragment>
  );
}

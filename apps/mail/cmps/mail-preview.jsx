const { useState, Fragment, useEffect } = React;

import { asyncStorageServe } from "../../../services/async-storage.service.js";
import { mailService } from "../services/mail.service.js";

export function MailPreview({ email, onRemoveEmail }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isUnread, setIsRead] = useState("white");

  function changeReadStatus() {
    console.log("I was clicked");
  }

  console.log(email);
  return (
    <Fragment>
      <tr>
        <td>🐱‍🚀</td>
        <td>{email.from}</td>
        <td
          onClick={() => {
            setIsExpanded(!isExpanded);
          }}
        >
          {email.subject} - {email.body}
        </td>
        <td>
          <button onClick={() => onRemoveEmail(email.id)}>🗑</button>{" "}
        </td>
        <td>✉</td>
        <td>Time</td>
      </tr>
      <tr hidden={!isExpanded} bgcolor={"lightgrey"}>
        <td colSpan="6">
          <h3>Body: {email.body}</h3>
        </td>
      </tr>
    </Fragment>
  );
}

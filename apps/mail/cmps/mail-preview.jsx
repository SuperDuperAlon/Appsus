const { useState, Fragment, useEffect } = React;

import { asyncStorageServe } from "../../../services/async-storage.service.js";
import { mailService } from "../services/mail.service.js";

export function MailPreview({ mail, onRemoveMail }) {
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
        <td><i class="fa-regular fa-star"></i></td>
        <td>{mail.from}</td>
        <td>
          <span className="mail-title-bold">{mail.subject}</span> - {mail.body}
        </td>
        <td>
          <a onClick={(ev) => onRemoveMail(mail.id, ev)}><i class="fa-solid fa-trash"></i></a>
        </td>
        <td><i class="fa-regular fa-envelope"></i></td>
        <td>{mail.sentAt}</td>
      </tr>
      <tr hidden={!isExpanded}>
        <td colSpan="6">
          <h3>{mail.body}</h3>
        </td>
      </tr>
    </Fragment>
  );
}

const { useState, Fragment, useEffect } = React;

import { asyncStorageServe } from "../../../services/async-storage.service.js";
import { mailService } from "../services/mail.service.js";

export function MailPreview({ mail, onRemoveMail, changeReadStatus }) {
  const [isExpanded, setIsExpanded] = useState(false);
  // const [carToEdit, setCarToEdit] = useState(null)
  //   const navigate = useNavigate()
  const [isUnread, setIsRead] = useState("white");

  function getNameFromEmail(name) {
    const idx = name.indexOf("@");
    return name.substring(0, idx);
  }

  return (
    <Fragment>
      <tr
        onClick={() => {
          setIsExpanded(!isExpanded);
        }}
      >
        <td className="mail-list-star">
          <i className="fa-regular fa-star"></i>
        </td>
        <td className="mail-list-from bold capitalize">{getNameFromEmail(`${mail.from}`)}</td>
        <td className="mail-title-subject">
          <span className="bold">{mail.subject}</span> - {mail.body}
        </td>
        <td className="mail-list-delete">
          <a onClick={(ev) => onRemoveMail(mail.id, ev)}>
            <i className="fa-solid fa-trash"></i>
          </a>
        </td>
        <td className="mail-list-read">
          <a onClick={(ev) => changeReadStatus(mail.id, ev)}>
            <i className="fa-regular fa-envelope"></i>
          </a>
        </td>
        <td className="mail-list-date bold">{mail.sentAt}</td>
      </tr>
      <tr hidden={!isExpanded}>
        <td colSpan="6">
          <h1>{mail.from}</h1>
          <h3>{mail.subject}</h3>
          <h3>{mail.body}</h3>
        </td>
      </tr>
    </Fragment>
  );
}

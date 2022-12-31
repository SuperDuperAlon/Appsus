const { useState, Fragment, useEffect } = React;

import { asyncStorageServe } from "../../../services/async-storage.service.js";
import { mailService } from "../services/mail.service.js";

export function MailPreview({ mail, onRemoveMail, setReadStatus }) {
  const [isExpanded, setIsExpanded] = useState(false);
  // const [carToEdit, setCarToEdit] = useState(null)
  //   const navigate = useNavigate()
  const [isRead, setIsRead] = useState(false);

  function getNameFromEmail(name) {
    const idx = name.indexOf("@");
    return name.substring(0, idx);
  }

  // function setReadStatus(mailId) {
  //   console.log(mailId);
  // }

  function changeReadStyling() {
    if (mail.isRead) return "read";
    else return "";
  }

  return (
    <Fragment>
      <tr
        className={changeReadStyling()}
        // onClick={() => {
        //   setReadStatus(mail.id)
        // }}
        onClick={() => {
          setIsExpanded(!isExpanded)
        }}

      >
        <td className="mail-list-star">
          <i className="fa-regular fa-star"></i>
        </td>
        <td className="mail-list-from capitalize">
          {getNameFromEmail(`${mail.from}`)}
        </td>
        <td className="mail-title-subject">
          <span className="mail-title-bold">{mail.subject}</span> - {mail.body}
        </td>
        <td className="mail-list-delete">
          <a onClick={(ev) => onRemoveMail(mail.id, ev)}>
            <i className="fa-solid fa-trash"></i>
          </a>
        </td>
        <td className="mail-list-read">
          <a>
            <i className="fa-regular fa-envelope"></i>
          </a>
        </td>
        <td className="mail-list-date">{mail.sentAt}</td>
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

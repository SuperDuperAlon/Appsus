import { mailService  } from "../services/mail.service.js";

const { NavLink } = ReactRouterDOM;




export function MailNav({ changeStatus, changeReadStatus, getUnreadEmailsCount }) {
  const unreadEmailsCount = getUnreadEmailsCount();
  console.log(unreadEmailsCount);
  return (
    <aside className="mail-nav ">
      <ul>
        <div className="mail-nav-item">
          <NavLink to="/mail" onClick={() => changeStatus("inbox")}>
            <i className="fa-solid fa-inbox mail-nav-icon"></i>
            <div className="mail-nav-menu-item">Inbox</div>
          </NavLink>
        </div>
        <div className="mail-nav-item">
          <NavLink to="/mail/trash" onClick={() => changeStatus("trash")}>
            <i className="fa-solid fa-trash mail-nav-icon"></i>
            <div className="mail-nav-menu-item">Trash</div>
          </NavLink>
        </div>
        <div className="mail-nav-item">
          <NavLink to="/mail/unread" onClick={() => changeStatus("unread")}>
            <i className="fa-solid fa-envelope-open mail-nav-icon"></i> 
            <div className="mail-nav-menu-item">Unread</div>
          </NavLink>
        </div>
        <div className="mail-nav-item">
          <NavLink to="/mail/sent" onClick={() => changeStatus("sent")}>
            <i className="fa-solid fa-paper-plane mail-nav-icon"></i>
            <div className="mail-nav-menu-item">Sent</div>
          </NavLink>
        </div>
      </ul>
    </aside>
  );
}

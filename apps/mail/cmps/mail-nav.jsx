import { mailService  } from "../services/mail.service.js";

const { NavLink } = ReactRouterDOM;




export function MailNav({ changeNavStatus, getUnreadEmailsCount }) {
  const unreadEmailsCount = getUnreadEmailsCount();
  return (
    <aside className="mail-nav ">
      <ul>
        <div className="mail-nav-item">
          <NavLink to="/mail" onClick={() => changeNavStatus("inbox")}>
            <i className="fa-solid fa-inbox mail-nav-icon"></i>
            <div className="mail-nav-menu-item">Inbox</div>
          </NavLink>
        </div>
        <div className="mail-nav-item">
          <NavLink to="/mail/trash" onClick={() => changeNavStatus("trash")}>
            <i className="fa-solid fa-trash mail-nav-icon"></i>
            <div className="mail-nav-menu-item">Trash</div>
          </NavLink>
        </div>
        <div className="mail-nav-item">
          <NavLink to="/mail/unread" onClick={() => changeNavStatus("unread")}>
            <i className="fa-solid fa-envelope-open mail-nav-icon"></i> 
            <div className="mail-nav-menu-item">Unread</div>
          </NavLink>
        </div>
        <div className="mail-nav-item">
          <NavLink to="/mail/sent" onClick={() => changeNavStatus("sent")}>
            <i className="fa-solid fa-paper-plane mail-nav-icon"></i>
            <div className="mail-nav-menu-item">Sent</div>
          </NavLink>
        </div>
      </ul>
    </aside>
  );
}

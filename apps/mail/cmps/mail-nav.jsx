const { NavLink } = ReactRouterDOM;

export function MailNav({ changeStatus }) {
  return (
    <aside className="main-nav ">
      <ul>
        <NavLink to="/mail" onClick={() => changeStatus("inbox")}>
          Inbox
        </NavLink>
        <NavLink to="/mail/trash" onClick={() => changeStatus("trash")}>
          Trash
        </NavLink>
        <NavLink to="/mail/unread" onClick={() => changeStatus("unread")}>
          Unread
        </NavLink>
        <NavLink to="/mail/sent" onClick={() => changeStatus("sent")}>
          Sent
        </NavLink>
      </ul>
    </aside>
  );
}

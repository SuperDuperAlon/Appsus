const { useState } = React;
const { NavLink } = ReactRouterDOM;

export function MailNav({ changeStatus }) {
  return (
    <aside className="main-nav ">
      <ul>
        <a onClick={() => changeStatus("inbox")}>
          <NavLink to="/mail"> Inbox</NavLink>
        </a>
        <a onClick={() => changeStatus("trash")}>
          <NavLink to="/mail/trash">Trash</NavLink>
        </a>
        <a onClick={() => changeStatus("unread")}>
          <NavLink to="/mail/unread">Unread</NavLink>
        </a>
        <a onClick={() => changeStatus("sent")}>
          <NavLink to="/mail/sent">Sent</NavLink>
        </a>
      </ul>
    </aside>
  );
}

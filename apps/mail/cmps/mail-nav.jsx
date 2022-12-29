const { useState } = React;
const { NavLink } = ReactRouterDOM;

import { mailService } from "../services/mail.service.js";

export function MailNav() {

  return (
    <aside className="main-nav ">
      <ul className="clean-list">
        <NavLink to="/mail"> Inbox</NavLink>
        <NavLink to="/mail/trash">Trash</NavLink>
        <NavLink to="/mail/unread">Unread</NavLink>
        <NavLink to="/mail/sent">Sent</NavLink>
      </ul>
    </aside>
  );
}
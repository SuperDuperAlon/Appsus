import { MailNav } from "../cmps/mail-nav.jsx";
import { MailList } from "../cmps/mail-list.jsx";
import { MailSearchBar } from "../cmps/mail-search.jsx";

export function MailIndex() {
  return (
    <div>
      <h1>mail app</h1>
      <MailNav />
      <MailList />
      <MailSearchBar />
    </div>
  );
}

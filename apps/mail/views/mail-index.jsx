const { useState, useEffect } = React;

import { MailNav } from "../cmps/mail-nav.jsx";
import { MailList } from "../cmps/mail-list.jsx";
import { MailSearchBar } from "../cmps/mail-search.jsx";

import { mailService } from "../services/mail.service.js";

export function MailIndex() {
  const [emails, setEmails] = useState([]);
  console.log(emails);
  useEffect(() => {
    loadEmails();
    console.log(emails);
  }, []);

  // var emails = loadEmails()
  console.log(emails);
  function loadEmails() {
    mailService.query().then((emails => setEmails(emails)));
  }
  console.log(emails);
  if (!emails) return <h1>Loading</h1>;
  console.log(emails);
  return (
    <section className="mail-index">
      <h1>mail app</h1>
      <MailNav />
      <MailList emails={emails} />
      <MailSearchBar />
    </section>
  );
}

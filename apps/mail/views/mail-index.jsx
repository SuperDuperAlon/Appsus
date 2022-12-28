const { useState, useEffect } = React;

import { MailNav } from "../cmps/mail-nav.jsx";
import { MailList } from "../cmps/mail-list.jsx";
import { MailSearchBar } from "../cmps/mail-search.jsx";
import { MailCompose } from "../cmps/mail-compose.jsx";
import { SurveyApp } from "../cmps/mail-survey.jsx";

import { mailService } from "../services/mail.service.js";
import { asyncStorageService } from "../../../services/async-storage.service.js";

export function MailIndex() {
  const [emails, setEmails] = useState([]);
      const [filterBy, setFilterBy] = useState(mailService.getDefaultFilter())

  useEffect(() => {
    loadEmails();
  }, [filterBy]);

  function loadEmails() {
    mailService.query(filterBy).then((emails) => setEmails(emails));
  }

  function onSetFilter(filterByFromFilter) {
    setFilterBy(filterByFromFilter)
}

  function onAddEmail() {
    console.log("This is a start of a form");
  }

  function onRemoveEmail(emailId) {
    console.log(emailId);
    mailService.remove(emailId).then(() => {
      const updatedEmails = emails.filter((email) => email.id !== emailId);
      setEmails(updatedEmails);
    });
  }

  if (!emails) return <h1>Loading</h1>;
  return (
    <section className="mail-index">
      <h1>mail app</h1>
      <SurveyApp />
      <MailSearchBar onSetFilter={onSetFilter} />
      <MailCompose />
      <MailNav />
      <MailList emails={emails} onRemoveEmail={onRemoveEmail} />
    </section>
  );
}

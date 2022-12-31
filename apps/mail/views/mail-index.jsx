const { useState, useEffect } = React;

import { MailNav } from "../cmps/mail-nav.jsx";
import { MailList } from "../cmps/mail-list.jsx";
import { MailSearchBar } from "../cmps/mail-search.jsx";
import { MailCompose } from "../cmps/mail-compose.jsx";
import { MailAdd } from "../cmps/mail-add.jsx";

import { mailService } from "../services/mail.service.js";
import { asyncStorageService } from "../../../services/async-storage.service.js";

export function MailIndex() {
  const [mails, setMails] = useState([]);
  const [filterBy, setFilterBy] = useState(mailService.getDefaultFilter());
  const [sortBy, setSortBy] = useState("sentAt");

  useEffect(() => {
    loadMails();
  }, [filterBy]);

  useEffect(() => {
    loadMails();
  }, [sortBy]);

  function loadMails() {
    mailService.query(filterBy, sortBy).then((mails) => setMails(mails));
  }

  function openComposeBtnSection() {
    console.log("section opened");
  }

  function onSendMail(ev, mailToAdd) {
    ev.preventDefault();
    mailService.post(mailToAdd).then((mail) => {
      setMails(mails);
      loadMails();
    });
  }

  function onRemoveMail(mailId, ev) {
    ev.stopPropagation();
    mailService.remove(mailId).then(() => {
      const updatedeMails = mails.filter((mail) => mail.id !== mailId);
      setMails(updatedeMails);
    });
  }

  function sortByNumbers() {
    let sort = "sentAt";
    console.log(sort);
    setSortBy(sort);
    loadMails();
  }

  function sortByAlphabet() {
    let sort = "from";
    setSortBy(sort);
    loadMails();
  }

  function filterByText(value) {
    let filter = { ...filterBy, from: value };
    setFilterBy(filter);
  }

  function changeStatus(value) {
    let filter = { ...filterBy, status: value };
    setFilterBy(filter);
  }

  function filterByRead(value) {
    let filter = { ...filterBy, read: value };
    setFilterBy(filter);
  }

  function setReadStatus(mailId) {
    console.log('this is working');
  }

  function getUnreadEmailsCount() {
    mailService.countUnreadEmails().then((mails) => mails.length);
  }

  if (!mails) return <h1>Loading</h1>;
  return (
    <section className="mail-index">
      <MailSearchBar
        filterByText={filterByText}
        sortByNumbers={sortByNumbers}
        sortByAlphabet={sortByAlphabet}
        setReadStatus={setReadStatus}
        filterByRead={filterByRead}
      />
      <MailCompose openComposeBtnSection={openComposeBtnSection} />
      <MailNav
        changeStatus={changeStatus}
        setReadStatus={setReadStatus}
        getUnreadEmailsCount={getUnreadEmailsCount}
      />
      <MailList mails={mails} onRemoveMail={onRemoveMail} />
      <MailAdd onSendMail={onSendMail} />
    </section>
  );
}

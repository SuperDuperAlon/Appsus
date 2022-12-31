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
  const [isCompose, setIsCompose] = useState(false);

  useEffect(() => {
    loadMails();
  }, [filterBy]);

  useEffect(() => {
    loadMails();
  }, [sortBy]);

  useEffect(() => {
    setIsCompose(isCompose);
  }, [true]);

  function loadMails() {
    mailService.query(filterBy, sortBy).then((mails) => setMails(mails));
  }

  function openComposeBtnSection() {
    setIsCompose(!isCompose);
  }

  function closeMailEditor() {
    console.log("this is workng");
    setIsCompose(!isCompose);
  }

  function onSendMail(ev, mailToAdd) {
    ev.preventDefault();
    mailService.post(mailToAdd).then((mail) => {
      setIsCompose(!isCompose);
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

  //Sorting functions

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

  // filtering Functions

  function filterByText(value) {
    let filter = { ...filterBy, from: value };
    setFilterBy(filter);
  }

  function changeNavStatus(value) {
    let filter = { ...filterBy, status: value };
    setFilterBy(filter);
  }

  function filterByRead(value) {
    let filter = { ...filterBy, read: value };
    setFilterBy(filter);
  }

  function changeReadStatus(mailId) {
    const mail = mailService
      .get(mailId)
      .then((mail) => {
        return (mail = { ...mail, isRead: true });
      })
      .then((mail) => mailService.put(mail));
    setMails(mails);
    loadMails();
    return mail;
  }

  function getUnreadEmailsCount() {
    return mailService.countUnreadEmails().then((mails) => mails.length);
  }

  if (!mails) return <h1>Loading</h1>;
  return (
    <section className="mail-index">
      <MailSearchBar
        filterByText={filterByText}
        sortByNumbers={sortByNumbers}
        sortByAlphabet={sortByAlphabet}
        filterByRead={filterByRead}
      />
      <MailCompose openComposeBtnSection={openComposeBtnSection} />
      <MailNav
        changeNavStatus={changeNavStatus}
        getUnreadEmailsCount={getUnreadEmailsCount}
      />
      <MailList
        mails={mails}
        onRemoveMail={onRemoveMail}
        changeReadStatus={changeReadStatus}
      />
      {isCompose && (
        <MailAdd onSendMail={onSendMail} closeMailEditor={closeMailEditor} />
      )}
    </section>
  );
}

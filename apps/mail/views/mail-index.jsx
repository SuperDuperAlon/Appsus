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

  useEffect(() => {
    loadMails();
  }, [filterBy]);

  function loadMails() {
    mailService.query(filterBy).then((mails) => setMails(mails));
  }

  function onSetFilter(filterByFromFilter) {
    setFilterBy(filterByFromFilter);
  }

  function openComposeBtnSection() {
    console.log("section opened");
  }
  console.log(mails);

  function onSendMail(ev, mailToAdd) {
    ev.preventDefault();
    mailService.post(mailToAdd).then((mail) => {
      console.log("new mail", mail);
      setMails(mails);
      loadMails();
    });
  }

  function onRemoveMail(mailId, ev) {
    ev.stopPropagation()
    mailService.remove(mailId).then(() => {
      const updatedeMails = mails.filter((mail) => mail.id !== mailId);
      setMails(updatedeMails);
    });
  }

  function sortByNumbers() {
    return mailService.query().then((mails) =>
      mails
        .sort((a, b) => a.sentAt - b.sentAt)
        .then((mails) => {
          setMails(mails);
          countUnreadEmails();
          loadMails();
        })
    );
  }

  function sortByAlphabet() {
    const alphaSort = new Promise((mails) =>
      mails.sort().then((mails) => {
        setMails(mails);
        loadMails();
      })
    );
    return alphaSort;
  }

  function changeStatus(value) {
    let filter = { ...filterBy, status: value };
    setFilterBy(filter);
  }

  function countUnreadEmails() {
    mailService.query().then((mails) => mails.filter((mail) => !mail.isRead));
    return console.log(mails.length);
  }

  if (!mails) return <h1>Loading</h1>;
  return (
    <section className="mail-index">
      <MailSearchBar
        onSetFilter={onSetFilter}
        sorBytNumbers={sortByNumbers}
        sortByAlphabet={sortByAlphabet}
      />
      <MailCompose openComposeBtnSection={openComposeBtnSection} />
      <MailNav changeStatus={changeStatus} />
      <MailList mails={mails} onRemoveMail={onRemoveMail} />
      <MailAdd onSendMail={onSendMail} />
    </section>
  );
}

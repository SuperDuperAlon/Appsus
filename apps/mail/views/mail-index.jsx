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
  console.log('section opened');
}

function onSendMail(ev, mailToAdd) {
  ev.preventDefault()
  mailService.post(mailToAdd).then((mail) => {
    console.log('new mail', mail);
    setMails(mails)
    loadMails()
  })
}

  function onRemoveMail(mailId, ev) {
    ev.stopPropagation()
    mailService.remove(mailId).then(() => {
      const updatedeMails = mails.filter((mail) => mail.id !== mailId);
      setMails(updatedeMails);
    });
  }

  if (!mails) return <h1>Loading</h1>;
  return (
    <section className="mail-index">
      <MailSearchBar onSetFilter={onSetFilter} />
      <MailCompose openComposeBtnSection={openComposeBtnSection}/>
      <MailNav loadMails={loadMails}/>
      <MailList mails={mails} onRemoveMail={onRemoveMail} />
      <MailAdd onSendMail={onSendMail}/>
    </section>
  );
}

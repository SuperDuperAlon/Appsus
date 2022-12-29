import { utilService } from "../../../services/util.service.js";
import { storageService } from "../../../services/storage.service.js";
import { asyncStorageService } from "../../../services/async-storage.service.js";

const MAIL_KEY = "mailDB";
_createMails();
// mail Service Demo Data

export const mailService = {
  query,
  remove,
  getDefaultFilter,
  getTemplateMail,
  //   get,
  post,
  //   put,
};

function query(filterBy = getDefaultFilter(), ) {
  return asyncStorageService.query(MAIL_KEY).then((mails) => {
    const regex = new RegExp(filterBy.from, "i");
    mails = mails.filter((mail) => regex.test(mail.from));
    return mails;
  });
}

function remove(mailId) {
  console.log(mailId);
  return asyncStorageService.remove(MAIL_KEY, mailId);
}

function post(mail) {
  mail = { ...mail };
  mail.isRead = false;
  mail.sentAt = 1551133930594;
  mail.from = "user@appsus.com";
  mail.removedAt = null;
  return asyncStorageService.post(MAIL_KEY, mail);
}

function getDefaultFilter() {
  return { from: "" };
}

function getTemplateMail(to = "", subject = "", body = "") {
  return { to, subject, body };
}

function _createMails() {
  let mails = storageService.loadFromStorage(MAIL_KEY);
  if (!mails || !mails.length) {
    mails = [
      {
        id: utilService.makeId(),
        subject: "Miss you!",
        body: "Would love to catch up sometimes",
        isRead: false,
        sentAt: 1551133930594,
        removedAt: null,
        from: "momo@momo.com",
        to: "user@appsus.com",
      },
      {
        id: utilService.makeId(),
        subject: "Hello!",
        body: "This is the second mail",
        isRead: false,
        sentAt: 1551133930594,
        removedAt: null,
        from: "popo@popo.com",
        to: "user@appsus.com",
      },
      {
        id: utilService.makeId(),
        subject: "Miss you!",
        body: "This is the third mail",
        isRead: true,
        sentAt: 1551133930594,
        removedAt: null,
        from: "jojo@rabbit.com",
        to: "user@appsus.com",
      },
      {
        id: utilService.makeId(),
        subject: "Miss you!",
        body: "This is the third mail",
        isRead: true,
        sentAt: 1551133930594,
        removedAt: null,
        from: "baba@rabbsdsdsdsit.com",
        to: "user@appsus.com",
      },
      {
        id: utilService.makeId(),
        subject: "Miss you!",
        body: "This is the third mail",
        isRead: true,
        sentAt: 1551133930594,
        removedAt: null,
        from: "njdksg@rajdsft.com",
        to: "user@appsus.com",
      },
      {
        id: utilService.makeId(),
        subject: "Miss you!",
        body: "This is the third mail",
        isRead: true,
        sentAt: 1551133930594,
        removedAt: null,
        from: "dfgsd@dfdfdt.com",
        to: "user@appsus.com",
      },
    ];

    storageService.saveToStorage(MAIL_KEY, mails);
  }
}

// const criteria = {
//  status: {inbox, sent, trash, draft},
//  txt: 'puki', // no need to support complex text search
//  isRead: true, // (optional property, if missing: show all)
//  isStarred: true, // (optional property, if missing: show all)
//  lables: ['important', 'romantic'] // has any of the labels
// }
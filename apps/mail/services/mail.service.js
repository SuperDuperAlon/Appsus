import { utilService } from "../../../services/util.service.js";
import { storageService } from "../../../services/storage.service.js";
import { asyncStorageService } from "../../../services/async-storage.service.js";

const MAIL_KEY = "mailDB";
const USER_EMAIL = "user@appsus.com";
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

function query(filterBy = getDefaultFilter()) {
  return asyncStorageService.query(MAIL_KEY).then((mails) => {
    if (filterBy.from) {
      const regex = new RegExp(filterBy.from, "i");
      mails = mails.filter((mail) => regex.test(mail.from));
    }
    if (filterBy.status) {
      switch (filterBy.status) {
        case "unread":
          mails = mails.filter((mail) => !mail.isRead);
          break;
        case "trash":
          mails = mails.filter((mail) => mail.removedAt);
          break;
        case "inbox":
          mails = mails.filter((mail) => mail.to === USER_EMAIL);
          break;
        case "sent":
          mails = mails.filter((mail) => mail.from === USER_EMAIL);
          break;
      }
    }
    console.log(filterBy.status);
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
  mail.from = USER_EMAIL;
  mail.removedAt = null;
  return asyncStorageService.post(MAIL_KEY, mail);
}

function getDefaultFilter() {
  return { from: "", status: "inbox" };
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
        sentAt: 1651133930594,
        removedAt: true,
        from: "momo@momo.com",
        to: USER_EMAIL,
      },
      {
        id: utilService.makeId(),
        subject: "Hello!",
        body: "This is the second mail",
        isRead: false,
        sentAt: 1551133933594,
        removedAt: null,
        from: "popo@popo.com",
        to: USER_EMAIL,
      },
      {
        id: utilService.makeId(),
        subject: "Miss you!",
        body: "This is the third mail",
        isRead: true,
        sentAt: 1451133910594,
        removedAt: null,
        from: "jojo@rabbit.com",
        to: USER_EMAIL,
      },
      {
        id: utilService.makeId(),
        subject: "Miss you!",
        body: "This is the third mail",
        isRead: true,
        sentAt: 1351133970594,
        removedAt: null,
        from: "baba@rabbsdsdsdsit.com",
        to: USER_EMAIL,
      },
      {
        id: utilService.makeId(),
        subject: "Miss you!",
        body: "This is the third mail",
        isRead: true,
        sentAt: 1551133930594,
        removedAt: null,
        from: "njdksg@rajdsft.com",
        to: USER_EMAIL,
      },
      {
        id: utilService.makeId(),
        subject: "Miss you!",
        body: "This is the third mail",
        isRead: true,
        sentAt: 1551133930594,
        removedAt: null,
        from: "dfgsd@dfdfdt.com",
        to: USER_EMAIL,
      },
    ];

    storageService.saveToStorage(MAIL_KEY, mails);
  }
}

// var criteria = {
//  inbox, sent, trash, draft
// }

// console.log(criteria);

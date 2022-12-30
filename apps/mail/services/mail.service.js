import { utilService } from "../../../services/util.service.js";
import { storageService } from "../../../services/storage.service.js";
import { asyncStorageService } from "../../../services/async-storage.service.js";

const MAIL_KEY = "mailDB";
const USER_EMAIL = "user@appsus.com";
_createMails();

export const mailService = {
  query,
  remove,
  getDefaultFilter,
  getTemplateMail,
  //   get,
  post,
  //   put,
};

function query(filterBy = getDefaultFilter(), sortBy) {
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
    if (sortBy === "from") {
      mails.sort((a, b) => a.from - b.from);
    }
    if (sortBy === "sentAt") {
      mails.sort((a, b) => a.sentAt - b.sentAt);
    }
    return mails;
  });
}

function remove(mailId) {
  return asyncStorageService.remove(MAIL_KEY, mailId);
}

function post(mail) {
  mail = { ...mail };
  mail.isRead = false;
  mail.sentAt = getActualDate(Date.now());
  mail.from = USER_EMAIL;
  mail.removedAt = null;
  return asyncStorageService.post(MAIL_KEY, mail);
}

function put(mailId) {
  return asyncStorageService.put(MAIL_KEY, book)
}

function getDefaultFilter() {
  return { from: "", status: "inbox" };
}

function getTemplateMail(to = "", subject = "", body = "") {
  return { to, subject, body };
}

function getActualDate(date) {
  const dateToChange = new Date(date);
  const month = utilService.getMonthName(dateToChange).substring(0, 3);
  const day = dateToChange.getDate();
  const paddedDay = utilService.padNum(day);
  const actualDate = `${month} ${paddedDay}`;
  return actualDate;
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
        sentAt: getActualDate(1651133930594),
        removedAt: true,
        from: "momo@momo.com",
        to: USER_EMAIL,
      },
      {
        id: utilService.makeId(),
        subject: "Hello!",
        body: "This is the second mail",
        isRead: false,
        sentAt: getActualDate(1651133930594),
        removedAt: null,
        from: "popo@popo.com",
        to: USER_EMAIL,
      },
      {
        id: utilService.makeId(),
        subject: "Miss you!",
        body: "This is the third mail",
        isRead: true,
        sentAt: getActualDate(1651133930594),
        removedAt: null,
        from: "jojo@rabbit.com",
        to: USER_EMAIL,
      },
      {
        id: utilService.makeId(),
        subject: "Miss you!",
        body: "This is the third mail",
        isRead: true,
        sentAt: getActualDate(1651133930594),
        removedAt: null,
        from: "baba@rabbsdsdsdsit.com",
        to: USER_EMAIL,
      },
      {
        id: utilService.makeId(),
        subject: "Miss you!",
        body: "This is the third mail",
        isRead: true,
        sentAt: getActualDate(1351133930594),
        removedAt: null,
        from: "baba@rabbsdsdsdsit.com",
        to: USER_EMAIL,
      },
      {
        id: utilService.makeId(),
        subject: "Miss you!",
        body: "This is the third mail",
        isRead: true,
        sentAt: getActualDate(1651133930594),
        removedAt: null,
        from: "njdksg@rajdsft.com",
        to: USER_EMAIL,
      },
      {
        id: utilService.makeId(),
        subject: "Miss you!",
        body: "This is the third mail",
        isRead: true,
        sentAt: getActualDate(1651133930594),
        removedAt: null,
        from: "dfgsd@dfdfdt.com",
        to: USER_EMAIL,
      },
    ];

    storageService.saveToStorage(MAIL_KEY, mails);
  }
}

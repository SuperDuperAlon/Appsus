import { utilService } from "../../../services/util.service.js";
import { storageService } from "../../../services/storage.service.js";
import { asyncStorageService } from "../../../services/async-storage.service.js";

const EMAIL_KEY = "emailDB";
_createEmails();
// Email Service Demo Data

export const mailService = {
  query,
  remove,
  //   get,
  //   post,
  //   put,
};

function query() {
  const email = storageService.loadFromStorage(EMAIL_KEY);
  console.log(email);
  return new Promise((res, rej) => res(email));
}

function remove(emailId) {
    console.log(emailId);
    return asyncStorageService.remove(EMAIL_KEY, emailId)
}

function _createEmails() {
  let emails = storageService.loadFromStorage(EMAIL_KEY);
  if (!emails || !emails.length) {
    emails = [
      {
        id: "e101",
        subject: "Miss you!",
        body: "Would love to catch up sometimes",
        isRead: false,
        sentAt: 1551133930594,
        removedAt: null,
        from: "momo@momo.com",
        to: "user@appsus.com",
      },
      {
        id: "e102",
        subject: "Hello!",
        body: "This is the second email",
        isRead: false,
        sentAt: 1551133930594,
        removedAt: null,
        from: "popo@popo.com",
        to: "user@appsus.com",
      },
      {
        id: "e103",
        subject: "Miss you!",
        body: "This is the third email",
        isRead: true,
        sentAt: 1551133930594,
        removedAt: null,
        from: "jojo@rabbit.com",
        to: "user@appsus.com",
      },
    ];

    storageService.saveToStorage(EMAIL_KEY, emails);
  }
}

import { utilService } from "../../../services/util.service.js"
import { storageService } from "../../../services/storage.service.js"
import { asyncStorageService } from "../../../services/async-storage.service.js"

const MAIL_KEY = "mailDB"
const USER_EMAIL = "user@appsus.com"
_createMails()

export const mailService = {
  query,
  remove,
  getDefaultFilter,
  getTemplateMail,
  countUnreadEmails,
  get,
  post,
  put,
}

function query(filterBy = getDefaultFilter(), sortBy) {
  return asyncStorageService.query(MAIL_KEY).then((mails) => {
    if (filterBy.from) {
      const regex = new RegExp(filterBy.from, "i")
      mails = mails.filter((mail) => regex.test(mail.from))
    }
    if (filterBy.status) {
      switch (filterBy.status) {
        case "unread":
          mails = mails.filter((mail) => !mail.isRead)
          break
        case "trash":
          mails = mails.filter((mail) => mail.removedAt)
          break
        case "inbox":
          mails = mails.filter((mail) => mail.to === USER_EMAIL)
          break
        case "sent":
          mails = mails.filter((mail) => mail.from === USER_EMAIL)
          break
      }
    }
    if (filterBy.read) {
      switch (filterBy.read) {
        case "read":
          mails = mails.filter((mail) => mail.isRead)
          break
        case "unread":
          mails = mails.filter((mail) => !mail.isRead)
          break
        case "all":
          mails = mails.filter((mail) => mail)
          break
      }
    }
    if (sortBy === "from") {
      mails = mails.sort((a, b) => a.from.localeCompare(b.from))
    }
    if (sortBy === "sentAt") {
      mails = mails.sort(function (a, b) {
        return new Date(b.sentAt) - new Date(a.sentAt)
      })
    }
    return mails
  })
}

function remove(mailId) {
  return asyncStorageService.remove(MAIL_KEY, mailId)
}

function post(mail) {
  mail = { ...mail }
  mail.isRead = false
  mail.sentAt = getActualDate(Date.now())
  mail.from = USER_EMAIL
  mail.removedAt = null
  return asyncStorageService.post(MAIL_KEY, mail)
}

function put(mail) {
  return asyncStorageService.put(MAIL_KEY, mail)
}

function get(mailId) {
  return asyncStorageService.get(MAIL_KEY, mailId)
}

function getDefaultFilter() {
  return { from: "", status: "inbox", read: "all" }
}

function getTemplateMail(to = "", subject = "", body = "") {
  return { to, subject, body }
}

function getActualDate(date) {
  const dateToChange = new Date(date)
  const month = utilService.getMonthName(dateToChange).substring(0, 3)
  const day = dateToChange.getDate()
  const paddedDay = utilService.padNum(day)
  const actualDate = `${month} ${paddedDay}`
  return actualDate
}

function countUnreadEmails() {
  return asyncStorageService.query(MAIL_KEY).then((mails) => {
    const filteredMails = mails.filter(
      (mail) => !mail.isRead && mail.to === USER_EMAIL
    )
    return filteredMails
  })
}

function _createMails() {
  let mails = storageService.loadFromStorage(MAIL_KEY)
  if (!mails || !mails.length) {
    mails = [
      {
        id: utilService.makeId(),
        subject: "Miss you!",
        body: "Would love to catch up sometimes",
        isRead: false,
        sentAt: getActualDate(1651133930594),
        removedAt: true,
        from: "hayley@momo.com",
        to: USER_EMAIL,
      },
      {
        id: utilService.makeId(),
        subject: "Hello!",
        body: "This is the second mail",
        isRead: false,
        sentAt: getActualDate(1651133930594),
        removedAt: null,
        from: "theodore@popo.com",
        to: USER_EMAIL,
      },
      {
        id: utilService.makeId(),
        subject: "Miss you!",
        body: "This is the third mail",
        isRead: true,
        sentAt: getActualDate(1651133930594),
        removedAt: null,
        from: "lottie@rabbit.com",
        to: USER_EMAIL,
      },
      {
        id: utilService.makeId(),
        subject: "Miss you!",
        body: "This is the third mail",
        isRead: true,
        sentAt: getActualDate(1651133930594),
        removedAt: null,
        from: "adrian@rabbsdsdsdsit.com",
        to: USER_EMAIL,
      },
      {
        id: utilService.makeId(),
        subject: "Miss you!",
        body: "This is the third mail",
        isRead: true,
        sentAt: getActualDate(1351133930594),
        removedAt: null,
        from: "caroline@rabbsdsdsdsit.com",
        to: USER_EMAIL,
      },
      {
        id: utilService.makeId(),
        subject: "Miss you!",
        body: "This is the third mail",
        isRead: true,
        sentAt: getActualDate(1651133930594),
        removedAt: null,
        from: "sara@rajdsft.com",
        to: USER_EMAIL,
      },
      {
        id: utilService.makeId(),
        subject: "Miss you!",
        body: "This is the third mail",
        isRead: true,
        sentAt: getActualDate(1651133930594),
        removedAt: null,
        from: "hana@dfdfdt.com",
        to: USER_EMAIL,
      },
      {
        id: utilService.makeId(),
        subject: "Miss you!",
        body: "Would love to catch up sometimes",
        isRead: false,
        sentAt: getActualDate(1651133930594),
        removedAt: true,
        from: "dale@momo.com",
        to: USER_EMAIL,
      },
      {
        id: utilService.makeId(),
        subject: "Hello!",
        body: "This is the second mail",
        isRead: false,
        sentAt: getActualDate(1651133930594),
        removedAt: null,
        from: "melanie@popo.com",
        to: USER_EMAIL,
      },
      {
        id: utilService.makeId(),
        subject: "Miss you!",
        body: "This is the third mail",
        isRead: true,
        sentAt: getActualDate(1651133930594),
        removedAt: null,
        from: "hannah@rabbit.com",
        to: USER_EMAIL,
      },
      {
        id: utilService.makeId(),
        subject: "Miss you!",
        body: "This is the third mail",
        isRead: true,
        sentAt: getActualDate(1651133930594),
        removedAt: null,
        from: "daniella@rabbsdsdsdsit.com",
        to: USER_EMAIL,
      },
      {
        id: utilService.makeId(),
        subject: "Miss you!",
        body: "This is the third mail",
        isRead: true,
        sentAt: getActualDate(1351133930594),
        removedAt: null,
        from: "rosie@rabbsdsdsdsit.com",
        to: USER_EMAIL,
      },
      {
        id: utilService.makeId(),
        subject: "Miss you!",
        body: "This is the third mail",
        isRead: true,
        sentAt: getActualDate(1651133930594),
        removedAt: null,
        from: "susan@rajdsft.com",
        to: USER_EMAIL,
      },
      {
        id: utilService.makeId(),
        subject: "Miss you!",
        body: "This is the third mail",
        isRead: true,
        sentAt: getActualDate(1651133930594),
        removedAt: null,
        from: "tanya@dfdfdt.com",
        to: USER_EMAIL,
      },
      {
        id: utilService.makeId(),
        subject: "Miss you!",
        body: "Would love to catch up sometimes",
        isRead: false,
        sentAt: getActualDate(1651133930594),
        removedAt: true,
        from: "gregory@momo.com",
        to: USER_EMAIL,
      },
      {
        id: utilService.makeId(),
        subject: "Hello!",
        body: "This is the second mail",
        isRead: false,
        sentAt: getActualDate(1651133930594),
        removedAt: null,
        from: "carmen@popo.com",
        to: USER_EMAIL,
      },
      {
        id: utilService.makeId(),
        subject: "Miss you!",
        body: "This is the third mail",
        isRead: true,
        sentAt: getActualDate(1651133930594),
        removedAt: null,
        from: "timothy@rabbit.com",
        to: USER_EMAIL,
      },
      {
        id: utilService.makeId(),
        subject: "Miss you!",
        body: "This is the third mail",
        isRead: true,
        sentAt: getActualDate(1651133930594),
        removedAt: null,
        from: "rhys@rabbsdsdsdsit.com",
        to: USER_EMAIL,
      },
      {
        id: utilService.makeId(),
        subject: "Miss you!",
        body: "This is the third mail",
        isRead: true,
        sentAt: getActualDate(1351133930594),
        removedAt: null,
        from: "zakaria@rabbsdsdsdsit.com",
        to: USER_EMAIL,
      },
      {
        id: utilService.makeId(),
        subject: "Miss you!",
        body: "This is the third mail",
        isRead: true,
        sentAt: getActualDate(1651133930594),
        removedAt: null,
        from: "philip@rajdsft.com",
        to: USER_EMAIL,
      },
      {
        id: utilService.makeId(),
        subject: "Miss you!",
        body: "This is the third mail",
        isRead: true,
        sentAt: getActualDate(1651133930594),
        removedAt: null,
        from: "hugo@dfdfdt.com",
        to: USER_EMAIL,
      },
    ]

    storageService.saveToStorage(MAIL_KEY, mails)
  }
}



// {
//   id: utilService.makeId(),
//   type: "note-txt",
//   isPinned: true,
//   info: {
//       txt: "Fullstack Me Baby!"
//   },
//   style: {
//       backgroundColor: "white"
//   }
// },
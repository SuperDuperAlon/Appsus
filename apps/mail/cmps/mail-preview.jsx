const { useState, Fragment } = React

export function MailPreview({ mail, onRemoveMail, changeReadStatus }) {
  const [isExpanded, setIsExpanded] = useState(false)

  function getNameFromEmail(name) {
    const idx = name.indexOf("@")
    return name.substring(0, idx)
  }

  function setReadStatus(mailId) {
    changeReadStatus(mailId)
    setIsExpanded(!isExpanded)
  }

  function changeReadStyling() {
    if (mail.isRead) return "read"
    else return ""
  }

  return (
    <Fragment>
      <tr
        className={changeReadStyling()}
        onClick={() => {
          setReadStatus(mail.id)
        }}
      >
        <td className="mail-list-star">
          <i className="fa-regular fa-star"></i>
        </td>
        <td className="mail-list-from capitalize">
          {getNameFromEmail(`${mail.from}`)}
        </td>
        <td className="mail-title-subject">
          <span className="mail-title-bold">{mail.subject}</span> - {mail.body}
        </td>
        <td className="mail-list-delete">
          <a onClick={(ev) => onRemoveMail(mail.id, ev)}>
            <i className="fa-solid fa-trash"></i>
          </a>
        </td>
        <td className="mail-list-read">
          <a>
            <i className="fa-regular fa-envelope"></i>
          </a>
        </td>
        <td className="mail-list-date">{mail.sentAt}</td>
      </tr>
      <tr hidden={!isExpanded}>
        <td colSpan="6" className="mail-list-preview">
          <h1 className="mail-preview-subject">{mail.subject}</h1>
          <div className="mail-preview-content">
            <h4 className="mail-preview-from">
              {getNameFromEmail(`${mail.from}`)}
            </h4>
            <h6 className="mail-preview-to">to me</h6>
            <h3 className="mail-preview-body">{mail.body}</h3>
          </div>
          <button className="mail-preview-save-btn">Save to Notes</button>
        </td>
      </tr>
    </Fragment>
  )
}

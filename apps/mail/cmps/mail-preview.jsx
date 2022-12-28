const { useState, Fragment, useEffect } = React;

import { mailService } from "../services/mail.service.js";

export function MailPreview({ email }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isUnread, setIsRead] = useState('white')

useEffect

function changeReadStatus() {
    console.log('I was clicked');
}

  console.log(email);
  return (
    <Fragment>
      <tr
        onClick={() => {
          setIsExpanded(!isExpanded);
        //   changeReadStatus()
        }}
      >
        <td>🐱‍🚀</td>
        <td>{email.from}</td>
        <td>{email.subject} - {email.body}</td>
        <td><button onClick={onRemoveEmail}>🗑</button> </td>
        <td>✉</td>
        <td>Time</td>   
      </tr>
      <tr hidden={!isExpanded} bgcolor={'lightgrey'}>
        <td colSpan="6">
          <h3>Body: {email.body}</h3>
        </td>
      </tr>
    </Fragment>
  );
}

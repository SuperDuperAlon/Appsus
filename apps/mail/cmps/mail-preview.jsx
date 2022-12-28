const { useState, Fragment, useEffect } = React;

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
          changeReadStatus()
        }}
      >
        <td>🐱‍🚀</td>
        <td>Sender: {email.to}</td>
        <td>Subject: {email.subject} - {email.body}</td>
        <td>🗑</td>
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

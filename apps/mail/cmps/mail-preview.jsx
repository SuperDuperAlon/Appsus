const { useState, Fragment } = React;

export function MailPreview({ email }) {
  const [isExpanded, setIsExpanded] = useState(false);
  console.log(email);
  return (
    <Fragment>
      <tr
        onClick={() => {
          setIsExpanded(!isExpanded);
        }}
      >
        <td>🐱‍🚀</td>
        <td>Sender: {email.to}</td>
        <td>Subject: {email.subject} - {email.body}</td>
        <td>Time</td>
      </tr>
      <tr hidden={!isExpanded}>
        <td colSpan="4">
          <h3>Body: {email.body}</h3>
        </td>
      </tr>
    </Fragment>
  );
}

import {mailService} from '../services/mail.service.js'
import { MailPreview } from './mail-preview.jsx';
export function MailList({emails}) {


console.log(emails);
    return <ul className="mail-list clean-list">
        {
            emails.map(email => <li key={email.id}>
                <MailPreview mail={email} />
            </li>)
        }
    </ul>

}

const { useState, useEffect } = React;

import { MailNav } from "../cmps/mail-nav.jsx";
import { MailList } from "../cmps/mail-list.jsx";
import { MailSearchBar } from "../cmps/mail-search.jsx";

import { mailService } from "../services/mail.service.js";

export function MailIndex() {
  const [emails, setEmails] = useState([]);

  useEffect(() => {
    loadEmails();
    console.log(emails);
  }, []);

  function loadEmails() {
    mailService.query().then((emails) => setEmails(emails));
  }

  function onRemoveEmail(emailId) {
    mailService.renove(emailId).then(() => {
      const updatedEmails = emails.filter(email => email.id !== emailId)
      setCars(updatedEmails)
    })
  }

  function onRemoveCar(carId) {
    carService.remove(carId).then(() => {
        const updatedCars = cars.filter(car => car.id !== carId)
        setCars(updatedCars)
        // eventBusService.emit('show-user-msg', {txt: 'CarRemoved', type: 'success'})
        showSuccessMsg('Car removed')
    })
        .catch((err) => {
            console.log('Had issues removing', err)
            showErrorMsg('Could not remove car, try again please!')
        })
}


  if (!emails) return <h1>Loading</h1>;
  console.log(emails);
  return (
    <section className="mail-index">
      <h1>mail app</h1>
      <MailSearchBar />
      <MailNav />
      <MailList emails={emails} onRemoveEmail={onRemoveEmail} />
    </section>
  );
}

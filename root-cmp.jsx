const { Route, Routes } = ReactRouterDOM;
const Router = ReactRouterDOM.HashRouter;

import { AppHeader } from "./cmps/app-header.jsx";
import { About } from "./views/about.jsx";
import { Home } from "./views/home.jsx";
import { MailIndex } from "./apps/mail/views/mail-index.jsx";
import { NoteIndex } from "./apps/note/views/note-index.jsx";

export function App() {
  return (
    <Router>
      <section className="app">
        <AppHeader />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />

          {/* Mail Routes */}
          <Route path="/mail" element={<MailIndex />} />
            {/* <Route path="/mail/sent" element={<Sent />} />
             <Route path="/mail/starred" element={<Starred />} />
            <Route path="/mail/trash" element={<Trash />} /> */}
          
          {/* Note Routes */}
          <Route path="/note" element={<NoteIndex />} />
        </Routes>
      </section>
    </Router>
  );
}

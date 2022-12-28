import { NoteAdd } from "../cmps/note-add.jsx";
import { NoteFilter } from "../cmps/note-filter.jsx";
import { NoteList } from "../cmps/note-list.jsx";

export function NoteIndex() {
  return (
    <div>
      <NoteAdd />
      <NoteFilter />
      <NoteList />

      <div>note app</div>
    </div>
  );
}

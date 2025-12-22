// NoteContext.jsx
import React, { createContext, useState, useEffect } from "react";
import { getNotes, deleteNote, updateNote } from "../Services/noteService";

export const NoteContext = createContext();

export const NoteProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchNotes = async () => {
      const data = await getNotes();
      setNotes(data);
    };
    fetchNotes();
  }, []);

  const toggleFavorite = (id) => {
    setNotes((prev) =>
      prev.map((note) =>
        note.id === id ? { ...note, isFavorite: !note.isFavorite } : note
      )
    );
  };

  const removeNote = async (id) => {
    await deleteNote(id);
    setNotes((prev) => prev.filter((note) => note.id !== id));
  };

  return (
    <NoteContext.Provider
      value={{ notes, setNotes, toggleFavorite, removeNote }}
    >
      {children}
    </NoteContext.Provider>
  );
};

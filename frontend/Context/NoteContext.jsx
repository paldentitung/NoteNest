import React, { createContext, useState, useEffect } from "react";
import { getNotes, deleteNote, updateNote } from "../Services/noteService";

export const NoteContext = createContext();

export const NoteProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);

  useEffect(() => {
    const fetchNotes = async () => {
      const data = await getNotes();
      setNotes(data);
    };
    fetchNotes();
  }, []);

  const toggleFavorite = (id) => {
    setNotes((prev) =>
      prev
        .map((note) =>
          note.id === id ? { ...note, isFavorite: !note.isFavorite } : note
        )
        .sort((a, b) => (b.isFavorite ? 1 : 0) - (a.isFavorite ? 1 : 0))
    );
  };

  const removeNote = async (id) => {
    await deleteNote(id);
    setNotes((prev) => prev.filter((note) => note.id !== id));
  };

  const updateExistingNote = async (id, updatedNote) => {
    const updated = await updateNote(id, updatedNote);
    setNotes((prev) => prev.map((note) => (note.id === id ? updated : note)));
  };

  return (
    <NoteContext.Provider
      value={{
        notes,
        setNotes,
        showUploadForm,
        setShowUploadForm,
        selectedNote,
        setSelectedNote,
        toggleFavorite,
        removeNote,
        updateExistingNote,
      }}
    >
      {children}
    </NoteContext.Provider>
  );
};

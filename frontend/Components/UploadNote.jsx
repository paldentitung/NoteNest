import React, { useState, useEffect, useContext } from "react";
import MainButton from "./MainButton";
import SecondaryButton from "./SecondaryButton";
import toast from "react-hot-toast";
import { NoteContext } from "../Context/NoteContext";

const UploadNote = () => {
  const {
    showUploadForm,
    setShowUploadForm,
    setNotes,
    selectedNote,
    setSelectedNote,
  } = useContext(NoteContext);

  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [semester, setSemester] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);

  // Fill form when editing
  useEffect(() => {
    if (selectedNote) {
      setTitle(selectedNote.title || "");
      setSubject(selectedNote.subject || "");
      setSemester(selectedNote.semester || "");
      setDescription(selectedNote.description || "");
      setFile(null);
    }
  }, [selectedNote]);

  const resetForm = () => {
    setTitle("");
    setSubject("");
    setSemester("");
    setDescription("");
    setFile(null);
    setSelectedNote(null);
    setShowUploadForm(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !subject || !semester || !description) {
      toast.error("Enter valid info");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("subject", subject);
    formData.append("semester", semester);
    formData.append("description", description);
    if (file) formData.append("file", file);

    try {
      const url = selectedNote
        ? `http://localhost:3000/api/notes/${selectedNote.id}`
        : "http://localhost:3000/api/notes";

      const res = await fetch(url, {
        method: selectedNote ? "PUT" : "POST",
        body: formData,
      });

      const response = await res.json();
      if (!res.ok) throw new Error(response.message || "Something went wrong");

      // IMPORTANT: backend returns { message, note }
      const note = response.note ?? response;

      if (selectedNote) {
        setNotes((prev) =>
          prev.map((n) => (n.id === selectedNote.id ? note : n))
        );
        toast.success("Note updated");
      } else {
        setNotes((prev) => [note, ...prev]);
        toast.success("Note added");
      }

      resetForm();
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <section
      className={`bg-white rounded-md shadow-md flex flex-col space-y-5 transition-all duration-300
        ${
          showUploadForm
            ? "opacity-100 scale-100 h-auto p-5 mb-5"
            : "opacity-0 scale-95 h-0 overflow-hidden"
        }`}
    >
      <h2 className="text-2xl font-semibold">
        {selectedNote ? "Edit Note" : "Upload New Note"}
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="flex gap-4">
          <select
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="p-2 rounded w-full ring-2 ring-gray-400 focus:ring-blue-500"
          >
            <option value="">Select Subject</option>
            <option value="DSA">DSA</option>
            <option value="DBMS">DBMS</option>
            <option value="Math">Math</option>
            <option value="WebDev">Web Development</option>
          </select>

          <select
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
            className="p-2 rounded w-full ring-2 ring-gray-400 focus:ring-blue-500"
          >
            <option value="">Select Semester</option>
            {[1, 2, 3, 4, 5, 6].map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        <input
          type="text"
          placeholder="Note Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="p-2 rounded w-full ring-2 ring-gray-400 focus:ring-blue-500"
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          className="p-2 rounded w-full ring-2 ring-gray-400 focus:ring-blue-500"
        />

        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="p-2 rounded w-full ring-2 ring-gray-400 focus:ring-blue-500"
        />

        <div className="flex justify-end gap-2">
          <SecondaryButton title="Cancel" onClick={resetForm} />
          <MainButton
            title={selectedNote ? "Update" : "Upload"}
            type="submit"
          />
        </div>
      </form>
    </section>
  );
};

export default UploadNote;

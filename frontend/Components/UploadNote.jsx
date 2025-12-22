import React, { useState, useEffect, useContext } from "react";
import MainButton from "./MainButton";
import SecondaryButton from "./SecondaryButton";
import toast from "react-hot-toast";
import { createNote, updateNote } from "../Services/noteService";
import { NoteContext } from "../Context/NoteContext";

const UploadNote = () => {
  const {
    showUploadForm,
    setShowUploadForm,
    notes,
    setNotes,
    selectedNote,
    setSelectedNote,
  } = useContext(NoteContext);

  const [title, setTitle] = useState(selectedNote?.title || "");
  const [subject, setSubject] = useState(selectedNote?.subject || "");
  const [semester, setSemester] = useState(selectedNote?.semester || "");
  const [description, setDescription] = useState(
    selectedNote?.description || ""
  );
  const [file, setFile] = useState("");

  useEffect(() => {
    if (selectedNote) {
      setTitle(selectedNote.title || "");
      setSubject(selectedNote.subject || "");
      setSemester(selectedNote.semester || "");
      setDescription(selectedNote.description || "");
    }
  }, [selectedNote]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !subject || !semester || !description) {
      toast.error("Enter the valid info");
      return;
    }

    const newNote = {
      title,
      subject,
      semester,
      description,
      ...(file && { file }),
    };

    try {
      if (selectedNote) {
        const updated = await updateNote(selectedNote.id, newNote);
        setNotes((prev) =>
          prev.map((n) => (n.id === selectedNote.id ? updated : n))
        );
        toast.success("Note updated");
      } else {
        const created = await createNote(newNote);
        setNotes((prev) => [created, ...prev]);
        toast.success("Note added");
      }

      setShowUploadForm(false);
      setSelectedNote(null);
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    }

    setTitle("");
    setSubject("");
    setSemester("");
    setDescription("");
    setFile("");
  };

  return (
    <section
      className={`bg-white rounded-md shadow-md flex flex-col space-y-5 transition-all duration-300 transform 
        ${
          showUploadForm
            ? "opacity-100 scale-100 h-auto p-5 mb-5"
            : "opacity-0 scale-95 h-0 overflow-hidden"
        }
      `}
    >
      <h2 className="text-2xl font-semibold">Upload New Note</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="flex gap-4">
          <div className="flex-1">
            <select
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="p-2 rounded w-full outline-0 border-0 ring-2 ring-gray-400 focus:ring-mainColor"
            >
              <option value="">Select Subject</option>
              <option value="DSA">DSA</option>
              <option value="DBMS">DBMS</option>
              <option value="Math">Math</option>
              <option value="WebDev">Web Development</option>
            </select>
          </div>
          <div className="flex-1">
            <select
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
              className="p-2 rounded w-full outline-0 border-0 ring-2 ring-gray-400 focus:ring-mainColor"
            >
              <option value="">Select Semester</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
            </select>
          </div>
        </div>

        <div>
          <input
            type="text"
            placeholder="Note Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="p-2 rounded w-full outline-0 border-0 ring-2 ring-gray-400 focus:ring-mainColor"
          />
        </div>

        <div>
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="p-2 rounded w-full outline-0 border-0 ring-2 ring-gray-400 focus:ring-mainColor"
            rows={3}
          />
        </div>

        <div>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="p-2 rounded w-full outline-0 border-0 ring-2 ring-gray-400 focus:ring-mainColor"
          />
        </div>

        <div className="flex justify-end gap-2">
          <SecondaryButton
            onClick={() => setShowUploadForm(false)}
            title="cancel"
          />
          <MainButton title="Upload" type="submit" />
        </div>
      </form>
    </section>
  );
};

export default UploadNote;

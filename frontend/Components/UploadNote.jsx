import React, { useState, useEffect } from "react";
import MainButton from "./MainButton";
import SecondaryButton from "./SecondaryButton";
import toast from "react-hot-toast";
import { createNote, updateNote } from "../Services/noteService";
const UploadNote = ({ showUploadForm, setShowUploadForm, setData, data }) => {
  const [title, setTitle] = useState(data?.title || "");
  const [subject, setSubject] = useState(data?.subject || "");
  const [semester, setSemester] = useState(data?.semester || "");
  const [description, setDescription] = useState(data?.description || "");
  const [file, setFile] = useState("");
  useEffect(() => {
    if (data) {
      setTitle(data.title || "");
      setSubject(data.subject || "");
      setSemester(data.semester || "");
      setDescription(data.description || "");
    }
  }, [data]);
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
      if (data) {
        const updated = await updateNote(data.id, newNote);
        setData((prev) => prev.map((n) => (n.id === data.id ? updated : n)));
        toast.success("Note updated");
      } else {
        const created = await createNote(newNote);
        setData((prev) => [created, ...prev]);
        toast.success("Note added");
      }

      setShowUploadForm(false);
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
    <>
      <section
        className={`bg-white  rounded-md shadow-md flex flex-col space-y-5 transition-all duration-300 transform 
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
            {/* Subject Dropdown */}
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

            {/* Semester Dropdown */}
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

          {/* Note Title */}
          <div>
            <input
              type="text"
              placeholder="Note Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="p-2 rounded w-full outline-0 border-0 ring-2 ring-gray-400 focus:ring-mainColor"
            />
          </div>

          {/* Description Field */}
          <div>
            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="p-2 rounded w-full outline-0 border-0 ring-2 ring-gray-400 focus:ring-mainColor"
              rows={3}
            />
          </div>

          {/* File Upload */}
          <div>
            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              className="p-2 rounded w-full outline-0 border-0 ring-2 ring-gray-400 focus:ring-mainColor"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-2">
            <SecondaryButton
              onClick={() => setShowUploadForm(false)}
              title="cancel"
            />
            <MainButton title="Upload" type="submit" />
          </div>
        </form>
      </section>
    </>
  );
};

export default UploadNote;

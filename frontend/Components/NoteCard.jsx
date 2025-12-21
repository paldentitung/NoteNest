import { useState } from "react";
import {
  FaStar,
  FaRegStar,
  FaFilePdf,
  FaFileAlt,
  FaEdit,
  FaTrash,
  FaTimes,
} from "react-icons/fa";
import { deleteNote } from "../Services/noteService";
const NoteCard = ({ note, toggleFavorite, handleEdit, setData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const isPdf = note.fileType === "pdf";
  const fileUrl = `http://localhost:3000${note.filePath}`;
  const handleDelete = async (id) => {
    const deletedNote = await deleteNote(id);
    setData((prev) => prev.filter((note) => note.id !== id));
  };
  return (
    <>
      <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col gap-3">
        {/* Header: Subject + Actions */}
        <div className="flex justify-between items-center">
          <span className="text-sm font-semibold text-blue-600">
            {note.subject}
          </span>
          <div className="flex items-center gap-2">
            <button onClick={() => toggleFavorite(note.id)}>
              {note.isFavorite ? (
                <FaStar className="text-yellow-400 text-lg" />
              ) : (
                <FaRegStar className="text-gray-400 text-lg" />
              )}
            </button>
            <button onClick={() => handleEdit(note.id)}>
              <FaEdit className="text-blue-500 hover:text-blue-700 text-lg" />
            </button>
            <button onClick={() => handleDelete(note.id)}>
              <FaTrash className="text-red-500 hover:text-red-700 text-lg" />
            </button>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold">{note.title}</h3>

        {/* Description */}
        <p className="text-sm text-gray-600 line-clamp-3">{note.description}</p>

        {/* Footer: Semester + File Icon + View Button */}
        <div className="flex justify-between items-center mt-auto">
          <span className="text-xs text-gray-500">
            Semester {note.semester}
          </span>
          <div className="flex items-center gap-3">
            <span className="text-2xl">
              {isPdf ? (
                <FaFilePdf className="text-red-500" />
              ) : (
                <FaFileAlt className="text-gray-500" />
              )}
            </span>
            <button
              onClick={openModal}
              className="px-4 py-1.5 text-sm bg-(--mainColor) text-white rounded opacity-80 hover:opacity-100 transition-all duration-500 hover:cursor-pointer"
            >
              View
            </button>
          </div>
        </div>
      </div>

      {/* Modal for Preview */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-4xl h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-lg font-semibold">{note.title}</h3>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                <FaTimes />
              </button>
            </div>

            {/* Modal Body - PDF or Image Preview */}
            <div className="flex-1 overflow-auto bg-gray-50">
              {isPdf ? (
                <iframe
                  src={fileUrl}
                  className="w-full h-full border-0"
                  title="PDF Preview"
                />
              ) : (
                <img
                  src={fileUrl}
                  alt={note.title}
                  className="w-full h-full object-contain"
                />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NoteCard;

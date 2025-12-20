import React from "react";
import { FaStar, FaRegStar, FaFilePdf, FaFileAlt } from "react-icons/fa";

const NoteCard = ({ note, toggleFavorite }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col gap-3">
      {/* Header: Subject + Favorite */}
      <div className="flex justify-between items-center">
        <span className="text-sm font-semibold text-(--mainColor)">
          {note.subject}
        </span>
        <button onClick={() => toggleFavorite(note.id)}>
          {note.isFavorite ? (
            <FaStar className="text-yellow-400" />
          ) : (
            <FaRegStar className="text-gray-400" />
          )}
        </button>
      </div>

      {/* Title */}
      <h3 className="text-lg font-bold">{note.title}</h3>

      {/* Description */}
      <p className="text-sm text-gray-600 line-clamp-3">{note.description}</p>

      {/* Footer: Semester + File + View Button */}
      <div className="flex justify-between items-center mt-auto">
        <span className="text-xs text-gray-500">Semester {note.semester}</span>
        <div className="flex items-center gap-2">
          {/* File Icon */}
          <span className="text-xl">
            {note.fileType === "pdf" ? (
              <FaFilePdf className="text-red-500" />
            ) : (
              <FaFileAlt className="text-gray-500" />
            )}
          </span>
          {/* View Button */}
          <a
            target="_blank"
            rel="noopener noreferrer"
            className="px-2 py-1 text-xs bg-(--mainColor) text-white rounded  opacity-85 hover:cursor-pointer hover:opacity-100 transition"
          >
            View
          </a>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;

import React, { useEffect } from "react";
import NoteCard from "./NoteCard";
import { getNotes } from "../Services/noteService";
const NoteDashboard = ({ data, setData }) => {
  useEffect(() => {
    const fetchNotes = async () => {
      const notes = await getNotes();
      setData(notes);
    };
    fetchNotes();
  }, []);
  useEffect(() => {
    console.log("Updated notes:", data);
  }, [data]);

  const notesData = [
    {
      id: "1",
      title: "Binary Trees",
      subject: "DSA",
      semester: 3,
      description: "Lecture notes on Binary Trees with examples and exercises.",
      fileType: "pdf",
      isFavorite: false,
      filePath: "uploads/dsa/binary_trees.pdf",
    },
    {
      id: "2",
      title: "Sorting Algorithms",
      subject: "DSA",
      semester: 3,
      description:
        "Notes covering Bubble, Merge, Quick, and Heap Sort algorithms.",
      fileType: "pdf",
      isFavorite: true,
      filePath: "uploads/dsa/sorting_algorithms.pdf",
    },
    {
      id: "3",
      title: "Normalization",
      subject: "DBMS",
      semester: 2,
      description: "Notes on 1NF, 2NF, 3NF with examples.",
      fileType: "pdf",
      isFavorite: false,
      filePath: "uploads/dbms/normalization.pdf",
    },
    {
      id: "4",
      title: "ER Diagrams",
      subject: "DBMS",
      semester: 2,
      description: "Entity-Relationship diagrams for database design.",
      fileType: "image",
      isFavorite: true,
      filePath: "uploads/dbms/er_diagram.png",
    },
    {
      id: "5",
      title: "Derivatives & Integrals",
      subject: "Math",
      semester: 1,
      description: "Basic calculus notes covering derivatives and integrals.",
      fileType: "pdf",
      isFavorite: false,
      filePath: "uploads/math/calculus.pdf",
    },
  ];

  return (
    <section className="flex flex-col gap-7 ">
      <span className="text-2xl font-semibold">Notes Dashboard</span>
      <div className="flex gap-4 flex-wrap">
        {/* Search */}
        <div className="flex-1 ">
          <input
            type="search"
            placeholder="Search notes..."
            className="p-2 rounded w-full outline-0 border-0 ring-2 ring-gray-400 focus:ring-mainColor transition-all duration-300"
          />
        </div>

        {/* Subject Filter */}
        <div className="flex-1 ">
          <select className="py-2.5 px-2 rounded w-full outline-0 border-0 ring-2 ring-gray-400 focus:ring-mainColor transition-all duration-300">
            <option value="">All Subjects</option>
            <option value="DSA">DSA</option>
            <option value="DBMS">DBMS</option>
            <option value="Math">Math</option>
            <option value="WebDev">Web Development</option>
          </select>
        </div>

        {/* Semester Filter */}
        <div className="flex-1 ">
          <select className="py-2.5 px-2 rounded w-full outline-0 border-0 ring-2 ring-gray-400 focus:ring-mainColor transition-all duration-300">
            <option value="">All Semesters</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
        {data.map((note) => (
          <NoteCard key={note.id} note={note} />
        ))}
      </div>
    </section>
  );
};

export default NoteDashboard;

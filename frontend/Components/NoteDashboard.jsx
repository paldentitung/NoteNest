import React, { useState, useContext } from "react";
import NoteCard from "./NoteCard";
import { NoteContext } from "../Context/NoteContext";

const NoteDashboard = () => {
  const { notes } = useContext(NoteContext);
  const [searchItem, setSearchItem] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("");
  const [semester, setSemester] = useState("");

  // Filter notes based on search, subject, semester
  const filterData = notes.filter((note) => {
    if (!note || !note.title || !note.description) return false;

    const searchQuery =
      note.title.toLowerCase().includes(searchItem.toLowerCase()) ||
      note.description.toLowerCase().includes(searchItem.toLowerCase());

    const matchSubject = subjectFilter ? note.subject === subjectFilter : true;
    const matchSemester = semester ? note.semester === semester : true;

    return searchQuery && matchSubject && matchSemester;
  });

  return (
    <section className="flex flex-col gap-7">
      <span className="text-2xl font-semibold">Notes Dashboard</span>

      {/* Filters */}
      <div className="flex gap-4 flex-wrap">
        {/* Search */}
        <div className="flex-1">
          <input
            type="search"
            placeholder="Search notes..."
            value={searchItem}
            onChange={(e) => setSearchItem(e.target.value)}
            className="p-2 rounded w-full outline-0 border-0 ring-2 ring-gray-400 focus:ring-mainColor transition-all duration-300"
          />
        </div>

        {/* Subject Filter */}
        <div className="flex-1">
          <select
            value={subjectFilter}
            onChange={(e) => setSubjectFilter(e.target.value)}
            className="py-2.5 px-2 rounded w-full outline-0 border-0 ring-2 ring-gray-400 focus:ring-mainColor transition-all duration-300"
          >
            <option value="">All Subjects</option>
            <option value="DSA">DSA</option>
            <option value="DBMS">DBMS</option>
            <option value="Math">Math</option>
            <option value="WebDev">Web Development</option>
          </select>
        </div>

        {/* Semester Filter */}
        <div className="flex-1">
          <select
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
            className="py-2.5 px-2 rounded w-full outline-0 border-0 ring-2 ring-gray-400 focus:ring-mainColor transition-all duration-300"
          >
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

      {/* Notes Grid */}
      {filterData.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filterData.map((note) => (
            <NoteCard key={note.id} note={note} />
          ))}
        </div>
      ) : (
        <p className="text-2xl text-red-600 text-center">No Notes Found</p>
      )}
    </section>
  );
};

export default NoteDashboard;

import React from "react";
import MainButton from "./MainButton";
const Header = ({ showUploadForm, setShowUploadForm }) => {
  return (
    <header className="bg-(--mainColor) text-white">
      <div className="flex justify-between  items-center w-full max-w-6xl mx-auto p-4 ">
        <h1 className="text-2xl font-bold">NoteNest</h1>
        <MainButton
          title="Add Task"
          onClick={() => setShowUploadForm(!showUploadForm)}
        />
      </div>
    </header>
  );
};

export default Header;

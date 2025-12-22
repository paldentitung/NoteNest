import React, { useContext } from "react";
import MainButton from "./MainButton";
import { NoteContext } from "../Context/NoteContext";
const Header = () => {
  const { setShowUploadForm, showUploadForm } = useContext(NoteContext);
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

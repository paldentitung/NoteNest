import React from "react";
import Header from "../Components/Header";
import UploadNote from "../Components/UploadNote";
import NoteDashboard from "../Components/NoteDashboard";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Toaster position="top-right" />
      <Header />
      <div className="w-full max-w-6xl mx-auto p-4 flex flex-col">
        <UploadNote />
        <NoteDashboard />
      </div>
    </div>
  );
};

export default App;

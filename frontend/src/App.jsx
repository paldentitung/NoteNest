import React from "react";
import Header from "../Components/Header";
import UploadNote from "../Components/UploadNote";
const App = () => {
  return (
    <div className="bg-gray-50">
      <Header />
      <div className="w-full max-w-6xl mx-auto p-4">
        <UploadNote />
      </div>
    </div>
  );
};

export default App;

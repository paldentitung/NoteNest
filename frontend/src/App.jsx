import React, { use, useState } from "react";
import Header from "../Components/Header";
import UploadNote from "../Components/UploadNote";
import NoteDashboard from "../Components/NoteDashboard";
const App = () => {
  const [showUploadForm, setShowUploadForm] = useState(false);
  return (
    <div className="bg-gray-50 min-h-screen">
      <Header
        showUploadForm={showUploadForm}
        setShowUploadForm={setShowUploadForm}
      />
      <div className="w-full max-w-6xl mx-auto p-4 flex flex-col ">
        <UploadNote
          showUploadForm={showUploadForm}
          setShowUploadForm={setShowUploadForm}
        />
        <NoteDashboard />
      </div>
    </div>
  );
};

export default App;

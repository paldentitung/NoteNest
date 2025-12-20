import React, { use, useState } from "react";
import Header from "../Components/Header";
import UploadNote from "../Components/UploadNote";
const App = () => {
  const [showUploadForm, setShowUploadForm] = useState(false);
  return (
    <div className="bg-gray-50">
      <Header
        showUploadForm={showUploadForm}
        setShowUploadForm={setShowUploadForm}
      />
      <div className="w-full max-w-6xl mx-auto p-4">
        <UploadNote
          showUploadForm={showUploadForm}
          setShowUploadForm={setShowUploadForm}
        />
      </div>
    </div>
  );
};

export default App;

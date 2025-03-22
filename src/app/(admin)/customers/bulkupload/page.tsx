
"use client";
import { useState } from "react";

const BulkUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");
  const [successCount, setSuccessCount] = useState<number>(0);
  const [duplicatesCount, setDuplicatesCount] = useState<number>(0);
  const [errorCount, setErrorCount] = useState<number>(0);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage("Please select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:3001/customers/bulk-upload", {
        method: "POST",
        headers: {
        },
        body: formData,
      });

      const data = await response.json();  
      if (response.ok) {
        setSuccessCount(data.success);
        setDuplicatesCount(data.duplicates);
        setErrorCount(data.errors);
        setMessage("Successfully Uploaded!");
      } else {
        setMessage(`Upload failed: ${data.message}`);
      }
    } catch (error) {
      setMessage("Upload failed. Please try again.");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Bulk Upload Customers</h2>
      
      <input 
        type="file"
        accept=".csv"
        onChange={handleFileChange}
        className="mb-4 border p-2"
      />
      
      <button 
        onClick={handleUpload}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Upload
      </button>

      {message && (
        <div className="mt-4 p-4 rounded-lg border border-gray-300 shadow-lg">
          <p className="font-semibold text-xl text-green-600">{message}</p>
          {message === "Successfully Uploaded!" && (
            <div className="mt-2 text-lg">
              <p className="text-black-600">Success: {successCount}</p>
              <p className="text-black-500">Duplicates: {duplicatesCount}</p>
              <p className="text-black-500">Errors: {errorCount}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BulkUpload;

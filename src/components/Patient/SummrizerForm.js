import React, { useState } from "react";
import axios from "axios";
import SummarizedText from "./SummarizedText";
// import "../../assets/css/output.css";
// import "tailwindcss/index.css";

export default function Form() {
  const [file, setFile] = useState(null);
  const [summary, setSummary] = useState("");

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      setFile({
        file: selectedFile, // Store actual file object
        name: selectedFile.name,
        size: (selectedFile.size / 1024).toFixed(2) + " KB",
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission

    if (!file) {
      alert("Please select a file first!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file.file); // ✅ Send actual file

    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/summarize",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      setSummary(response.data.summary); // ✅ Store the summary
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Failed to upload file. Check server logs.");
    }
  };

  return (
    <div className="container mt-4">
      <div className="card shadow-lg rounded-3 overflow-hidden border border-secondary">
        {/* Header */}
        <div className="card-header bg-primary text-white text-center py-3">
          <h1 className="h4">Choose the file to summarize</h1>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="card-body">
          <div className="d-flex flex-column align-items-center mb-3">
            <label htmlFor="file" className="text-muted font-weight-semibold">
              Upload File
            </label>

            {/* Custom File Input Button */}
            <label
              htmlFor="file"
              className="btn btn-success text-white px-4 py-2 rounded shadow-md hover:bg-success"
            >
              Choose File
            </label>

            <input
              type="file"
              id="file"
              className="d-none"
              onChange={handleFileChange}
            />

            {/* Display File Name & Size */}
            {file && (
              <div className="text-muted text-sm mt-2 mb-2">
                <p>
                  <strong>File:</strong> {file.name}
                  <hr />
                  <strong>Size:</strong> {file.size}
                </p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="card-footer bg-primary text-center">
            <button type="submit" className="btn btn-success mx-2">
              Submit
            </button>
            <button
              type="button"
              className="btn btn-outline-danger"
              onClick={() => setFile(null)}
            >
              Cancel
            </button>
          </div>
        </form>

        {/* Display Summarized Text */}
        {summary && (
          <div className="card-body d-flex justify-content-center align-items-center">
            <SummarizedText text={summary} />
          </div>
        )}
      </div>
    </div>
  );
}

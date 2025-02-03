import React from "react";
// import "../../assets/css/output.css";
// import "tailwindcss/index.css";

const SummarizedText = ({ text }) => {
  return (
    <div className="card shadow-lg rounded-3 overflow-hidden border border-secondary mt-4">
      {/* Header */}
      <div className="card-header bg-secondary text-white text-center py-3">
        <h2 className="h5">Summarized Text</h2>
      </div>

      {/* Body */}
      <div className="card-body text-muted">
        {text ? (
          <p className="lead">{text}</p>
        ) : (
          <p className="text-center text-muted italic">No summary available</p>
        )}
      </div>
    </div>
  );
};

export default SummarizedText;

import React, { useState } from "react";
import { jsPDF } from "jspdf";
import "bootstrap/dist/css/bootstrap.min.css";

function PrescriptionGenerator() {
  const [medicines, setMedicines] = useState([]);
  const [medicineName, setMedicineName] = useState("");
  const [dosage, setDosage] = useState("");
  const [email, setEmail] = useState("");

  // Add medicine
  const addMedicine = () => {
    if (medicineName && dosage) {
      setMedicines([...medicines, { name: medicineName, dosage }]);
      setMedicineName("");
      setDosage("");
    }
  };

  // Remove medicine
  const removeMedicine = (index) => {
    setMedicines(medicines.filter((_, i) => i !== index));
  };

  // Generate PDF
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text("Prescription", 20, 20);
    medicines.forEach((med, index) => {
      doc.text(`${index + 1}. ${med.name} - ${med.dosage}`, 20, 30 + index * 10);
    });
    doc.save("prescription.pdf");
  };

  // Send email (mocked function for simplicity)
  const sendEmail = () => {
    if (!email) {
      alert("Please enter an email address.");
      return;
    }
    generatePDF();
    alert(`Prescription sent to ${email} (Email functionality to be implemented).`);
  };

  return (
    <div className="container my-4">
      <h2 className="text-center mb-4">Prescription Generator</h2>

      {/* Add Medicine Form */}
      <div className="card border-0 shadow-lg p-4 mb-4">
        <div className="row g-3">
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="Medicine Name"
              value={medicineName}
              onChange={(e) => setMedicineName(e.target.value)}
            />
          </div>
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="Dosage (e.g., 1-0-1)"
              value={dosage}
              onChange={(e) => setDosage(e.target.value)}
            />
          </div>
          <div className="col-md-4">
            <button
              className="btn btn-primary w-100"
              onClick={addMedicine}
              disabled={!medicineName || !dosage}
            >
              Add Medicine
            </button>
          </div>
        </div>
      </div>

      {/* Medicine List */}
      <div className="card border-0 shadow-lg p-4 mb-4">
        <h5 className="mb-3">Added Medicines</h5>
        {medicines.length > 0 ? (
          <table className="table table-striped">
            <thead>
              <tr>
                <th>#</th>
                <th>Medicine</th>
                <th>Dosage</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {medicines.map((med, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{med.name}</td>
                  <td>{med.dosage}</td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => removeMedicine(index)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-muted">No medicines added yet.</p>
        )}
      </div>

      {/* Email Form */}
      <div className="card border-0 shadow-lg p-4">
        <div className="row g-3">
          <div className="col-md-9">
            <input
              type="email"
              className="form-control"
              placeholder="Patient's Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="col-md-3 text-center">
            <button
              className="btn btn-success w-100"
              onClick={sendEmail}
              disabled={medicines.length === 0 || !email}
            >
              Send Prescription
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PrescriptionGenerator;

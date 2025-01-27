import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import Select from 'react-select';
import jsPDF from 'jspdf';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from "../../assets/img/doctor_pfp.png"

const medicinesList = [
  { 
    value: 'Paracetamol', 
    label: 'Paracetamol', 
    description: 'Pain reliever and fever reducer', 
    dose: '500mg', 
    timing: 'Morning', 
    frequency: 'Once a day', 
    duration: '5 days' 
  },
  { 
    value: 'Ibuprofen', 
    label: 'Ibuprofen', 
    description: 'Anti-inflammatory and pain reliever', 
    dose: '200mg', 
    timing: 'Evening', 
    frequency: 'Twice a day', 
    duration: '7 days' 
  },
  { 
    value: 'Amoxicillin', 
    label: 'Amoxicillin', 
    description: 'Antibiotic for bacterial infections', 
    dose: '250mg', 
    timing: 'After meals', 
    frequency: 'Thrice a day', 
    duration: '10 days' 
  },
  { 
    value: 'Cetirizine', 
    label: 'Cetirizine', 
    description: 'Antihistamine for allergies', 
    dose: '10mg', 
    timing: 'Night', 
    frequency: 'Once a day', 
    duration: '3 days' 
  }
];

const PrescriptionGenerator = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedMedicines, setSelectedMedicines] = useState([]);
  const [patientName, setPatientName] = useState('');

  // Handle PDF generation

  const generatePDF = () => {
    const doc = new jsPDF();
    const patientPhone = "+1234567890";
    const patientID = "P12345";
    const visitDate = new Date().toLocaleDateString();
    const visitNumber = 5;
    const doctorAdvice = "Follow a healthy diet and stay hydrated.";
    const nextVisit = "2 weeks";
  
    // Header Section
    const logoWidth = 30;
    const logoHeight = 30;
    if (logo) {
      doc.addImage(logo, 'PNG', 10, 10, logoWidth, logoHeight); // Doctor's Logo
    }
  
    // Hospital Name
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.text('Your Hospital Name', 50, 15);
  
    // Doctor Information
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);
    doc.text('Dr. John Doe', 50, 25);
    doc.text('Contact: +1234567890', 50, 30);
    doc.text('Email: doctor@example.com', 50, 35);
    doc.text('Clinic Contact: +0987654321', 50, 40);
  
    // Line Separator
    doc.setLineWidth(0.5);
    doc.line(10, 45, doc.internal.pageSize.getWidth() - 10, 45);
  
    // Patient Information Section
    doc.setFont('helvetica', 'bold');
    doc.text('Patient Information', 10, 55);
    doc.setFont('helvetica', 'normal');
    doc.text(`Name: ${patientName || 'N/A'}`, 10, 60);
    doc.text(`Phone: ${patientPhone}`, 10, 65);
    doc.text(`ID: ${patientID}`, 10, 70);
    doc.text(`Date: ${visitDate}`, 10, 75);
    doc.text(`#Visit: ${visitNumber}`, 10, 80);
  
    // Line Separator
    doc.line(10, 85, doc.internal.pageSize.getWidth() - 10, 85);
  
    // Medicines Section
    let yOffset = 95;
    doc.setFont('helvetica', 'bold');
    doc.text('Medicines Prescribed', 10, yOffset);
    yOffset += 10;
  
    // Table Header
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text('Medicine', 10, yOffset);
    doc.text('Dose', 60, yOffset);
    doc.text('Timing', 90, yOffset);
    doc.text('Frequency', 120, yOffset);
    doc.text('Duration', 150, yOffset);
    yOffset += 5;
  
    // Medicines Data
    doc.setFont('helvetica', 'normal');
    if (selectedMedicines.length > 0) {
      selectedMedicines.forEach((medicine) => {
        doc.text(medicine.label || 'N/A', 10, yOffset);
        doc.text(medicine.dose || 'N/A', 60, yOffset);
        doc.text(medicine.timing || 'N/A', 90, yOffset);
        doc.text(medicine.frequency || 'N/A', 120, yOffset);
        doc.text(medicine.duration || 'N/A', 150, yOffset);
        yOffset += 6;
  
        // If yOffset exceeds page height, add a new page
        if (yOffset > 270) {
          doc.addPage();
          yOffset = 20;
        }
      });
    } else {
      doc.text('No medicines prescribed.', 10, yOffset);
      yOffset += 10;
    }
  
    // Advice Section
    yOffset += 10;
    doc.setFont('helvetica', 'bold');
    doc.text('Advice:', 10, yOffset);
    doc.setFont('helvetica', 'normal');
    yOffset += 5;
    doc.text(doctorAdvice, 10, yOffset);
  
    // Line Separator
    yOffset += 10;
    doc.line(10, yOffset, doc.internal.pageSize.getWidth() - 10, yOffset);
  
    // Footer Section
    yOffset += 10;
    doc.setFont('helvetica', 'bold');
    doc.text('Follow-Up Details', 10, yOffset);
    doc.setFont('helvetica', 'normal');
    yOffset += 5;
    doc.text(`Next Visit: ${nextVisit}`, 10, yOffset);
  
    yOffset += 10;
    doc.setFont('helvetica', 'italic');
    doc.text('Powered by Your System Name', 10, yOffset);
  
    // Save the PDF
    doc.save('prescription.pdf');
  };
  

  return (
    <div className="container mt-5">
      <h2>Prescription Generator</h2>
      <Button variant="primary" onClick={() => setShowModal(true)}>
        Open Prescription Dialog
      </Button>

      {/* Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Generate Prescription</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Patient Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter patient name"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Select Medicines</Form.Label>
              <Select
                isMulti
                options={medicinesList}
                onChange={(selectedOptions) => setSelectedMedicines(selectedOptions)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button
            variant="success"
            onClick={() => {
              setShowModal(false);
              generatePDF();
            }}
          >
            Generate PDF
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default PrescriptionGenerator;

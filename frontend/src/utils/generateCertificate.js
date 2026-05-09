import { jsPDF } from "jspdf";

export const generateCertificate = (userName, courseName) => {
  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4'
  });

  // Certificate Border
  doc.setLineWidth(5);
  doc.setDrawColor(2, 48, 71); // #023047 (Dark Blue)
  doc.rect(5, 5, 287, 200);

  doc.setLineWidth(1);
  doc.setDrawColor(33, 158, 188); // #219ebc (Light Blue)
  doc.rect(10, 10, 277, 190);

  // Background Design (Subtle)
  doc.setFillColor(248, 249, 250);
  doc.rect(11, 11, 275, 188, 'F');

  // Title
  doc.setTextColor(2, 48, 71);
  doc.setFontSize(40);
  doc.setFont("helvetica", "bold");
  doc.text("CERTIFICATE OF COMPLETION", 148.5, 50, { align: "center" });

  // Subtitle
  doc.setFontSize(16);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(100, 100, 100);
  doc.text("This is to certify that", 148.5, 75, { align: "center" });

  // User Name
  doc.setTextColor(33, 158, 188);
  doc.setFontSize(32);
  doc.setFont("helvetica", "bolditalic");
  doc.text(userName.toUpperCase(), 148.5, 95, { align: "center" });

  // Line
  doc.setDrawColor(200, 200, 200);
  doc.line(70, 100, 227, 100);

  // Content
  doc.setTextColor(100, 100, 100);
  doc.setFontSize(16);
  doc.setFont("helvetica", "normal");
  doc.text("has successfully completed the course", 148.5, 115, { align: "center" });

  // Course Name
  doc.setTextColor(2, 48, 71);
  doc.setFontSize(24);
  doc.setFont("helvetica", "bold");
  doc.text(courseName, 148.5, 135, { align: "center" });

  // Date
  const date = new Date().toLocaleDateString();
  doc.setFontSize(12);
  doc.setTextColor(150, 150, 150);
  doc.text(`Date: ${date}`, 148.5, 155, { align: "center" });

  // Footer Signature Line
  doc.setDrawColor(200, 200, 200);
  doc.line(110, 180, 187, 180);
  doc.text("LMS AI Academy", 148.5, 188, { align: "center" });

  // Save the PDF
  doc.save(`${userName.replace(/\s+/g, '_')}_Certificate.pdf`);
};

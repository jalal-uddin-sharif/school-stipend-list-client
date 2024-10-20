import { useImperativeHandle, forwardRef } from "react";
import { Container, Table, TableCaption, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr, Button } from "@chakra-ui/react";
import jsPDF from "jspdf";
import "jspdf-autotable";

const App = forwardRef((props, ref) => {
  // Sample fake data for 40 students
  const fakeData = props.paymentData; // Use passed paymentData as fakeData

  const downloadPDF = () => {
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    // Add a title
    doc.text("Goverment Stipend - 2024", 105, 10, null, null, "center");


    // Create the table with borders, centered alignment, and pagination
    doc.autoTable({
      head: [["Si", "Student", "Class", "Roll", "Section", "Status"]],
      body: fakeData.map((student, idx) => [
        idx+1,
        student.name,
        student.class,
        student.roll,
        student.section,
        student.status,
      ]),
      theme: "grid",
      headStyles: { fillColor: [0, 128, 128] },
      styles: {
        halign: "center",
        valign: "middle",
        tableLineColor: [0, 0, 0],
        tableLineWidth: 0.1,
      },
      margin: { top: 20 },
      startY: 20,
      pageBreak: "auto",
    });

    // Save the PDF
    doc.save("student_table.pdf");
  };

  // Expose the downloadPDF function to the parent component
  useImperativeHandle(ref, () => ({
    downloadPDF,
  }));

  return null; // Do not render anything
});

export default App;

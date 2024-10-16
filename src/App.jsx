import { useState } from "react";
import "./App.css";
import {
  Container,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
  Button,
} from "@chakra-ui/react";
import jsPDF from "jspdf";
import "jspdf-autotable";

function App() {
  // Sample fake data for 40 students
  const fakeData = Array.from({ length: 40 }, (_, index) => ({
    id: index + 1,
    name: `Student ${index + 1}`,
    roll: 100 + index,
    section: ["A", "B", "C"][(index % 3)],
    status: index % 2 === 0 ? "Paid" : "Unpaid",
  }));

  // Function to generate PDF with A4 size and pagination
  const downloadPDF = () => {
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4", // Set paper size to A4
    });

    // Add a title
    doc.text("Student Information", 105, 10, null, null, "center");

    // Create the table with borders, centered alignment, and pagination
    doc.autoTable({
      head: [["Si", "Student", "Roll", "Section", "Status"]],
      body: fakeData.map((student) => [
        student.id,
        student.name,
        student.roll,
        student.section,
        student.status,
      ]),
      theme: "grid", // Adds borders to table
      headStyles: { fillColor: [0, 128, 128] }, // Teal color for the header
      styles: {
        halign: "center", // Center align text horizontally
        valign: "middle", // Vertically align text in the middle
        tableLineColor: [0, 0, 0], // Black border lines
        tableLineWidth: 0.1,
      },
      margin: { top: 20 },
      startY: 20,
      pageBreak: "auto", // Automatically breaks into multiple pages
    });

    // Save the PDF
    doc.save("student_table.pdf");
  };

  return (
    <Container maxW="container.sm" bg="gray.100">
      <TableContainer>
        <Table id="table-to-pdf" variant="striped" colorScheme="teal" size={"sm"}>
          <TableCaption>Student Information</TableCaption>
          <Thead>
            <Tr>
              <Th>Si</Th>
              <Th>Student</Th>
              <Th>Roll</Th>
              <Th>Section</Th>
              <Th>Status</Th>
            </Tr>
          </Thead>
          <Tbody>
            {fakeData.map((student) => (
              <Tr key={student.id}>
                <Td>{student.id}</Td>
                <Td>{student.name}</Td>
                <Td>{student.roll}</Td>
                <Td>{student.section}</Td>
                <Td>{student.status}</Td>
              </Tr>
            ))}
          </Tbody>
          <Tfoot>
            <Tr>
              <Th>Si</Th>
              <Th>Student</Th>
              <Th>Roll</Th>
              <Th>Section</Th>
              <Th>Status</Th>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
      <Button onClick={downloadPDF} >Download as Pdf</Button>
    </Container>
  );
}

export default App;

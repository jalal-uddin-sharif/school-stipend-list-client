import React, { useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Button,
} from "@chakra-ui/react";
import useAxiosSecure from "./useAxiosSecure";
import Swal from "sweetalert2";
import UpdateData from "../Dashboard/UpdateData/UpdateData";

const StudentPaymentTable = ({ data, refetch }) => {
  const axiosSecure = useAxiosSecure();
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEdit = (student) => {
    setSelectedStudent(student); // Set the student to be edited
    setIsModalOpen(true); // Open the modal
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await axiosSecure.delete(`/delete-data/${id}`);
        if (response.data.deletedCount > 0) {
          Swal.fire({
            title: "Deleted!",
            text: "Students payment data has been deleted.",
            icon: "success",
          });
          refetch(); // Refetch the data after deletion
        }
      }
    });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close the modal after editing
    setSelectedStudent(null); // Clear the selected student
  };

  return (
    <TableContainer borderWidth="1px" borderColor="gray.200" borderRadius="md">
      <Table size="sm">
        <Thead>
          <Tr>
            <Th>Si</Th>
            <Th>Name</Th>
            <Th>Class</Th>
            <Th>Roll</Th>
            <Th>Section</Th>
            <Th>Status</Th>
            <Th>Terms</Th>
            <Th>Edit</Th>
            <Th>Delete</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data?.map((student, index) => (
            <Tr key={index}>
              <Td>{index + 1}</Td> {/* Serial Number */}
              <Td>{student.name}</Td> {/* Name */}
              <Td>{student.class}</Td> {/* Class */}
              <Td>{student.roll}</Td> {/* Roll */}
              <Td>{student.section}</Td> {/* Section */}
              <Td>{student.status}</Td> {/* Status */}
              <Td>{student.terms}</Td> {/* Terms */}
              <Td>
                <Button
                  colorScheme="blue"
                  size="xs"
                  onClick={() => handleEdit(student)}
                >
                  Edit
                </Button>
              </Td>
              <Td>
                <Button
                  colorScheme="red"
                  size="xs"
                  onClick={() => handleDelete(student._id)}
                >
                  Delete
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      {/* Modal for Editing */}
      {selectedStudent && (
        <UpdateData
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          initialData={selectedStudent}
          refetch={refetch}
        />
      )}
    </TableContainer>
  );
};

export default StudentPaymentTable;

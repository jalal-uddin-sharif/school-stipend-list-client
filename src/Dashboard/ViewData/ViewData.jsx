import React, { useState, useRef } from "react"; // Import necessary hooks
import { Box, Button, FormControl, FormLabel, Select, Radio, RadioGroup, HStack, Grid, GridItem } from "@chakra-ui/react";
import useAxiosSecure from "../../CustomHook/useAxiosSecure";
import StudentPaymentTable from "../../CustomHook/StudentPaymentTable";
import { useQuery } from "@tanstack/react-query";
import App from "../../App";

const ViewData = () => {
  const axiosSecure = useAxiosSecure();
  const [formData, setFormData] = useState({
    class: "",
    terms: "",
    section: "All",
    status: "All",
  });

  const [paymentData, setPaymentData] = useState([]);
  const appRef = useRef(); // Create a ref to access App's functions

  const {data, refetch } = useQuery({
    queryKey: ["students-payment"],
    queryFn: async () => {
      try {
        const response = await axiosSecure("/all-payments-data");
        setPaymentData(response.data);
        return response.data
      } catch (err) {
        throw new Error(
          err.response?.data?.message || "Failed to fetch date and time."
        );
      }
    },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleRadioChange = (name, value) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const queryString = new URLSearchParams(formData).toString();
    setPaymentData([]);
    try {
      const response = await axiosSecure.get(`/students-payment?${queryString}`);
      setPaymentData(response.data);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  const handleDownload = () => {
    if (appRef.current) {
      appRef.current.downloadPDF(); // Call the download function
    }
  };

  return (
    <Box maxW="7xl" mx="auto" mt="5">
      <form onSubmit={handleSubmit}>
        <Grid templateColumns="repeat(4, 1fr)" gap={6}>
          <GridItem w="100%">
            <FormControl isRequired>
              <FormLabel>Terms</FormLabel>
              <Select
                placeholder="Select Terms"
                name="terms"
                value={formData.terms}
                onChange={handleInputChange}
              >
                <option>1</option>
                <option>2</option>
                <option>3</option>
              </Select>
            </FormControl>
          </GridItem>
          <GridItem w="100%">
            <FormControl isRequired>
              <FormLabel>Class</FormLabel>
              <Select
                placeholder="Select Class"
                name="class"
                value={formData.class}
                onChange={handleInputChange}
              >
                <option>Class 6</option>
                <option>Class 7</option>
                <option>Class 8</option>
                <option>Class 9</option>
                <option>Class 10</option>
              </Select>
            </FormControl>
          </GridItem>
          <GridItem w="100%">
            <FormControl isRequired as="fieldset">
              <FormLabel as="legend">Section</FormLabel>
              <RadioGroup
                borderWidth="1px"
                borderColor="gray.200"
                borderStyle="solid"
                p="2"
                rounded={"lg"}
                name="section"
                value={formData.section}
                onChange={(value) => handleRadioChange("section", value)}
              >
                <HStack spacing="24px">
                  <Radio value="All">All</Radio>
                  <Radio value="A">A</Radio>
                  <Radio value="B">B</Radio>
                </HStack>
              </RadioGroup>
            </FormControl>
          </GridItem>
          <GridItem w="100%">
            <FormControl isRequired as="fieldset">
              <FormLabel as="legend">Status</FormLabel>
              <RadioGroup
                borderWidth="1px"
                borderColor="gray.200"
                borderStyle="solid"
                p="2"
                rounded={"lg"}
                name="status"
                value={formData.status}
                onChange={(value) => handleRadioChange("status", value)}
              >
                <HStack spacing="24px">
                  <Radio value="All">All</Radio>
                  <Radio value="paid">Paid</Radio>
                  <Radio value="unpaid">Unpaid</Radio>
                </HStack>
              </RadioGroup>
            </FormControl>
          </GridItem>
        </Grid>
        <Box display="flex" justifyContent="center" my={6}>
          <Button type="submit" colorScheme="blue" mt={4} width="lg">
            Submit
          </Button>
        </Box>
      </form>

      <Box mt={6}>
        <StudentPaymentTable refetch={refetch} data={paymentData}  />
      </Box>
      <Box>
      <Button colorScheme="green" mt={4} ml={4} onClick={handleDownload}>
            Download as PDF
          </Button>
      </Box>

      {/* Render App component for download but do not display it */}
      <App ref={appRef} paymentData={paymentData}  />
    </Box>
  );
};

export default ViewData;

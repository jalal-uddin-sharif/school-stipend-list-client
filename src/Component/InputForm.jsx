import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  VStack,
  Radio,
  RadioGroup,
  Stack,
  NumberInput,
  NumberInputField,
  HStack,
  NumberDecrementStepper,
  NumberInputStepper,
  NumberIncrementStepper,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import React, { useState } from "react";
import useDateTime from "../CustomHook/useDateTime";
import useAxiosSecure from "../CustomHook/useAxiosSecure";
import { toast } from "react-toastify";
import useTotalStudentPaymentData from "../CustomHook/useTotalStudentPaymentData";

const InputForm = () => {
  const {data:totalStudentPayment, refetch} = useTotalStudentPaymentData()
  const { data } = useDateTime();
  const axiosSecure = useAxiosSecure();
  // State management for each form field
  const [formData, setFormData] = useState({
    class: "",
    terms: "",
    roll: "",
    section: "", // Default value for RadioGroup
    name: "",
    amount: "",
    status: "", // Default value for RadioGroup
    dateTime: "",
  });

  // Handle input changes for text/select inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle number input changes (Roll and Amount)
  const handleNumberChange = (name, value) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle changes for RadioGroup (Section and Status)
  const handleRadioChange = (name, value) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedFormData = {
      ...formData,
      dateTime: data?.dateTime,
    };

    try {
      const result = await axiosSecure.post(
        `/students-payment`,
        updatedFormData
      );

      // Check if data was inserted successfully
      if (result.data.insertedId) {
        toast.success("Successfully added data");
        // Assuming successful submission, clear only the "Roll" field
    setFormData((prevState) => ({
      ...prevState,
      roll: "",
      name: "",
    }))
        refetch()
      } else {
        toast.error("Failed to add data");
      }
    } catch (error) {
      // Check if the error has a response from the server (e.g., 400 Bad Request)
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message); // Show server error message in toast
      } else {
        toast.error("An unexpected error occurred"); // Handle any other unexpected errors
      }
    }

    
  };

  return (
    <Box maxW="7xl" mx="auto" mt="5">
      <form onSubmit={handleSubmit}>
        {/* Using SimpleGrid to ensure 3 fields per row */}
        <Grid templateColumns="repeat(3, 1fr)" gap={6}>
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
                  <Radio value="A">A</Radio>
                  <Radio value="B">B</Radio>
                </HStack>
              </RadioGroup>
            </FormControl>
          </GridItem>

          <GridItem w="100%">
            <FormControl isRequired>
              <FormLabel>Amount</FormLabel>
              <NumberInput
                value={formData.amount}
                onChange={(value) => handleNumberChange("amount", value)}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
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
                  <Radio value="paid">Paid</Radio>
                  <Radio value="unpaid">Unpaid</Radio>
                </HStack>
              </RadioGroup>
            </FormControl>
          </GridItem>

          <GridItem w="100%">
            <FormControl colSpan>
              <FormLabel>Date</FormLabel>
              <Input
                defaultValue={data?.date}
                isDisabled
                placeholder="Enter Student's Name"
                name="name"
                value={data?.date || "Loading...."}
              />
            </FormControl>
          </GridItem>

          <GridItem w="100%" colSpan={2}>
            <FormControl isRequired>
              <FormLabel>Student's Name</FormLabel>
              <Input
                placeholder="Enter Student's Name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </FormControl>
          </GridItem>

          <GridItem w="100%">
            <FormControl isRequired>
              <FormLabel>Roll</FormLabel>
              <NumberInput
                value={formData.roll}
                onChange={(value) => handleNumberChange("roll", value)}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>
          </GridItem>
        </Grid>
        {/* Add submit button */}
        <Box display={'flex'} justifyContent={"center"}>
          <Box my="8">
            <Button type="submit" colorScheme="blue" mt={4} width="lg">
              Submit ({totalStudentPayment?.length})
            </Button>
            
          </Box>
         
        </Box>
      </form>
    </Box>
  );
};

export default InputForm;

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
  SimpleGrid,
  NumberDecrementStepper,
  NumberInputStepper,
  NumberIncrementStepper,
} from "@chakra-ui/react";
import React, { useState } from "react";
import useDateTime from "../CustomHook/useDateTime";

const InputForm = () => {
  const {data} = useDateTime()
  console.log(data);
  // State management for each form field
  const [formData, setFormData] = useState({
    class: "",
    roll: "",
    section: "", // Default value for RadioGroup
    name: "",
    amount: "",
    status: "", // Default value for RadioGroup
    dateTime: ""
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

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedFormData = {
      ...formData, dateTime: data?.dateTime
    }
    // Now, formData contains all the form values
    console.log(updatedFormData);

    // Assuming successful submission, clear only the "Roll" field
    setFormData((prevState) => ({
      ...prevState,
      roll: "",
      name: "", // Reset the roll value
    }));
  };

  return (
    <Box maxW="7xl" mx="auto" mt="5">
      <form onSubmit={handleSubmit}>
        {/* Using SimpleGrid to ensure 3 fields per row */}
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
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

          <FormControl isRequired>
            <FormLabel>Amount</FormLabel>
            <NumberInput
              max={1000}
              min={10}
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


          <FormControl isRequired>
            <FormLabel>Student's Name</FormLabel>
            <Input
              placeholder="Enter Student's Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Roll</FormLabel>
            <NumberInput
              max={50}
              min={10}
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
        </SimpleGrid>

        {/* Add submit button */}
        <Button type="submit" colorScheme="blue" mt={4} width="2xl">
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default InputForm;

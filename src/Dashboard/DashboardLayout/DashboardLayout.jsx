import React from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  IconButton,
  useDisclosure,
  VStack,
  HStack,
  Button,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { Link, Outlet } from "react-router-dom";

const DashboardLayout = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();


  return (
    <Flex
      height="100vh" // Full viewport height
      width="100vw" // Full viewport width
    >
      <Box
        w={{ base: "full", md: "250px" }} // Sidebar width
        bg="blue.600"
        color="white"
        p={5}
        display={{ base: "none", md: "block" }}
      >
        <Heading as="h2" size="lg" mb={5}>
          Dashboard
        </Heading>
        <VStack spacing={3} align="flex-start">
          <Button variant="link" color="white">
            Home
          </Button>
          <Button variant="link" color="white">
            <Link to={"/add-new-data"}>Add new data</Link>
          </Button>
          <Button variant="link" color="white">
            Settings
          </Button>
          <Button variant="link" color="white">
            Logout
          </Button>
        </VStack>
      </Box>

      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>
            <Heading size="lg">Dashboard</Heading>
          </DrawerHeader>
          <DrawerBody>
            <VStack spacing={3} align="flex-start">
              <Button variant="link">Home</Button>
              <Button variant="link">
                <Link to="/add-new-data">Add new data</Link>
              </Button>
              <Button variant="link">Settings</Button>
              <Button variant="link">Logout</Button>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      <Box flex="1" p={5} overflowY="auto">
        <Flex align="center" justify="space-between" mb={5}>
          <IconButton
            icon={<HamburgerIcon />}
            aria-label="Open Menu"
            display={{ base: "flex", md: "none" }}
            onClick={onOpen}
          />
          <Heading as="h1" size="xl">
            Dashboard
          </Heading>
        </Flex>
        <Box>
          <Text fontSize="lg">Welcome to your dashboard!</Text>
          <Outlet/>
        </Box>
      </Box>
    </Flex>
  );
};

export default DashboardLayout;

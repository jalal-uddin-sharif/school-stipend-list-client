import React, { useState } from "react";
import {
  Box,
  Flex,
  Heading,
  VStack,
  Button,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { Link, Outlet, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DashboardLayout = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const location = useLocation(); // Get the current location
  const [activePage, setActivePage] = useState(location.pathname); // State for the active page

  // Function to handle page change
  const handlePageChange = (path) => {
    setActivePage(path);
  };

  return (
    <Flex height="100vh" width="100vw">
      <Box
        w={{ base: "full", md: "250px" }}
        bg="blue.600"
        color="white"
        p={5}
        display={{ base: "none", md: "block" }}
      >
        <Heading as="h2" size="lg" mb={5}>
          Dashboard
        </Heading>
        <VStack spacing={3} align="flex-start">
          <Button
            variant="link"
            color={activePage === "/" ? "yellow.400" : "white"}
            fontSize="lg" // Increased text size
            onClick={() => handlePageChange("/")}
          >
           <Link to="/">Home</Link>
          </Button>
          <Button
            variant="link"
            color={activePage === "/add-new-data" ? "yellow.400" : "white"}
            fontSize="lg"
            onClick={() => handlePageChange("/add-new-data")}
          >
            <Link to="/add-new-data">Add new data</Link>
          </Button>
          <Button
            variant="link"
            color={activePage === "/view-data" ? "yellow.400" : "white"}
            fontSize="lg"
            onClick={() => handlePageChange("/view-data")}
          >
            <Link to="/view-data">View data</Link>
          </Button>
          <Button
            variant="link"
            color={activePage === "/settings" ? "yellow.400" : "white"}
            fontSize="lg"
            onClick={() => handlePageChange("/settings")}
          >
            Settings
          </Button>
          <Button
            variant="link"
            color="white"
            fontSize="lg"
          >
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
              <Button
                variant="link"
                color={activePage === "/" ? "yellow.400" : "black"}
                onClick={() => handlePageChange("/")}
              >
                Home
              </Button>
              <Button
                variant="link"
                color={activePage === "/add-new-data" ? "yellow.400" : "black"}
                onClick={() => handlePageChange("/add-new-data")}
              >
                <Link to="/add-new-data">Add new data</Link>
              </Button>
              <Button
                variant="link"
                color={activePage === "/view-data" ? "yellow.400" : "black"}
                onClick={() => handlePageChange("/view-data")}
              >
                <Link to="/view-data">View Data</Link>
              </Button>
              <Button
                variant="link"
                color={activePage === "/settings" ? "yellow.400" : "black"}
                onClick={() => handlePageChange("/settings")}
              >
                Settings
              </Button>
              <Button variant="link" color="black">
                Logout
              </Button>
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
          <Heading
            as="h1"
            size="xl"
            mb={8}
            display={{ base: "block", md: "none" }}
          >
            Dashboard
          </Heading>
        </Flex>
        <Box>
          <Outlet />
        </Box>
      </Box>
      <ToastContainer />
    </Flex>
  );
};

export default DashboardLayout;

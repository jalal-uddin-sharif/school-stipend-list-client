import { Box, Button, HStack } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';

const Overview = () => {
    return (
        <HStack spacing={15}>
            <Button colorScheme='green'>
                <Link to="/add-new-data">Add new data</Link>
            </Button>
            <Button colorScheme='orange'>
                <Link to="/view-data">View Data</Link>
            </Button>
        </HStack>
    );
};

export default Overview;
import { Box, Text } from '@chakra-ui/react';
import React from 'react';

const DashboardHeader = () => {
    return (
        <Box minH={"150px"} bg="green.300" rounded={"xl"} display="flex" alignItems="center" >
        <Box h={"100px"} w={"100px"} bg="yellow.400" rounded={"full"} mx={'4'}>

        <Text>Total Array</Text>
        </Box>
    </Box>
    
    );
};

export default DashboardHeader;
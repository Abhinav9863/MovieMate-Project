import { Box, Flex, Heading, Spacer, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <Box bg="gray.700" color="white" p={4} mb={6}>
      <Flex align="center">
        <Heading as="h1" size="lg">
          <Link to="/">MovieMate</Link>
        </Heading>
        <Spacer />
        <Button as={Link} to="/add" colorScheme="teal">
          + Add New
        </Button>
      </Flex>
    </Box>
  );
};

export default Header;
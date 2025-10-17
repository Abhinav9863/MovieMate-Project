import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';
import {
  SimpleGrid,
  Box,
  Heading,
  Text,
  Badge,
  Spinner,
  Button,
  useToast,
  HStack,
  Select,
} from '@chakra-ui/react';

const MediaList = () => {
  const [mediaItems, setMediaItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const toast = useToast();
  
  // State for sorting
  const [sortBy, setSortBy] = useState('title'); // Default sort
  const [order, setOrder] = useState('asc');     // Default order

  // useEffect now re-runs when sorting changes
  useEffect(() => {
    setIsLoading(true); // Show spinner when re-fetching
    
    const params = {
      sort_by: sortBy,
      order: order,
    };

    api.getMediaItems(params) // Pass the sort params to the API
      .then((response) => {
        setMediaItems(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching media items:', error);
        setIsLoading(false);
      });
  }, [sortBy, order]); // Dependency array includes sortBy and order

  const handleDelete = (event, id) => {
    // Stop the event from bubbling up to the Link wrapper
    event.preventDefault();
    event.stopPropagation();
    
    api.deleteMediaItem(id)
      .then(() => {
        toast({
          title: 'Item deleted.',
          status: 'success',
          duration: 2000,
          isClosable: true,
        });
        // Remove the item from the list in our state
        setMediaItems((prevItems) => prevItems.filter((item) => item.id !== id));
      })
      .catch((error) => {
        console.error('Error deleting item:', error);
        toast({
          title: 'Error deleting item.',
          status: 'error',
          duration: 2000,
          isClosable: true,
        });
      });
  };

  if (isLoading) {
    return <Spinner size="xl" />;
  }

  return (
    <>
      {/* --- SORTING UI --- */}
      <HStack spacing={4} mb={6}>
        <Select 
          value={sortBy} 
          onChange={(e) => setSortBy(e.target.value)}
          w="200px"
        >
          <option value="title">Sort by Title</option>
          <option value="rating">Sort by Rating</option>
          <option value="id">Sort by Date Added</option>
        </Select>

        <Select 
          value={order} 
          onChange={(e) => setOrder(e.target.value)}
          w="150px"
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </Select>
      </HStack>

      {/* --- MEDIA GRID --- */}
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
        {mediaItems.map((item) => (
          <Link to={`/media/${item.id}`} key={item.id}>
            <Box
              p={5}
              shadow="md"
              borderWidth="1px"
              rounded="md"
              _hover={{ shadow: 'lg', transform: 'scale(1.02)' }}
              transition="all 0.2s"
            >
              <Heading fontSize="xl">{item.title}</Heading>
              <Text mt={2}>Genre: {item.genre}</Text>
              <Text>Director: {item.director || 'N/A'}</Text>
              <Badge
                colorScheme={item.status === 'completed' ? 'green' : 'purple'}
                mr={2}
              >
                {item.status}
              </Badge>
              <Badge colorScheme="blue">{item.item_type.replace('_', ' ')}</Badge>

              <HStack mt={4}>
                <Button
                  as={Link}
                  to={`/edit/${item.id}`}
                  size="sm"
                  colorScheme="blue"
                  onClick={(e) => e.stopPropagation()} // Stop click from going to Link
                >
                  Edit
                </Button>
                <Button
                  size="sm"
                  colorScheme="red"
                  onClick={(e) => handleDelete(e, item.id)} // Pass event to stop propagation
                >
                  Delete
                </Button>
              </HStack>
            </Box>
          </Link>
        ))}
      </SimpleGrid>
    </>
  );
};

export default MediaList;
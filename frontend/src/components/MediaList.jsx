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
  Input,
} from '@chakra-ui/react';

const MediaList = () => {
  const [mediaItems, setMediaItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const toast = useToast();
  const [sortBy, setSortBy] = useState('title');
  const [order, setOrder] = useState('asc');
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 300);

    return () => {
      clearTimeout(timerId);
    };
  }, [searchQuery]);

  useEffect(() => {
    setIsLoading(true);
    
    const params = {
      sort_by: sortBy,
      order: order,
      search: debouncedSearchQuery,
    };

    api.getMediaItems(params)
      .then((response) => {
        setMediaItems(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching media items:', error);
        setIsLoading(false);
      });
  }, [sortBy, order, debouncedSearchQuery]);

  const handleDelete = (event, id) => {
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
      <HStack spacing={4} mb={6}>
        <Input 
          placeholder="Search by title..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          w="300px" 
        />
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
                  onClick={(e) => e.stopPropagation()} 
                >
                  Edit
                </Button>
                <Button
                  size="sm"
                  colorScheme="red"
                  onClick={(e) => handleDelete(e, item.id)} 
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
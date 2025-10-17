import { useEffect, useState } from 'react';
import api from '../api';
import {
  SimpleGrid,
  Box,
  Heading,
  Text,
  Badge,
  Spinner,
} from '@chakra-ui/react';

const MediaList = () => {
  const [mediaItems, setMediaItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    api.getMediaItems()
      .then((response) => {
        setMediaItems(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching media items:', error);
        setIsLoading(false);
      });
  }, []); 

  if (isLoading) {
    return <Spinner size="xl" />;
  }

  return (
    <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
      {mediaItems.map((item) => (
        <Box key={item.id} p={5} shadow="md" borderWidth="1px" rounded="md">
          <Heading fontSize="xl">{item.title}</Heading>
          <Text mt={2}>Genre: {item.genre}</Text>
          <Text>Director: {item.director || 'N/A'}</Text>
          <Badge colorScheme={item.status === 'completed' ? 'green' : 'purple'} mr={2}>
            {item.status}
          </Badge>
          <Badge colorScheme="blue">{item.item_type}</Badge>
        </Box>
      ))}
    </SimpleGrid>
  );
};

export default MediaList;
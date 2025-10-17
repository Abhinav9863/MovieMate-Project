import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api';
import {
  Box,
  Heading,
  Text,
  Spinner,
  VStack,
  Tag,
  HStack,
  Badge,
} from '@chakra-ui/react';

const MediaDetails = () => {
  const { id } = useParams(); 
  const [item, setItem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    api.getMediaItemById(id)
      .then((response) => {
        setItem(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching item:', error);
        setIsLoading(false);
      });
  }, [id]); 

  if (isLoading) {
    return <Spinner size="xl" />;
  }

  if (!item) {
    return <Heading>Item not found.</Heading>;
  }

  return (
    <Box p={5} shadow="md" borderWidth="1px" rounded="md">
      <VStack align="start" spacing={4}>
        <HStack>
          <Heading fontSize="3xl">{item.title}</Heading>
          <Badge 
            fontSize="md" 
            colorScheme={item.item_type === 'movie' ? 'blue' : 'green'}
          >
            {item.item_type.replace('_', ' ')}
          </Badge>
        </HStack>
        <Text fontSize="lg">
          <strong>Director:</strong> {item.director || 'N/A'}
        </Text>
        <Text fontSize="lg">
          <strong>Genre:</strong> {item.genre}
        </Text>
        <HStack>
          <Tag size="lg" colorScheme="purple">{item.platform}</Tag>
          <Tag size="lg" colorScheme="orange">{item.status}</Tag>
        </HStack>
        {item.item_type === 'tv_show' && (
          <Text fontSize="lg">
            <strong>Episodes Watched:</strong> {item.episodes_watched}
          </Text>
        )}
        <Text fontSize="lg">
          <strong>Rating:</strong> {item.rating ? `${item.rating} / 10` : 'Not Rated'}
        </Text>
        <Box>
          <Heading size="md" mb={2}>Review:</Heading>
          <Text>{item.review || 'No review yet.'}</Text>
        </Box>
      </VStack>
    </Box>
  );
};

export default MediaDetails;
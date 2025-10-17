import { useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  VStack,
  Heading,
  useToast,
  InputGroup,
  InputRightElement,
  Text,
} from '@chakra-ui/react';

const AddMediaItem = () => {
  const [formData, setFormData] = useState({
    title: '',
    director: '',
    genre: '',
    platform: 'Netflix',
    status: 'wishlist',
    item_type: 'movie',
    episodes_watched: 0,
    rating: null,
    review: '',
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const navigate = useNavigate();
  const toast = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery) return;
    try {
      const response = await api.searchTMDB(searchQuery);
      const results = response.data.results.filter(
        (r) => r.media_type === 'movie' || r.media_type === 'tv'
      );
      setSearchResults(results.slice(0, 5));
    } catch (error) {
      console.error('Error searching:', error);
      toast({ title: 'Error searching TMDB', status: 'error' });
    }
  };

  const handleSelectResult = (result) => {
    setFormData({
      ...formData,
      title: result.title || result.name || '',
      genre: '',
      director: '',
      review: result.overview || '',
      item_type: result.media_type === 'tv' ? 'tv_show' : 'movie',
      rating: result.vote_average ? parseFloat(result.vote_average.toFixed(1)) : null,
    });
    setSearchResults([]);
    setSearchQuery(result.title || result.name || '');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const dataToSubmit = {
      ...formData,
      rating: formData.rating ? parseFloat(formData.rating) : null,
      episodes_watched: formData.item_type === 'tv_show' ? parseInt(formData.episodes_watched || 0, 10) : 0,
      director: formData.director || null,
    };

    api.createMediaItem(dataToSubmit)
      .then((response) => {
        toast({
          title: 'Item created.',
          description: "We've added your item to the list.",
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        navigate('/');
      })
      .catch((error) => {
        console.error('Error creating media item:', error);
        toast({
          title: 'An error occurred.',
          description: 'Unable to create the item. Check console for details.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      });
  };

  return (
    <Box>
      <Box as="form" onSubmit={handleSearch} mb={6}>
        <VStack>
          <FormControl>
            <FormLabel>Search TMDB</FormLabel>
            <InputGroup>
              <Input
                placeholder="Search for a movie or TV show..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" type="submit">
                  Search
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>

          {searchResults.length > 0 && (
            <VStack align="stretch" spacing={2} borderWidth="1px" rounded="md" p={2} w="100%">
              {searchResults.map((result) => (
                <Box
                  key={result.id}
                  p={2}
                  _hover={{ bg: 'gray.100' }}
                  cursor="pointer"
                  onClick={() => handleSelectResult(result)}
                >
                  <Text fontWeight="bold">
                    {result.title || result.name}{' '}
                    ({result.media_type === 'tv' ? 'TV Show' : 'Movie'})
                  </Text>
                  <Text fontSize="sm">
                    {result.release_date || result.first_air_date
                      ? new Date(result.release_date || result.first_air_date).getFullYear()
                      : 'N/A'}
                  </Text>
                </Box>
              ))}
            </VStack>
          )}
        </VStack>
      </Box>

      <Box as="form" onSubmit={handleSubmit}>
        <VStack spacing={4} align="stretch">
          <Heading>Add New Item Details</Heading>

          <FormControl isRequired>
            <FormLabel>Title</FormLabel>
            <Input name="title" value={formData.title} onChange={handleChange} />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Item Type</FormLabel>
            <Select name="item_type" value={formData.item_type} onChange={handleChange}>
              <option value="movie">Movie</option>
              <option value="tv_show">TV Show</option>
            </Select>
          </FormControl>

          <FormControl>
            <FormLabel>Director</FormLabel>
            <Input name="director" value={formData.director || ''} onChange={handleChange} />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Genre</FormLabel>
            <Input name="genre" value={formData.genre} onChange={handleChange} />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Platform</FormLabel>
            <Select name="platform" value={formData.platform} onChange={handleChange}>
              <option value="Netflix">Netflix</option>
              <option value="Prime">Prime</option>
              <option value="Other">Other</option>
            </Select>
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Status</FormLabel>
            <Select name="status" value={formData.status} onChange={handleChange}>
              <option value="watching">Watching</option>
              <option value="completed">Completed</option>
              <option value="wishlist">Wishlist</option>
            </Select>
          </FormControl>

          {formData.item_type === 'tv_show' && (
            <FormControl>
              <FormLabel>Episodes Watched</FormLabel>
              <Input
                name="episodes_watched"
                type="number"
                value={formData.episodes_watched}
                onChange={handleChange}
              />
            </FormControl>
          )}

          <FormControl>
            <FormLabel>Rating (0-10)</FormLabel>
            <Input
              name="rating"
              type="number"
              step="0.1"
              min="0"
              max="10"
              value={formData.rating || ''}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Review</FormLabel>
            <Textarea name="review" value={formData.review || ''} onChange={handleChange} />
          </FormControl>

          <Button type="submit" colorScheme="teal" size="lg">
            Add Item to My List
          </Button>
        </VStack>
      </Box>
    </Box>
  );
};

export default AddMediaItem;
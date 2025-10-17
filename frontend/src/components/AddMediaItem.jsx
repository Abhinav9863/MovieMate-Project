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

  const navigate = useNavigate(); 
  const toast = useToast();      

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

 // This function runs when the user hits "Submit"
  const handleSubmit = (e) => {
    e.preventDefault(); // 
    const dataToSubmit = {
      ...formData,
      rating: formData.rating ? parseFloat(formData.rating) : null,
      episodes_watched: parseInt(formData.episodes_watched, 10),
    };

    api.createMediaItem(dataToSubmit)
      .then((response) => {
        // Show a success pop-up
        toast({
          title: 'Item created.',
          description: "We've added your item to the list.",
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        // Redirect back to the homepage
        navigate('/');
      })
      .catch((error) => {
        console.error('Error creating media item:', error);
        toast({
          title: 'An error occurred.',
          description: 'Unable to create the item.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      });
  };

  return (
    <Box as="form" onSubmit={handleSubmit}>
      <VStack spacing={4} align="stretch">
        <Heading>Add New Item</Heading>

        <FormControl isRequired>
          <FormLabel>Title</FormLabel>
          <Input name="title" onChange={handleChange} />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Item Type</FormLabel>
          <Select name="item_type" onChange={handleChange} value={formData.item_type}>
            <option value="movie">Movie</option>
            <option value="tv_show">TV Show</option>
          </Select>
        </FormControl>

        <FormControl>
          <FormLabel>Director</FormLabel>
          <Input name="director" onChange={handleChange} />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Genre</FormLabel>
          <Input name="genre" onChange={handleChange} />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Platform</FormLabel>
          <Select name="platform" onChange={handleChange} value={formData.platform}>
            <option value="Netflix">Netflix</option>
            <option value="Prime">Prime</option>
            <option value="Other">Other</option>
          </Select>
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Status</FormLabel>
          <Select name="status" onChange={handleChange} value={formData.status}>
            <option value="watching">Watching</option>
            <option value="completed">Completed</option>
            <option value="wishlist">Wishlist</option>
          </Select>
        </FormControl>

        {}
        {formData.item_type === 'tv_show' && (
          <FormControl>
            <FormLabel>Episodes Watched</FormLabel>
            <Input name="episodes_watched" type="number" onChange={handleChange} />
          </FormControl>
        )}

        <FormControl>
          <FormLabel>Rating (1-10)</FormLabel>
          <Input name="rating" type="number" step="0.1" min="0" max="10" onChange={handleChange} />
        </FormControl>

        <FormControl>
          <FormLabel>Review</FormLabel>
          <Textarea name="review" onChange={handleChange} />
        </FormControl>

        <Button type="submit" colorScheme="teal" size="lg">
          Add Item
        </Button>
      </VStack>
    </Box>
  );
};

export default AddMediaItem;
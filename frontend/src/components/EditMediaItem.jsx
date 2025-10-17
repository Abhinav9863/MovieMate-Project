import { useState, useEffect } from 'react';
import api from '../api';
import { useNavigate, useParams } from 'react-router-dom';
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
  Spinner,
} from '@chakra-ui/react';

const EditMediaItem = () => {
  // 1. Get the 'id' from the URL (e.g., /edit/1)
  const { id } = useParams(); 

  const [formData, setFormData] = useState(null); // Start as null
  const navigate = useNavigate();
  const toast = useToast();

  // 2. Fetch the item's data when the page loads
  useEffect(() => {
    api.getMediaItemById(id)
      .then((response) => {
        setFormData(response.data); // Set the form data
      })
      .catch((error) => {
        console.error('Error fetching item:', error);
        toast({ title: 'Error fetching item', status: 'error' });
      });
  }, [id, toast]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // 3. Handle the 'Update' submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const dataToSubmit = {
      ...formData,
      rating: formData.rating ? parseFloat(formData.rating) : null,
      episodes_watched: parseInt(formData.episodes_watched, 10),
    };

    api.updateMediaItem(id, dataToSubmit)
      .then((response) => {
        toast({ title: 'Item updated.', status: 'success' });
        navigate('/'); // Go back home
      })
      .catch((error) => {
        console.error('Error updating item:', error);
        toast({ title: 'Error updating item', status: 'error' });
      });
  };

  // 4. Show a spinner while data is loading
  if (!formData) {
    return <Spinner size="xl" />;
  }

  // 5. This is the same form as AddMediaItem, but uses 'value'
  //    to pre-fill the fields
  return (
    <Box as="form" onSubmit={handleSubmit}>
      <VStack spacing={4} align="stretch">
        <Heading>Edit: {formData.title}</Heading>

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
            <Input name="episodes_watched" type="number" value={formData.episodes_watched} onChange={handleChange} />
          </FormControl>
        )}

        <FormControl>
          <FormLabel>Rating (1-10)</FormLabel>
          <Input name="rating" type="number" step="0.1" min="0" max="10" value={formData.rating || ''} onChange={handleChange} />
        </FormControl>

        <FormControl>
          <FormLabel>Review</FormLabel>
          <Textarea name="review" value={formData.review || ''} onChange={handleChange} />
        </FormControl>

        <Button type="submit" colorScheme="blue" size="lg">
          Update Item
        </Button>
      </VStack>
    </Box>
  );
};

export default EditMediaItem;
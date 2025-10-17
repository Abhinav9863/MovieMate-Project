import { useEffect, useState } from "react";
import api from "../api";
import { Link } from "react-router-dom";
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
} from "@chakra-ui/react";

const MediaList = () => {
  const [mediaItems, setMediaItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const toast = useToast();

  useEffect(() => {
    api
      .getMediaItems()
      .then((response) => {
        setMediaItems(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching media items:", error);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <Spinner size="xl" />;
  }
  const handleDelete = (id) => {
    api
      .deleteMediaItem(id)
      .then(() => {
        toast({
          title: "Item deleted.",
          status: "success",
          duration: 2000,
          isClosable: true,
        });

        setMediaItems((prevItems) =>
          prevItems.filter((item) => item.id !== id)
        );
      })
      .catch((error) => {
        console.error("Error deleting item:", error);
        toast({
          title: "Error deleting item.",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      });
  };

  return (
    <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
      {mediaItems.map((item) => (
        <Box key={item.id} p={5} shadow="md" borderWidth="1px" rounded="md">
          <Heading fontSize="xl">{item.title}</Heading>
          <Text mt={2}>Genre: {item.genre}</Text>
          <Text>Director: {item.director || "N/A"}</Text>
          <Badge
            colorScheme={item.status === "completed" ? "green" : "purple"}
            mr={2}
          >
            {item.status}
          </Badge>
          <Badge colorScheme="blue">{item.item_type}</Badge>
          <HStack mt={4}>
            <Button
              as={Link}
              to={`/edit/${item.id}`} // <-- Links to the edit page
              size="sm"
              colorScheme="blue"
            >
              Edit
            </Button>
            <Button
              size="sm"
              colorScheme="red"
              onClick={() => handleDelete(item.id)}
            >
              Delete
            </Button>
          </HStack>
        </Box>
      ))}
    </SimpleGrid>
  );
};

export default MediaList;

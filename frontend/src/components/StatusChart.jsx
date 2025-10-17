import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Box, Heading } from '@chakra-ui/react';

const StatusChart = ({ data }) => {
  
  const chartData = [
    { name: 'Watching', count: data.watching || 0 },
    { name: 'Completed', count: data.completed || 0 },
    { name: 'Wishlist', count: data.wishlist || 0 },
  ];

  return (
    <Box mb={8} p={5} shadow="md" borderWidth="1px" rounded="md">
      <Heading size="md" mb={4}>Items by Status</Heading>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={chartData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis allowDecimals={false} /> 
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#8884d8" name="Count" />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default StatusChart;
import { Container } from '@chakra-ui/react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import MediaList from './components/MediaList'
import AddMediaItem from './components/AddMediaItem'

function App() {
  return (
    <>
      <Header />
      <Container maxW="container.xl">
        <Routes>x
          <Route path="/" element={<MediaList />} />
          <Route path="/add" element={<AddMediaItem />} />
        </Routes>
      </Container>
    </>
  )
}

export default App
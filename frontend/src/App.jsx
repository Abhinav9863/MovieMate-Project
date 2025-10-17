import { Container } from '@chakra-ui/react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import MediaList from './components/MediaList'
import AddMediaItem from './components/AddMediaItem'
import EditMediaItem from './components/EditMediaItem'

function App() {
  return (
    <>
      <Header />
      <Container maxW="container.xl">
        <Routes>x
          <Route path="/" element={<MediaList />} />
          <Route path="/add" element={<AddMediaItem />} />
          <Route path="/edit/:id" element={<EditMediaItem />} />
        </Routes>
      </Container>
    </>
  )
}

export default App
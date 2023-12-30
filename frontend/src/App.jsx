import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home';
import Delete from './pages/DeleteBook';
import Update from './pages/UpdateBook';
import Create from './pages/CreateBook';
import Show from './pages/ShowBook';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/books/create' element={<Create />} />
      <Route path='/books/details/:id' element={<Show />} />
      <Route path='/books/update/:id' element={<Update />} />
      <Route path='/books/delete/:id' element={<Delete />} />
    </Routes>
  )
}

export default App

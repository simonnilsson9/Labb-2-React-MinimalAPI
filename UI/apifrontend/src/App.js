import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Importera Router och Routes
import './App.css';
import BooksComponent from './Books';
import Navbar from './Navbar';
import CreateBook from './CreateBook';
import Details from './Details';
import Update from './Update';
import AuthorSearch from './AuthorSearch';
import GenreSearch from './GenreSearch';

function App() {
  return (
    <Router> {/* Omge hela appen med Router */}
      <Navbar /> {/* Lägg till Navbar */}
      <Routes> {/* Definiera rutter */}
        <Route path="/" element={<BooksComponent />} /> {/* Hemrutt */}
        <Route path="/books" element={<BooksComponent />} />
        <Route path="/books-by-genre" element={<GenreSearch/>} />
        <Route path="/books-by-author" element={<AuthorSearch/>} />
        <Route path="/create" element={<CreateBook />} />
        <Route path="/book/:id" element={<Details />} />
        <Route path="/edit/book/:id" element={<Update />} />
      </Routes>
    </Router>
  );
}

export default App;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publicationYear, setPublicationYear] = useState('');
  const [genre, setGenre] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const createBook = async (bookData) => {
    try {
      const response = await fetch('https://localhost:7032/api/book', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookData),
      });

      if (!response.ok) {
        throw new Error('Failed to create book');
      }

      console.log('Book created successfully!');
      // Redirect to the books page or show success message
      navigate('/books'); // Navigate to the books list after successful creation
    } catch (error) {
      console.error('Error creating book:', error);
      setError(error.message); // Set error message to state for display
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const bookData = {
      title,
      author,
      publicationYear: parseInt(publicationYear, 10), // Ensure it's a number
      genre,
    };
    createBook(bookData);
  };

  return (
    <div className="row">
      <div className="col-md-4">
        <h2 className="mt-3">Register a new book</h2>
        <hr />
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="input-group mb-3 mt-2">
            <span className="input-group-text">Title</span>
            <input
              type="text"
              className="form-control"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="input-group mb-3 mt-2">
            <span className="input-group-text">Author</span>
            <input
              type="text"
              className="form-control"
              placeholder="Author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
            />
          </div>
          <div className="input-group mb-3 mt-2">
            <span className="input-group-text">Year</span>
            <input
              type="number"
              className="form-control"
              placeholder="Publication year"
              value={publicationYear}
              onChange={(e) => setPublicationYear(e.target.value)}
              required
            />
          </div>
          <div className="input-group mb-3 mt-2">
            <span className="input-group-text">Genre</span>
            <input
              type="text"
              className="form-control"
              placeholder="Genre"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">Create</button>
        </form>
      </div>
    </div>
  );
};

export default CreateBook;


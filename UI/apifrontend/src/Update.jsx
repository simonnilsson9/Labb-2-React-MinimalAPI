import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const Update = () => {
  const { id } = useParams(); // Get the book ID from the URL
  const navigate = useNavigate();
  
  const [book, setBook] = useState({
    id: '',
    title: '',
    author: '',
    publicationYear: '',
    genre: '',
    description: '',
    isAvailable: false,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await fetch(`https://localhost:7032/api/book/${id}`);

        if (!response.ok) {
          throw new Error('Failed to fetch book details');
        }

        const data = await response.json();

        if (data.isSuccess) {
          setBook(data.result); // Assuming your API response structure
        } else {
          setError('Failed to retrieve book details');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setBook((prevBook) => ({
      ...prevBook,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://localhost:7032/api/book`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(book),
      });

      if (!response.ok) {
        throw new Error('Failed to update book');
      }

      // Optionally, handle success (e.g., navigate to book details page)
      navigate(`/books`);
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Update Book</h2>
      <hr className="mb-4" />

      <div className="row justify-content-center">
        <div className="col-md-8">
          <form onSubmit={handleSubmit}>
            <input type="hidden" name="id" value={book.id} />

            <div className="border rounded p-4 shadow-sm bg-light">
              <h3 className="mb-4 text-center">Book Details</h3>

              {/* Title Input */}
              <div className="input-group mb-4">
                <span className="input-group-text rounded-start">Title</span>
                <input
                  type="text"
                  name="title"
                  className="form-control rounded-end"
                  placeholder="Title"
                  value={book.title}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Author Input */}
              <div className="input-group mb-4">
                <span className="input-group-text rounded-start">Author</span>
                <input
                  type="text"
                  name="author"
                  className="form-control rounded-end"
                  placeholder="Author"
                  value={book.author}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Publication Year Input */}
              <div className="input-group mb-4">
                <span className="input-group-text rounded-start">Year</span>
                <input
                  type="number"
                  name="publicationYear"
                  className="form-control rounded-end"
                  placeholder="Publication Year"
                  value={book.publicationYear}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Genre Input */}
              <div className="input-group mb-4">
                <span className="input-group-text rounded-start">Genre</span>
                <input
                  type="text"
                  name="genre"
                  className="form-control rounded-end"
                  placeholder="Genre"
                  value={book.genre}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Description Input */}
              <div className="input-group mb-4">
                <span className="input-group-text rounded-start">About</span>
                <input
                  type="text"
                  name="description"
                  className="form-control rounded-end"
                  placeholder="Description"
                  value={book.description}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Available Checkbox */}
              <div className="form-check mb-4">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="isAvailable"
                  checked={book.isAvailable}
                  onChange={handleChange}
                />
                <label className="form-check-label">Available for rent</label>
              </div>

              {/* Submit Button */}
              <div className="d-flex justify-content-center mb-4">
                <button type="submit" className="btn btn-primary me-2">
                  Save
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => navigate('/books')}
                >
                  <i className="fa-solid fa-arrow-left"></i> Go Back
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Update;
